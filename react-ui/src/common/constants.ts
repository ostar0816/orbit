export const KOVAN_NETWORK_ID = 42;
export const LOCAL_NETWORK_ID = 1457;
export const MAINNET_NETWORK_ID = 1;

/**
 * URL for Eth Gas Station's JSON API, which provides some information on gas prices,
 * transaction confirmation times, and miner policies on the Ethereum network.
 *
 * @type {string}
 */
export const ETH_GAS_STATION_API_URL = "https://ethgasstation.info/json/ethgasAPI.json";

export const COIN_MARKET_CAP_LISTINGS_API_URL = "https://api.coinmarketcap.com/v2/listings/";
export const COIN_MARKET_CAP_TICKER_API_URL = "https://api.coinmarketcap.com/v2/ticker/";

export const SUPPORTED_NETWORK_IDS = new Array(
    KOVAN_NETWORK_ID,
    LOCAL_NETWORK_ID,
    MAINNET_NETWORK_ID,
);

export const BLOCKCHAIN_API = {
    POLLING_INTERVAL: 1000,
    TIMEOUT: 60000,
};
