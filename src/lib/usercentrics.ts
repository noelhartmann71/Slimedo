export type UsercentricsConsentState = 'granted' | 'denied' | 'unknown' | 'unconfigured';

type UsercentricsServiceLike = {
  name?: string;
  id?: string;
  templateId?: string;
  consent?: boolean | {
    status?: boolean;
    given?: boolean;
  };
  consentStatus?: boolean;
  status?: boolean;
  isAccepted?: boolean;
  accepted?: boolean;
  dataProcessingService?: {
    name?: string;
  };
  service?: {
    name?: string;
  };
};

type UsercentricsWindow = Window & {
  UC_UI?: {
    showSecondLayer?: () => void;
    getServicesBaseInfo?: () => UsercentricsServiceLike[] | Promise<UsercentricsServiceLike[]>;
    getServicesFullInfo?: () => UsercentricsServiceLike[] | Promise<UsercentricsServiceLike[]>;
  };
  __ucCmp?: {
    showSecondLayer?: () => void;
  };
};

const USERCENTRICS_SCRIPT_ID = 'usercentrics-cmp';
const USERCENTRICS_SCRIPT_SRC = 'https://web.cmp.usercentrics.eu/ui/loader.js';

let usercentricsLoadPromise: Promise<void> | null = null;

export const usercentricsSettingsId =
  import.meta.env.VITE_USERCENTRICS_SETTINGS_ID?.trim() ?? '';

export const googleMapsUsercentricsServiceName =
  import.meta.env.VITE_USERCENTRICS_GOOGLE_MAPS_SERVICE_NAME?.trim() || 'Google Maps';

export const usercentricsEventNames = [
  'ucEvents',
  'ucEvent',
  'UC_UI_INITIALIZED',
  'UC_UI_CMP_EVENT',
  'UC_UI_UPDATE',
  'UC_UI_UPDATED',
];

export function isUsercentricsConfigured() {
  return usercentricsSettingsId.length > 0;
}

export function loadUsercentricsScript() {
  if (!isUsercentricsConfigured()) {
    return Promise.resolve();
  }

  if (typeof document === 'undefined') {
    return Promise.resolve();
  }

  if (usercentricsLoadPromise) {
    return usercentricsLoadPromise;
  }

  if (document.getElementById(USERCENTRICS_SCRIPT_ID)) {
    usercentricsLoadPromise = waitForUsercentricsApi();
    return usercentricsLoadPromise;
  }

  usercentricsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = USERCENTRICS_SCRIPT_ID;
    script.src = USERCENTRICS_SCRIPT_SRC;
    script.async = true;
    script.dataset.settingsId = usercentricsSettingsId;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Usercentrics CMP script.'));

    document.head.appendChild(script);
  });

  return usercentricsLoadPromise;
}

export function openUsercentricsSecondLayer() {
  const openSecondLayer = getSecondLayerOpener();

  if (openSecondLayer) {
    openSecondLayer();
    return true;
  }

  return false;
}

export async function openUsercentricsSecondLayerWhenReady() {
  if (openUsercentricsSecondLayer()) {
    return true;
  }

  if (!isUsercentricsConfigured()) {
    return false;
  }

  try {
    await loadUsercentricsScript();
    await waitForUsercentricsApi();
  } catch (error) {
    console.warn(error);
    return false;
  }

  return openUsercentricsSecondLayer();
}

export async function getUsercentricsServiceConsent(serviceName: string) {
  const usercentrics = window as UsercentricsWindow;
  const readers = [
    usercentrics.UC_UI?.getServicesBaseInfo,
    usercentrics.UC_UI?.getServicesFullInfo,
  ].filter(Boolean);

  for (const readServices of readers) {
    const services = await readServices!.call(usercentrics.UC_UI);
    const service = findServiceByName(services, serviceName);
    const consent = service ? parseConsentValue(service) : null;

    if (typeof consent === 'boolean') {
      return consent;
    }
  }

  return null;
}

export function getUsercentricsConsentFromEvent(event: Event, serviceName: string) {
  const detail = (event as CustomEvent<Record<string, unknown>>).detail;

  if (!detail || typeof detail !== 'object') {
    return null;
  }

  const directValue = findBooleanValueByKey(detail, serviceName);
  if (typeof directValue === 'boolean') {
    return directValue;
  }

  const services = detail.services;
  if (Array.isArray(services)) {
    const service = findServiceByName(services as UsercentricsServiceLike[], serviceName);
    const consent = service ? parseConsentValue(service) : null;

    if (typeof consent === 'boolean') {
      return consent;
    }
  }

  return null;
}

function findServiceByName(services: UsercentricsServiceLike[], serviceName: string) {
  const normalizedTarget = normalizeName(serviceName);

  return services.find((service) =>
    getServiceNames(service).some((candidate) => normalizeName(candidate) === normalizedTarget),
  );
}

function getServiceNames(service: UsercentricsServiceLike) {
  return [
    service.name,
    service.id,
    service.templateId,
    service.dataProcessingService?.name,
    service.service?.name,
  ].filter(Boolean) as string[];
}

function parseConsentValue(service: UsercentricsServiceLike) {
  const consent = service.consent;

  if (typeof consent === 'boolean') {
    return consent;
  }

  if (typeof consent?.status === 'boolean') {
    return consent.status;
  }

  if (typeof consent?.given === 'boolean') {
    return consent.given;
  }

  const directValues = [
    service.consentStatus,
    service.status,
    service.isAccepted,
    service.accepted,
  ];

  return directValues.find((value): value is boolean => typeof value === 'boolean') ?? null;
}

function findBooleanValueByKey(detail: Record<string, unknown>, serviceName: string) {
  const normalizedTarget = normalizeName(serviceName);

  for (const [key, value] of Object.entries(detail)) {
    if (normalizeName(key) === normalizedTarget && typeof value === 'boolean') {
      return value;
    }
  }

  return null;
}

function normalizeName(value: string) {
  return value.trim().toLowerCase();
}

function getSecondLayerOpener() {
  const usercentrics = window as UsercentricsWindow;

  if (typeof usercentrics.UC_UI?.showSecondLayer === 'function') {
    return () => usercentrics.UC_UI!.showSecondLayer!();
  }

  if (typeof usercentrics.__ucCmp?.showSecondLayer === 'function') {
    return () => usercentrics.__ucCmp!.showSecondLayer!();
  }

  return null;
}

function waitForUsercentricsApi(timeoutMs = 5000) {
  const startedAt = Date.now();

  return new Promise<void>((resolve, reject) => {
    const poll = () => {
      if (getSecondLayerOpener()) {
        resolve();
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        reject(new Error('Usercentrics CMP API was not available in time.'));
        return;
      }

      window.setTimeout(poll, 100);
    };

    poll();
  });
}
