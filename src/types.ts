export type Nullable<T> = T | null;

export interface DeviceInfo {
  brand?: string | null;
  modelName?: string | null;
  osName?: string | null;
  osVersion?: string | null;
  deviceType?: number | null; // expo-device DeviceType
  manufacturer?: string | null;
  designName?: string | null;
  yearClass?: number | null;
}

export interface BatteryState {
  level: number | null; // 0..1
  charging: boolean | null;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface SensorsState {
  accelerometer: Vector3 | null;
  gyroscope: Vector3 | null;
  isActive: boolean;
}