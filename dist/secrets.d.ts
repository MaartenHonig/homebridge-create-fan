import type { Logging } from 'homebridge';
import type { DeviceConfig, ResolvedSecret, SecretsConfig } from './types.js';
/**
 * Resolve Tuya id + key for a single device based on the configured secrets mode.
 * Returns undefined if resolution fails (caller should skip the device).
 */
export declare function resolveSecret(device: DeviceConfig, secretsConfig: SecretsConfig, storagePath: string, log: Logging): ResolvedSecret | undefined;
/**
 * Clear cached storage file (useful if file is updated at runtime).
 */
export declare function clearStorageCache(): void;
