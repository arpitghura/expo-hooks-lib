import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SensorsState, Vector3 } from '../types';

interface Options { intervalMs?: number; autoStart?: boolean }

export function useSensors(opts: Options = {}): [SensorsState, { start: () => void; stop: () => void; setInterval: (ms: number) => void }] {
  const { intervalMs = 100, autoStart = true } = opts;
  const [accelerometer, setAccelerometer] = useState<Vector3 | null>(null);
  const [gyroscope, setGyroscope] = useState<Vector3 | null>(null);
  const [isActive, setIsActive] = useState<boolean>(autoStart);
  const accelSub = useRef<ReturnType<typeof Accelerometer.addListener> | null>(null);
  const gyroSub = useRef<ReturnType<typeof Gyroscope.addListener> | null>(null);

  const start = useCallback(() => {
    if (accelSub.current || gyroSub.current) return;
    accelSub.current = Accelerometer.addListener(setAccelerometer as any);
    gyroSub.current = Gyroscope.addListener(setGyroscope as any);
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    accelSub.current?.remove();
    gyroSub.current?.remove();
    accelSub.current = null;
    gyroSub.current = null;
    setIsActive(false);
  }, []);

  const setIntervalMs = useCallback((ms: number) => {
    Accelerometer.setUpdateInterval(ms);
    Gyroscope.setUpdateInterval(ms);
  }, []);

  useEffect(() => {
    setIntervalMs(intervalMs);
    if (autoStart) start();
    return () => stop();
  }, [autoStart, intervalMs, setIntervalMs, start, stop]);

  return [{ accelerometer, gyroscope, isActive }, { start, stop, setInterval: setIntervalMs }];
}