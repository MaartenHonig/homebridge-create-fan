/**
 * This is the name of the platform that users will use to register the plugin in the Homebridge config.json
 */
export const PLATFORM_NAME = 'HomebridgeCreateCeilingFan';

/**
 * This must match the name of your plugin as defined the package.json
 */
export const PLUGIN_NAME = 'homebridge-create-ceiling-fan';

/** Default polling interval in seconds */
export const DEFAULT_POLLING_INTERVAL = 15;

/** Delay before resetting momentary switch to off (ms) */
export const MOMENTARY_RESET_DELAY = 500;

/** Delay between DPS pulse writes (ms) */
export const DPS_PULSE_DELAY = 300;

/** Maximum reconnect backoff (ms) */
export const MAX_RECONNECT_DELAY = 60000;

/** Initial reconnect delay (ms) */
export const INITIAL_RECONNECT_DELAY = 5000;
