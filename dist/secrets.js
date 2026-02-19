import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
/**
 * Resolve Tuya id + key for a single device based on the configured secrets mode.
 * Returns undefined if resolution fails (caller should skip the device).
 */
export function resolveSecret(device, secretsConfig, storagePath, log) {
    const mode = secretsConfig.mode ?? 'inline';
    switch (mode) {
        case 'inline':
            return resolveInline(device, log);
        case 'env':
            return resolveEnv(device, log);
        case 'storage':
            return resolveStorage(device, secretsConfig, storagePath, log);
        default:
            log.error(`[Secrets] Unknown secrets mode "${mode}" – skipping device "${device.name}".`);
            return undefined;
    }
}
// ── Inline ────────────────────────────────────────────────────────────
function resolveInline(device, log) {
    if (!device.id || !device.key) {
        log.error(`[Secrets] Device "${device.name}" uses inline mode but is missing id or key.`);
        return undefined;
    }
    return { id: device.id, key: device.key };
}
// ── Environment variables ─────────────────────────────────────────────
function resolveEnv(device, log) {
    const idEnv = device.idEnv;
    const keyEnv = device.keyEnv;
    if (!idEnv || !keyEnv) {
        log.error(`[Secrets] Device "${device.name}" uses env mode but is missing idEnv or keyEnv fields.`);
        return undefined;
    }
    const id = process.env[idEnv];
    const key = process.env[keyEnv];
    if (!id || !key) {
        log.error(`[Secrets] Device "${device.name}": environment variables ${idEnv} / ${keyEnv} are not set or empty.`);
        return undefined;
    }
    return { id, key };
}
// ── Storage file ──────────────────────────────────────────────────────
let storageCache = null;
function resolveStorage(device, secretsConfig, storagePath, log) {
    if (!storageCache) {
        const filename = secretsConfig.storageFile ?? 'create-fan-secrets.json';
        const filePath = join(storagePath, filename);
        if (!existsSync(filePath)) {
            log.error(`[Secrets] Storage file not found: ${filePath}`);
            return undefined;
        }
        try {
            const raw = readFileSync(filePath, 'utf-8');
            storageCache = JSON.parse(raw);
        }
        catch (err) {
            log.error(`[Secrets] Failed to read/parse storage file: ${filePath}`, err);
            return undefined;
        }
    }
    const lookup = device.deviceKey ?? device.name;
    const entry = storageCache.devices?.[lookup];
    if (!entry || !entry.id || !entry.key) {
        log.error(`[Secrets] No entry found for "${lookup}" in storage file. ` +
            `Ensure the storage file has a "devices" object with a key matching the device name or deviceKey.`);
        return undefined;
    }
    return { id: entry.id, key: entry.key };
}
/**
 * Clear cached storage file (useful if file is updated at runtime).
 */
export function clearStorageCache() {
    storageCache = null;
}
//# sourceMappingURL=secrets.js.map