import { BigNumber } from "bignumber.js";

export interface CollateralParameters {
    collateralAmount: BigNumber; // raw amount
    collateralTokenSymbol: string;
    gracePeriodInDays: BigNumber;
}
