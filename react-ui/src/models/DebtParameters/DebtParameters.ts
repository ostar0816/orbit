import { BigNumber } from "bignumber.js";
// import { AmmortizationUnit } from "@dharmaprotocol/dharma.js/dist/lib/src/adapters/simple_interest_loan_adapter";

export class DebtParameters {
    amortizationUnit: any; // TODO: export AmmortizationUnit from dharma.js
    interestRate: BigNumber;
    principalAmount: BigNumber; // raw amount
    principalTokenSymbol: string;
    termLength: BigNumber;
}
