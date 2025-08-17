import { useEffect, useState } from 'react';

/**
 * Minimal adapter state hook. Works only if `expo-bluetooth` is installed.
 * Falls back to `false` + no-ops if the module is not present.
 */
export function useBluetooth(): { supported: boolean; enabled: boolean | null } {
  const [supported, setSupported] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    let unsub: (() => void) | null = null;

    (async () => {
      try {
        // Dynamic import so apps without the dep don’t crash.
        const mod = await import('expo-bluetooth');
        const { Bluetooth } = mod as any;
        setSupported(true);

        const state = await Bluetooth.getAdapterStateAsync();
        setEnabled(state === 'on');

        const sub = Bluetooth.addAdapterStateListener(({ state }: { state: string }) => {
          setEnabled(state === 'on');
        });
        unsub = () => sub.remove();
      } catch {
        setSupported(false);
        setEnabled(null);
      }
    })();

    return () => {
      unsub?.();
    };
  }, []);

  return { supported, enabled };
}