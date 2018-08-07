import { BigNumber } from "bignumber.js";
import { DebtEntity } from "./DebtEntity";

export class FilledDebtEntity extends DebtEntity {
    creditor: string;
    repaidAmount: BigNumber;
    repaymentSchedule: number[];
    totalExpectedRepayment: BigNumber;
}
