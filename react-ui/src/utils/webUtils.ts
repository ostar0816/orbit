import { BigNumber } from "bignumber.js";
// const BitlyClient = require("bitly");

export const encodeUrlParams = (params: any) => {
    const encodedParams = Object.keys(params)
        .map(function(k: string) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
        })
        .join("&");
    return encodedParams;
};

export const shortenString = (text: string) => {
    if (text && text.length > 10) {
        return text.substring(0, 5) + "..." + text.substring(text.length - 5);
    } else {
        return text;
    }
};

/**
 * Returns a shortened link; if the hostname is 'localhost', defaults to
 * 'plex.dharma.io' as the hostname.
 *
 * ex: shortenUrl('plex.dharma.io', '/fill/loan', { description: 'hello', principalTokenSymbol: 'REP'})
 *          will return a shortened version of
 *          'https://plex.dharma.io/fill/loan?description=hello&principalTokenSymbol=REP'
 *
 * @param {string} hostname
 * @param {string} path
 * @param {object} queryParams
 * @returns {string}
 */
export async function shortenUrl(
    hostname: string,
    path?: string,
    queryParams?: object,
): Promise<string> {
    if (hostname === "localhost") {
        if (!process.env.REACT_APP_NGROK_HOSTNAME && window.location.port) {
            hostname += `:${window.location.port}`;
        }

        if (process.env.REACT_APP_NGROK_HOSTNAME) {
            hostname = process.env.REACT_APP_NGROK_HOSTNAME;
        }
    }

    return `http://${hostname}/loans`;

    // const bitly = BitlyClient(process.env.REACT_APP_BITLY_ACCESS_TOKEN);
    //
    // if (hostname === "localhost") {
    //     hostname = process.env.REACT_APP_NGROK_HOSTNAME || "plex.dharma.io";
    // }
    //
    // let fullUrl = `https://${hostname}`;
    //
    // if (path) {
    //     fullUrl += path;
    // }
    //
    // if (queryParams) {
    //     fullUrl += "?" + encodeUrlParams(queryParams);
    // }
    //
    // const response = await bitly.shorten(fullUrl);
    //
    // if (response.status_code !== 200) {
    //     throw new Error("Unable to shorten the url");
    // }
    //
    // return response.data.url;
}

export const withCommas = (input: number) => {
    return input.toLocaleString();
};

/**
 * Given a token's balance, and then number of decimals associated with that token,
 * returns a human-readable string.
 *
 * Examples:
 * displayBalance(100000000020000000000000, 18);
 * => "100,000.00002"
 *
 * displayBalance(100000000000000200000000, 18);
 * => "100,000.0000000002"
 *
 * displayBalance(100000000000000000000000, 18);
 * => "100,000"
 *
 * @param {BigNumber} balance
 * @param {number} numDecimals
 * @returns {string}
 */
export const displayBalance = (balance: BigNumber, numDecimals: number) => {
    return balance.shift(-numDecimals).toFormat();
};

export const numberToScaledBigNumber = (balance: number, numDecimals: number) => {
    return new BigNumber(balance).times(new BigNumber(10).pow(numDecimals));
};
