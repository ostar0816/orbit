import * as React from "react";
import { shallow } from "enzyme";
import { InvestmentRow } from "src/modules/Dashboard/Investments/InvestmentHistory/InvestmentRow";
import { shortenString, amortizationUnitToFrequency } from "src/utils";
import {
    StyledRow,
    Drawer,
    InfoItem,
    InfoItemTitle,
    InfoItemContent,
} from "src/modules/Dashboard/Investments/InvestmentHistory/styledComponents";
import { BigNumber } from "bignumber.js";
import { Col, Collapse } from "reactstrap";
import { TokenAmount } from "src/components";
import MockDharma from "__mocks__/dharma.js";

describe("<InvestmentRow />", () => {
    const investment = {
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
        issuanceHash: "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
        earnedAmount: new BigNumber(4),
        repaymentSchedule: [1553557371],
        status: "active",
    };

    const tokens = [
        {
            address: "0x9b62bd396837417ce319e2e5c8845a5a960010ea",
            symbol: "REP",
            name: "Augur REP",
            awaitingTransaction: false,
            tradingPermitted: true,
            balance: new BigNumber(10000),
            numDecimals: new BigNumber(18),
        },
    ];

    describe("#render", () => {
        let wrapper;
        let props;
        beforeEach(() => {
            props = {
                dharma: new MockDharma(),
                investment,
                tokens,
            };
            wrapper = shallow(<InvestmentRow {...props} />);
        });

        it("should render successfully", () => {
            expect(wrapper.length).toEqual(1);
        });

        it("should not render when there is no investment", () => {
            wrapper.setProps({ investment: null });
            expect(wrapper.find(StyledRow).length).toEqual(0);
        });

        describe("<StyledRow />", () => {
            let styledRow;
            beforeEach(() => {
                styledRow = wrapper.find(StyledRow);
            });

            it("should render", () => {
                expect(styledRow.length).toEqual(1);
            });

            it("should render 4 <Col />", () => {
                expect(styledRow.find(Col).length).toEqual(4);
            });

            it("1st <Col /> should render principal info", () => {
                expect(
                    styledRow
                        .find(Col)
                        .at(0)
                        .find(TokenAmount)
                        .prop("tokenAmount"),
                ).toEqual(props.investment.principalAmount);
                expect(
                    styledRow
                        .find(Col)
                        .at(0)
                        .find(TokenAmount)
                        .prop("tokenSymbol"),
                ).toEqual(props.investment.principalTokenSymbol);
            });

            it("2nd <Col /> should render issuance hash info", () => {
                const content = shortenString(props.investment.issuanceHash);
                expect(
                    styledRow
                        .find(Col)
                        .at(1)
                        .get(0).props.children,
                ).toEqual(content);
            });

            it("3rd <Col /> should render status info", async () => {
                props.investment.issuanceHash = "paid";
                wrapper.setProps(props);
                await wrapper.instance().determineStatus(props.dharma);
                await expect(wrapper.state("status")).toEqual("Paid");
                props.investment.issuanceHash = "delinquent";
                wrapper.setProps(props);
                await wrapper.instance().determineStatus(props.dharma);
                await expect(wrapper.state("status")).toEqual("Delinquent");
            });

            it("4th <Col /> should render terms info", () => {
                expect(
                    styledRow
                        .find(Col)
                        .at(3)
                        .get(0).props.children,
                ).toEqual("Simple Interest Loan (Non-Collateralized)");
            });
        });

        describe("<Collapse />", () => {
            let collapse;
            beforeEach(() => {
                collapse = wrapper.find(Collapse);
            });

            it("should render", () => {
                expect(collapse.length).toEqual(1);
            });

            it("should render 3 <InfoItem />", () => {
                expect(collapse.find(InfoItem).length).toEqual(3);
            });

            it("1st <InfoItem /> should render Term Length info", () => {
                const elm = collapse.find(InfoItem).at(0);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Term Length");
                const content =
                    props.investment.termLength.toNumber() +
                    " " +
                    props.investment.amortizationUnit;
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });

            it("2nd <InfoItem /> should render Interest Rate info", () => {
                const elm = collapse.find(InfoItem).at(1);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Interest Rate");
                const content = props.investment.interestRate.toNumber() + "%";
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });

            it("3rd <InfoItem /> should render Installment Frequency info", () => {
                const elm = collapse.find(InfoItem).at(2);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual(
                    "Installment Frequency",
                );
                const content = amortizationUnitToFrequency(props.investment.amortizationUnit);
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });
        });
    });

    describe("#onClick Div", () => {
        it("should call toggleDrawer on click", () => {
            const props = { investment, tokens };
            const spy = jest.spyOn(InvestmentRow.prototype, "toggleDrawer");
            const wrapper = shallow(<InvestmentRow {...props} />);
            wrapper.simulate("click");
            expect(spy).toHaveBeenCalled();
        });

        it("toggleDrawer should call setState", () => {
            const props = { investment, tokens };
            const spy = jest.spyOn(InvestmentRow.prototype, "setState");
            const wrapper = shallow(<InvestmentRow {...props} />);
            const collapse = wrapper.state("collapse");
            wrapper.simulate("click");
            expect(spy).toHaveBeenCalledWith({ collapse: !collapse });
        });
    });
});
