import * as React from "react";
import { InvestmentEntity } from "../../../src/models/InvestmentEntity";
import { BigNumber } from "bignumber.js";

describe("InvestmentEntity", () => {
    it("should have the correct properties", () => {
        const investmentEntity = new InvestmentEntity();
        const testInvestmentEntity = {
            creditor: "",
            termsContract: "",
            termsContractParameters: "",
            underwriter: "",
            underwriterRiskRating: new BigNumber(0),
            amortizationUnit: "",
            interestRate: new BigNumber(0),
            principalAmount: new BigNumber(0),
            principalTokenSymbol: "",
            termLength: new BigNumber(0),
            issuanceHash: "",
            earnedAmount: new BigNumber(0),
            repaymentSchedule: [],
            status: "",
        };
        expect(investmentEntity).toEqual(testInvestmentEntity);
    });
});
