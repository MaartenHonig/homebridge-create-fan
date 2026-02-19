# Changelog

## 3.0.0

### Breaking Changes
- Removed the legacy "Toggle Light" switch service (`withToggle` option). Use the Lightbulb service or Temperature preset buttons instead.
- The `platformOptionalAccessory.ts` file has been removed (was already fully commented out).

### New Features
- **Configurable DPS mapping** per device – no more hard-coded DPS numbers.
- **Light temperature preset buttons** – 3 momentary switches for cycling through warm/neutral/cool modes.
- **Timer preset buttons** – 1h/2h/4h momentary switches (when device exposes timer DPS).
- **Rotation direction control** – optional, based on `fanDirectionDps` mapping.
- **State sync** – real-time updates via TuyAPI `data` and `dp-refresh` events, plus configurable polling fallback.
- **Secrets management** – three modes: `inline` (backwards compatible), `env` (environment variables), `storage` (external JSON file in Homebridge storage).
- **Automatic reconnection** with exponential backoff.

### Bug Fixes
- **Fixed `setFanActivity` toggle bug** – the fan power handler now uses the incoming HomeKit value directly instead of toggling internal state. This caused the fan to not respond correctly to on/off commands.

### Internal
- Added `src/types.ts` for shared TypeScript interfaces.
- Added `src/secrets.ts` for credential resolution.
- Added `src/mapping.ts` for DPS mapping defaults and speed conversion helpers.
- Added `scripts/test-mapping.ts` for basic unit tests.
- Updated `config.schema.json` with full schema for new options.
