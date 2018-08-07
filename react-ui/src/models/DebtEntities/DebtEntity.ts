import { BigNumber } from "bignumber.js";
import { Types } from "@dharmaprotocol/dharma.js";

export class DebtEntity {
    amortizationUnit: string;
    debtor: string;
    description?: string;
    fillLoanShortUrl?: string;
    interestRate: BigNumber;
    issuanceHash: string;
    principalAmount: BigNumber;
    principalTokenSymbol: string;
    termLength: BigNumber;

    dharmaOrder: Types.DebtOrder;

    id?: string;
    createdAt?: string;
    status?: string;

    collateralAmount: BigNumber; // raw amount
    collateralTokenSymbol: string;
    gracePeriodInDays: BigNumber;

    /**
     * A base constructor is necessary to enable instantiation of the DebtEntity class and its subclasses.
     * Typescript type guarding using `instanceof` only works when the object considered has been instantiated.
     *
     * https://stackoverflow.com/questions/45964008/typescript-instanceof-not-working
     */
    constructor(params?: any) {
        if (params) {
            for (const key of Object.keys(params)) {
                this[key] = params[key];
            }
        }
    }

    get totalRepayment() {
        const { principalAmount, interestRate } = this;
        let amount = principalAmount;
        let percent = interestRate;

        if (!(amount instanceof BigNumber)) {
            amount = new BigNumber(amount);
        }

        if (!(percent instanceof BigNumber)) {
            percent = new BigNumber(percent);
        }

        return percent
            .dividedBy(100)
            .times(amount)
            .plus(amount);
    }
}
