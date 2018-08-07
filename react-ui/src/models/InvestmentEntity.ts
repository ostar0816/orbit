import { BigNumber } from "bignumber.js";

export class InvestmentEntity {
    amortizationUnit: string;
    collateralAmount?: BigNumber;
    collateralized?: boolean;
    collateralSeizable?: boolean;
    collateralTokenSymbol?: string;
    collateralWithdrawn: boolean;
    creditor: string;
    earnedAmount: BigNumber;
    gracePeriodInDays?: BigNumber;
    interestRate: BigNumber;
    issuanceHash: string;
    principalAmount: BigNumber;
    principalTokenSymbol: string;
    repaymentSchedule: number[];
    status: string;
    termLength: BigNumber;
    termsContract: string;
    termsContractParameters: string;
    underwriter: string;
    underwriterRiskRating: BigNumber;

    public constructor() {
        this.creditor = "";
        this.termsContract = "";
        this.termsContractParameters = "";
        this.underwriter = "";
        this.underwriterRiskRating = new BigNumber(0);
        this.amortizationUnit = "";
        this.interestRate = new BigNumber(0);
        this.principalAmount = new BigNumber(0);
        this.principalTokenSymbol = "";
        this.termLength = new BigNumber(0);
        this.issuanceHash = "";
        this.earnedAmount = new BigNumber(0);
        this.repaymentSchedule = [];
        this.status = "";
    }
}
