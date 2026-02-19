/**
 * This is the name of the platform that users will use to register the plugin in the Homebridge config.json
 */
export declare const PLATFORM_NAME = "HomebridgeCreateCeilingFan";
/**
 * This must match the name of your plugin as defined the package.json
 */
export declare const PLUGIN_NAME = "homebridge-create-ceiling-fan";
/** Default polling interval in seconds */
export declare const DEFAULT_POLLING_INTERVAL = 15;
/** Delay before resetting momentary switch to off (ms) */
export declare const MOMENTARY_RESET_DELAY = 500;
/** Delay between DPS pulse writes (ms) */
export declare const DPS_PULSE_DELAY = 300;
/** Maximum reconnect backoff (ms) */
export declare const MAX_RECONNECT_DELAY = 60000;
/** Initial reconnect delay (ms) */
export declare const INITIAL_RECONNECT_DELAY = 5000;
