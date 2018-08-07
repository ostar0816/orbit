import * as React from "react";
import { shallow } from "enzyme";
import { InvestmentsMetrics } from "src/modules/Dashboard/Investments/InvestmentsMetrics/InvestmentsMetrics";
import { TokenEntity, InvestmentEntity } from "src/models";
import { BigNumber } from "bignumber.js";
import {
    Wrapper,
    HalfCol,
    Value,
    TokenWrapper,
    Label,
} from "src/modules/Dashboard/Investments/InvestmentsMetrics/styledComponents";
import { TokenAmount } from "src/components";

describe("<InvestmentsMetrics />", () => {
    let investments;
    let tokens: TokenEntity[];
    let props;
    beforeEach(() => {
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
                principalAmount: new BigNumber(10),
                principalTokenSymbol: "REP",
                termLength: new BigNumber(6),
                issuanceHash: "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                earnedAmount: new BigNumber(4),
                repaymentSchedule: [1553557371],
                status: "active",
            },
        ];

        tokens = [
            {
                address: "0x9b62bd396837417ce319e2e5c8845a5a960010ea",
                symbol: "REP",
                name: "REP",
                tradingPermitted: true,
                balance: new BigNumber(10000),
                numDecimals: new BigNumber(18),
            },
        ];

        props = { investments, tokens };
    });

    describe("#render", () => {
        it("should render the component", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(wrapper.length).toEqual(1);
        });

        it("should render correct Total Lended and Total Earned value", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(wrapper.find(HalfCol).length).toEqual(2);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(Value)
                    .find(TokenWrapper)
                    .at(0)
                    .find(TokenAmount)
                    .prop("tokenAmount"),
            ).toEqual(props.investments[0].principalAmount);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(Value)
                    .find(TokenWrapper)
                    .at(0)
                    .find(TokenAmount)
                    .prop("tokenSymbol"),
            ).toEqual(props.investments[0].principalTokenSymbol);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(Label)
                    .get(0).props.children,
            ).toEqual("Total Lent");
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(Value)
                    .find(TokenWrapper)
                    .at(0)
                    .find(TokenAmount)
                    .prop("tokenAmount"),
            ).toEqual(props.investments[0].earnedAmount);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(Value)
                    .find(TokenWrapper)
                    .at(0)
                    .find(TokenAmount)
                    .prop("tokenSymbol"),
            ).toEqual(props.investments[0].principalTokenSymbol);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(Label)
                    .get(0).props.children,
            ).toEqual("Total Earned");
        });

        it("should render 0 ETH Total Lended and 0 ETH Total Earned when there is no investments", () => {
            props.investments = [];
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            const defaultTotal = "0 ETH";
            expect(wrapper.find(HalfCol).length).toEqual(2);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(Value)
                    .find(TokenWrapper)
                    .get(0).props.children,
            ).toEqual(defaultTotal);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(Label)
                    .get(0).props.children,
            ).toEqual("Total Lent");
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(Value)
                    .find(TokenWrapper)
                    .get(0).props.children,
            ).toEqual(defaultTotal);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(Label)
                    .get(0).props.children,
            ).toEqual("Total Earned");
        });

        it("should render 0 ETH Total Lended and 0 ETH Total Earned when there is no tokens", () => {
            props.tokens = [];
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            const defaultTotal = "0 ETH";
            expect(wrapper.find(HalfCol).length).toEqual(2);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(Value)
                    .find(TokenWrapper)
                    .get(0).props.children,
            ).toEqual(defaultTotal);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(Label)
                    .get(0).props.children,
            ).toEqual("Total Lent");
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(Value)
                    .find(TokenWrapper)
                    .get(0).props.children,
            ).toEqual(defaultTotal);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(Label)
                    .get(0).props.children,
            ).toEqual("Total Earned");
            expect(wrapper.state("tokenBalances")).toEqual({});
        });
    });

    describe("#componentDidMount", () => {
        it("should call initiateTokenBalance", () => {
            const spy = jest.spyOn(InvestmentsMetrics.prototype, "initiateTokenBalance");
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(spy).toHaveBeenCalledWith(props.tokens);
        });

        it("should set the correct token balance", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(wrapper.state("tokenBalances")["REP"].totalLended).toEqual(new BigNumber(10));
            expect(wrapper.state("tokenBalances")["REP"].totalEarned).toEqual(new BigNumber(4));
        });
    });

    describe("#componentDidMount", () => {
        it("should call initiateTokenBalance", () => {
            const wrapper = shallow(<InvestmentsMetrics />);
            const spy = jest.spyOn(wrapper.instance(), "initiateTokenBalance");
            wrapper.setProps({ investments, tokens });
            expect(spy).toHaveBeenCalledWith(tokens);
            spy.mockRestore();
        });
    });

    describe("#render (5 Tokens)", () => {
        beforeEach(() => {
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
                    principalAmount: new BigNumber(10),
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
                    principalAmount: new BigNumber(10),
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
                    principalAmount: new BigNumber(10),
                    principalTokenSymbol: "ZRX",
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
                    principalAmount: new BigNumber(10),
                    principalTokenSymbol: "SNT",
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
                    principalAmount: new BigNumber(10),
                    principalTokenSymbol: "OMG",
                    termLength: new BigNumber(6),
                    issuanceHash:
                        "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                    earnedAmount: new BigNumber(4),
                    repaymentSchedule: [1553557371],
                    status: "active",
                },
            ];

            tokens = [
                {
                    address: "0x07e93e27ac8a1c114f1931f65e3c8b5186b9b77e",
                    symbol: "MKR",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                },
                {
                    address: "0xc3017eb5cd063bf6745723895edead65257a5f6e",
                    symbol: "ZRX",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                },
                {
                    address: "0x9b62bd396837417ce319e2e5c8845a5a960010ea",
                    symbol: "REP",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                },
                {
                    address: "0x744d70fdbe2ba4cf95131626614a1763df805b9e",
                    symbol: "SNT",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                },
                {
                    address: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
                    symbol: "OMG",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                },
            ];

            props = { investments, tokens };
        });

        it("should have the correct tokenBalances", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(wrapper.state("tokenBalances")).toEqual({
                MKR: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(4),
                },
                ZRX: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(4),
                },
                REP: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(4),
                },
                SNT: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(4),
                },
                OMG: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(4),
                },
            });
        });

        it("should not render more than 4 Tokens in Total Lended section", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(5);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper).length,
            ).toBeLessThanOrEqual(4);
        });

        it("Total Lended's last element should render AND MORE", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(5);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper)
                    .last()
                    .get(0).props.children,
            ).toEqual("AND MORE");
        });

        it("should not render more than 4 Tokens in Total Earned section", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(5);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(TokenWrapper).length,
            ).toBeLessThanOrEqual(4);
        });

        it("Total Earned's last element should render AND MORE", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(5);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(TokenWrapper)
                    .last()
                    .get(0).props.children,
            ).toEqual("AND MORE");
        });
    });

    describe("#render (2 Tokens)", () => {
        beforeEach(() => {
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
                    principalAmount: new BigNumber(10),
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
                    principalAmount: new BigNumber(10),
                    principalTokenSymbol: "REP",
                    termLength: new BigNumber(6),
                    issuanceHash:
                        "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                    earnedAmount: new BigNumber(4),
                    repaymentSchedule: [1553557371],
                    status: "active",
                },
            ];

            tokens = [
                {
                    address: "0x07e93e27ac8a1c114f1931f65e3c8b5186b9b77e",
                    symbol: "MKR",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                },
                {
                    address: "0x9b62bd396837417ce319e2e5c8845a5a960010ea",
                    symbol: "REP",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                },
            ];

            props = { investments, tokens };
        });

        it("should have the correct tokenBalances", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(wrapper.state("tokenBalances")).toEqual({
                MKR: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(4),
                },
                REP: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(4),
                },
            });
        });

        it("should render 2 Tokens in Total Lended section", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(2);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper).length,
            ).toEqual(2);
        });

        it("Total Lended's last element should not render AND MORE", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(2);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper)
                    .last()
                    .get(0).props.children,
            ).not.toEqual("AND MORE");
        });

        it("should render 2 Tokens in Total Earned section", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(2);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(TokenWrapper).length,
            ).toEqual(2);
        });

        it("Total Earned's last element should not render AND MORE", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(2);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(TokenWrapper)
                    .last()
                    .get(0).props.children,
            ).not.toEqual("AND MORE");
        });
    });

    describe("Investments with invalid Token should not be included", () => {
        beforeEach(() => {
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
                    principalAmount: new BigNumber(10),
                    principalTokenSymbol: "MKR",
                    termLength: new BigNumber(6),
                    issuanceHash:
                        "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                    earnedAmount: new BigNumber(4),
                    repaymentSchedule: [1553557371],
                    status: "active",
                },
                {
                    debtor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
                    termsContract: "0x1c907384489d939400fa5c6571d8aad778213d74",
                    termsContractParameters:
                        "0x0000000000000000000000000000008500000000000000000000000000000064",
                    underwriter: "0x0000000000000000000000000000000000000000",
                    underwriterRiskRating: new BigNumber(0),
                    amortizationUnit: "hours",
                    interestRate: new BigNumber(3.12),
                    principalAmount: new BigNumber(10),
                    principalTokenSymbol: "REP",
                    termLength: new BigNumber(6),
                    issuanceHash:
                        "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                    earnedAmount: new BigNumber(4),
                    repaymentSchedule: [1553557371],
                    status: "active",
                },
            ];

            tokens = [
                {
                    address: "0x07e93e27ac8a1c114f1931f65e3c8b5186b9b77e",
                    symbol: "MKR",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                },
            ];

            tokens = [
                {
                    address: "0x07e93e27ac8a1c114f1931f65e3c8b5186b9b77e",
                    symbol: "MKR",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                },
            ];

            props = { investments, tokens };
        });

        it("should have the correct tokenBalances", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(wrapper.state("tokenBalances")).toEqual({
                MKR: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(4),
                },
            });
        });

        it("should render 1 Token in Total Lended section", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(1);
            expect(investments.length).toEqual(2);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper).length,
            ).toEqual(1);
        });
    });

    describe("Only render Token with amount in Total Lended/Earned section", () => {
        beforeEach(() => {
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
                    principalAmount: new BigNumber(10),
                    principalTokenSymbol: "MKR",
                    termLength: new BigNumber(6),
                    issuanceHash:
                        "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                    earnedAmount: new BigNumber(0),
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
                    principalAmount: new BigNumber(10),
                    principalTokenSymbol: "REP",
                    termLength: new BigNumber(6),
                    issuanceHash:
                        "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                    earnedAmount: new BigNumber(4),
                    repaymentSchedule: [1553557371],
                    status: "active",
                },
            ];

            tokens = [
                {
                    address: "0x07e93e27ac8a1c114f1931f65e3c8b5186b9b77e",
                    symbol: "MKR",
                    name: "MKR",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                    numDecimals: new BigNumber(18),
                },
                {
                    address: "0x9b62bd396837417ce319e2e5c8845a5a960010ea",
                    symbol: "REP",
                    name: "REP",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                    numDecimals: new BigNumber(18),
                },
                {
                    address: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
                    symbol: "OMG",
                    name: "OMG",
                    tradingPermitted: true,
                    balance: new BigNumber(10000),
                    numDecimals: new BigNumber(18),
                },
            ];

            props = { investments, tokens };
        });

        it("should have the correct tokenBalances", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(wrapper.state("tokenBalances")).toEqual({
                MKR: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(0),
                },
                REP: {
                    totalLended: new BigNumber(10),
                    totalEarned: new BigNumber(4),
                },
                OMG: {
                    totalLended: new BigNumber(0),
                    totalEarned: new BigNumber(0),
                },
            });
        });

        it("should render 4 REP in Total Earned section", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(3);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(TokenWrapper).length,
            ).toEqual(1);
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(TokenWrapper)
                    .find(TokenAmount)
                    .prop("tokenAmount"),
            ).toEqual(new BigNumber(4));
            expect(
                wrapper
                    .find(HalfCol)
                    .last()
                    .find(TokenWrapper)
                    .find(TokenAmount)
                    .prop("tokenSymbol"),
            ).toEqual("REP");
        });

        it("should render 10 MKR and 10 REP in Total Lended section", () => {
            const wrapper = shallow(<InvestmentsMetrics {...props} />);
            expect(tokens.length).toEqual(3);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper).length,
            ).toEqual(2);
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper)
                    .first()
                    .find(TokenAmount)
                    .prop("tokenAmount"),
            ).toEqual(new BigNumber(10));
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper)
                    .first()
                    .find(TokenAmount)
                    .prop("tokenSymbol"),
            ).toEqual("MKR");

            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper)
                    .last()
                    .find(TokenAmount)
                    .prop("tokenAmount"),
            ).toEqual(new BigNumber(10));
            expect(
                wrapper
                    .find(HalfCol)
                    .first()
                    .find(TokenWrapper)
                    .last()
                    .find(TokenAmount)
                    .prop("tokenSymbol"),
            ).toEqual("REP");
        });
    });
});
