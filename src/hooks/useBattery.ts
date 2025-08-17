import * as Battery from 'expo-battery';
import { useEffect, useState } from 'react';
import type { BatteryState } from '../types';

export function useBattery(): BatteryState {
  const [level, setLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const l = await Battery.getBatteryLevelAsync();
        const s = await Battery.getBatteryStateAsync();
        if (!mounted) return;
        setLevel(l);
        setCharging(s === Battery.BatteryState.CHARGING || s === Battery.BatteryState.FULL);
      } catch {
        // leave nulls
      }
    })();

    const subLevel = Battery.addBatteryLevelListener(({ batteryLevel }) => setLevel(batteryLevel));
    const subState = Battery.addBatteryStateListener(({ batteryState }) => {
      setCharging(batteryState === Battery.BatteryState.CHARGING || batteryState === Battery.BatteryState.FULL);
    });

    return () => {
      subLevel.remove();
      subState.remove();
      mounted = false;
    };
  }, []);

  return { level, charging };
}