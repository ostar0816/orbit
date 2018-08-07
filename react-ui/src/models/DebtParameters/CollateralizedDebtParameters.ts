import { BigNumber } from "bignumber.js";
import { DebtParameters } from "./DebtParameters";
import { CollateralParameters } from "../DebtInterfaces";

export class CollateralizedDebtParameters extends DebtParameters implements CollateralParameters {
    collateralAmount: BigNumber; // raw amount
    collateralTokenSymbol: string;
    gracePeriodInDays: BigNumber;
}
