import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import type { DeviceInfo } from '../types';

export function useDeviceInfo(): DeviceInfo | null {
  const [info, setInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const deviceType = await Device.getDeviceTypeAsync().catch(() => null);
        const manufacturer = await Device.getManufacturerAsync().catch(() => null);
        const data: DeviceInfo = {
          brand: Device.brand ?? null,
          modelName: Device.modelName ?? null,
          osName: Device.osName ?? null,
          osVersion: Device.osVersion ?? null,
          designName: (Device as any).designName ?? null,
          yearClass: Device.deviceYearClass ?? null,
          deviceType,
          manufacturer,
        };
        if (mounted) setInfo(data);
      } catch {
        if (mounted) setInfo(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return info;
}