import * as React from "react";
import { shallow } from "enzyme";
import { InvestmentHistory } from "src/modules/Dashboard/Investments/InvestmentHistory";
import { InvestmentRowContainer } from "src/modules/Dashboard/Investments/InvestmentHistory/InvestmentRowContainer";
import {
    Wrapper,
    Title,
    TableHeaderRow,
} from "src/modules/Dashboard/Investments/InvestmentHistory/styledComponents";
import { Col } from "reactstrap";
import { BigNumber } from "bignumber.js";

describe("<InvestmentHistory />", () => {
    let wrapper;
    let investments = [];
    let props;
    beforeEach(() => {
        props = { investments };
        wrapper = shallow(<InvestmentHistory {...props} />);
    });

    it("should render", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <Title />", () => {
        expect(wrapper.find(Wrapper).find(Title).length).toEqual(1);
    });

    describe("<TableHeaderRow />", () => {
        let tableHeaderRow;
        beforeEach(() => {
            tableHeaderRow = wrapper.find(Wrapper).find(TableHeaderRow);
        });

        it("should render", () => {
            expect(tableHeaderRow.length).toEqual(1);
        });

        it("should render 4 <Col />", () => {
            expect(tableHeaderRow.find(Col).length).toEqual(4);
        });

        it("1st <Col /> should render Amount", () => {
            expect(
                tableHeaderRow
                    .find(Col)
                    .at(0)
                    .get(0).props.children,
            ).toEqual("Amount");
        });

        it("2nd <Col /> should render ID", () => {
            expect(
                tableHeaderRow
                    .find(Col)
                    .at(1)
                    .get(0).props.children,
            ).toEqual("ID");
        });

        it("3rd <Col /> shoul render Status", () => {
            expect(
                tableHeaderRow
                    .find(Col)
                    .at(2)
                    .get(0).props.children,
            ).toEqual("Status");
        });

        it("4th <Col /> should render Terms", () => {
            expect(
                tableHeaderRow
                    .find(Col)
                    .at(3)
                    .get(0).props.children,
            ).toEqual("Terms");
        });
    });

    describe("<InvestmentRowContainer />", () => {
        it("should render 0 <InvestmentRowContainer />", () => {
            expect(wrapper.find(InvestmentRowContainer).length).toEqual(0);
        });

        it("should render 3 <InvestmentRowContainer />", () => {
            investments = [
                {
                    creditor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
                    termsContract: "0x1c907384489d939400fa5c6571d8aad778213d74",
                    termsContractParameters:
                        "0x0000000000000000000000000000008500000000000000000000000000000064",
                    underwriter: "0x0000000000000000000000000000000000000000",
                    underwriterRiskRating: new BigNumber(0),
                    amortizationUnit: "hours",
                    interestRate: new BigNumber(3.12),
                    principalAmount: new BigNumber(100),
                    principalTokenSymbol: "REP",
                    termLength: new BigNumber(6),
                    issuanceHash:
                        "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                    earnedAmount: new BigNumber(4),
                    repaymentSchedule: [1553557371],
                    status: "active",
                },
                {
                    creditor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
                    termsContract: "0x1c907384489d939400fa5c6571d8aad778213d74",
                    termsContractParameters:
                        "0x0000000000000000000000000000008500000000000000000000000000000064",
                    underwriter: "0x0000000000000000000000000000000000000000",
                    underwriterRiskRating: new BigNumber(0),
                    amortizationUnit: "hours",
                    interestRate: new BigNumber(3.12),
                    principalAmount: new BigNumber(100),
                    principalTokenSymbol: "MKR",
                    termLength: new BigNumber(6),
                    issuanceHash:
                        "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                    earnedAmount: new BigNumber(4),
                    repaymentSchedule: [1553557371],
                    status: "active",
                },
                {
                    creditor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
                    termsContract: "0x1c907384489d939400fa5c6571d8aad778213d74",
                    termsContractParameters:
                        "0x0000000000000000000000000000008500000000000000000000000000000064",
                    underwriter: "0x0000000000000000000000000000000000000000",
                    underwriterRiskRating: new BigNumber(0),
                    amortizationUnit: "hours",
                    interestRate: new BigNumber(3.12),
                    principalAmount: new BigNumber(100),
                    principalTokenSymbol: "ZRX",
                    termLength: new BigNumber(6),
                    issuanceHash:
                        "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                    earnedAmount: new BigNumber(4),
                    repaymentSchedule: [1553557371],
                    status: "active",
                },
            ];
            wrapper.setProps({ investments });
            expect(wrapper.find(InvestmentRowContainer).length).toEqual(3);
        });
    });
});
