import { BigNumber } from "bignumber.js";

export interface TokenEntity {
    address: string;
    symbol: string;
    name: string;
    numDecimals: BigNumber;
    tradingPermitted: boolean;
    awaitingTransaction: boolean;
    balance: BigNumber;
}
