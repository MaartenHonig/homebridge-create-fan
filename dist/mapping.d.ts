import type { DpsMapping, FeatureFlags, DeviceConfig } from './types.js';
export declare function resolveMapping(partial?: Partial<DpsMapping>): DpsMapping;
export declare function resolveFeatures(mapping: DpsMapping, partial?: Partial<FeatureFlags>): FeatureFlags;
/**
 * Convert HomeKit percentage (0–100) to discrete device step.
 * E.g. min=1, max=6: 0→1, 1–17→1, 18–33→2, …, 84–100→6
 * Uses floor-based mapping so that stepToPercent → percentToStep roundtrips.
 */
export declare function percentToStep(percent: number, min: number, max: number): number;
/**
 * Convert discrete device step to HomeKit percentage (0–100).
 */
export declare function stepToPercent(step: number, min: number, max: number): number;
/**
 * Build a full ResolvedDevice-ready mapping + features from a raw DeviceConfig.
 */
export declare function buildDeviceConfig(device: DeviceConfig): {
    mapping: DpsMapping;
    features: FeatureFlags;
};
