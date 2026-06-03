import { useEffect } from 'react';
import { isUsercentricsConfigured, loadUsercentricsScript } from '@/lib/usercentrics';

export default function UsercentricsLoader() {
  useEffect(() => {
    if (!isUsercentricsConfigured()) {
      console.warn(
        'Usercentrics is not configured. Set VITE_USERCENTRICS_SETTINGS_ID to enable the CMP.',
      );
      return;
    }

    void loadUsercentricsScript().catch((error) => {
      console.warn(error);
    });
  }, []);

  return null;
}
