import { BigNumber } from "bignumber.js";
import { OpenDebtEntity } from "./OpenDebtEntity";
import { CollateralParameters } from "../DebtInterfaces";

export class OpenCollateralizedDebtEntity extends OpenDebtEntity implements CollateralParameters {
    collateralAmount: BigNumber; // raw amount
    collateralTokenSymbol: string;
    gracePeriodInDays: BigNumber;

    /**
     * Returns the missing parameters of an instance of an OpenCollateralizedDebtEntity.
     *
     * We unfortunately cannot leverage Typescript classes nor interfaces
     * because they do not support runtime reflection.
     */
    getMissingParameters() {
        const requiredParameters = [
            "amortizationUnit",
            "debtor",
            "interestRate",
            "issuanceHash",
            "principalAmount",
            "principalTokenSymbol",
            "termLength",

            "collateralAmount",
            "collateralTokenSymbol",
            "gracePeriodInDays",
        ];

        const missingParameters: string[] = [];

        for (const parameter of requiredParameters) {
            if (this[parameter] === undefined) {
                missingParameters.push(parameter);
            }
        }

        return missingParameters;
    }
}
