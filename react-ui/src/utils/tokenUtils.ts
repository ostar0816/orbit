import { Types } from "@dharmaprotocol/dharma.js";
import { BigNumber } from "bignumber.js";

import {
    COIN_MARKET_CAP_LISTINGS_API_URL,
    COIN_MARKET_CAP_TICKER_API_URL,
} from "../common/constants";

/**
 * Returns a the value of the TokenAmount converted to the given ticker
 *
 * We use CoinMarketCap's API: https://coinmarketcap.com/api/
 *
 * @param {Types.TokenAmount} tokenAmount
 * @param {string} ticker
 * @returns {BigNumber}
 */
export async function convertTokenAmountByTicker(
    tokenAmount: Types.TokenAmount,
    ticker: string,
): Promise<BigNumber> {
    const listingsResp = await fetch(COIN_MARKET_CAP_LISTINGS_API_URL);
    const listings = await listingsResp.json();

    const tokenData = listings.data.find(
        (listing: any) => listing.symbol === tokenAmount.tokenSymbol,
    );

    if (!tokenData) {
        throw new Error(`Token ${tokenAmount.tokenSymbol} not found in CoinMarketCap listings`);
    }

    const tickerApiUrl = COIN_MARKET_CAP_TICKER_API_URL + `${tokenData.id}/?convert=${ticker}`;

    const tickerResp = await fetch(tickerApiUrl);
    const tickerData = await tickerResp.json();

    const conversionRate = tickerData.data.quotes[ticker].price;

    if (!conversionRate) {
        throw new Error(`Price of ${tokenAmount.tokenSymbol} in ${ticker} not found`);
    }

    return tokenAmount.decimalAmount.times(new BigNumber(conversionRate));
}
