import { useCallback, useEffect, useState } from 'react';
import {
  getUsercentricsConsentFromEvent,
  getUsercentricsServiceConsent,
  isUsercentricsConfigured,
  loadUsercentricsScript,
  openUsercentricsSecondLayerWhenReady,
  type UsercentricsConsentState,
  usercentricsEventNames,
} from '@/lib/usercentrics';

export function useUsercentricsConsent(serviceName: string) {
  const [status, setStatus] = useState<UsercentricsConsentState>(
    isUsercentricsConfigured() ? 'unknown' : 'unconfigured',
  );

  const refreshConsent = useCallback(async () => {
    if (!isUsercentricsConfigured()) {
      setStatus('unconfigured');
      return;
    }

    const consent = await getUsercentricsServiceConsent(serviceName);

    if (typeof consent === 'boolean') {
      setStatus(consent ? 'granted' : 'denied');
    }
  }, [serviceName]);

  useEffect(() => {
    if (!isUsercentricsConfigured()) {
      setStatus('unconfigured');
      return;
    }

    let isMounted = true;

    const safeRefreshConsent = async () => {
      if (!isMounted) return;
      await refreshConsent();
    };

    const handleConsentEvent = (event: Event) => {
      const consent = getUsercentricsConsentFromEvent(event, serviceName);

      if (typeof consent === 'boolean') {
        setStatus(consent ? 'granted' : 'denied');
        return;
      }

      void safeRefreshConsent();
    };

    void loadUsercentricsScript()
      .then(safeRefreshConsent)
      .catch((error) => {
        console.warn(error);
      });

    const refreshTimers = [250, 1000, 2500].map((delay) =>
      window.setTimeout(safeRefreshConsent, delay),
    );

    usercentricsEventNames.forEach((eventName) => {
      window.addEventListener(eventName, handleConsentEvent);
    });

    return () => {
      isMounted = false;
      refreshTimers.forEach((timerId) => window.clearTimeout(timerId));
      usercentricsEventNames.forEach((eventName) => {
        window.removeEventListener(eventName, handleConsentEvent);
      });
    };
  }, [refreshConsent, serviceName]);

  return {
    status,
    isGranted: status === 'granted',
    openSettings: openUsercentricsSecondLayerWhenReady,
    refresh: refreshConsent,
  };
}
