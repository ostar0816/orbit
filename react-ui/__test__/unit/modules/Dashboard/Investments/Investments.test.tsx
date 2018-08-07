import * as React from "react";
import { shallow, mount } from "enzyme";
import { Investments } from "../../../../../src/modules/Dashboard/Investments/Investments";
import { Header, MainWrapper } from "../../../../../src/components";
import { InvestmentsMetricsContainer } from "../../../../../src/modules/Dashboard/Investments/InvestmentsMetrics/InvestmentsMetricsContainer";
import { ActiveInvestmentContainer } from "../../../../../src/modules/Dashboard/Investments/ActiveInvestment/ActiveInvestmentContainer";
import { InvestmentHistory } from "../../../../../src/modules/Dashboard/Investments/InvestmentHistory";
import { BigNumber } from "bignumber.js";

describe("<Investments />", () => {
    describe("#render", () => {
        let wrapper;
        let props;

        beforeEach(() => {
            props = {
                investments: [],
            };
            wrapper = shallow(<Investments {...props} />);
        });

        it("should render successfully", () => {
            expect(wrapper.length).toEqual(1);
        });

        it("should render a <Header />", () => {
            expect(wrapper.find(MainWrapper).find(Header).length).toEqual(1);
        });

        it("should render an <InvestmentsMetricsContainer />", () => {
            expect(wrapper.find(MainWrapper).find(InvestmentsMetricsContainer).length).toEqual(1);
        });

        it("should render 0 <ActiveInvestmentContainer />", () => {
            expect(wrapper.find(MainWrapper).find(ActiveInvestmentContainer).length).toEqual(0);
        });

        it("should render a <InvestmentHistory />", () => {
            expect(wrapper.find(MainWrapper).find(InvestmentHistory).length).toEqual(1);
        });
    });

    describe("#componentDidMount", () => {
        it("should call getInvestmentsDetails", () => {
            const spy = jest.spyOn(Investments.prototype, "getInvestmentsDetails");
            const props = {
                investments: [],
            };
            const wrapper = shallow(<Investments {...props} />);
            expect(spy).toHaveBeenCalledWith([]);
        });
    });

    describe("#componentDidUpdate", () => {
        it("should call getInvestmentsDetails", () => {
            const props = {
                investments: null,
            };
            const wrapper = shallow(<Investments {...props} />);
            const spy = jest.spyOn(wrapper.instance(), "getInvestmentsDetails");
            const investments = [
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
            ];
            wrapper.setProps({ investments });
            expect(spy).toHaveBeenCalledWith(investments);
        });
    });

    describe("#getInvestmentsDetails", () => {
        let determineExpectedState = (investments) => {
            const allInvestments = [];
            const activeInvestments = [];
            const inactiveInvestments = [];
            for (let investment of investments) {
                if (investment.status === "active") {
                    activeInvestments.push(investment);
                } else {
                    inactiveInvestments.push(investment);
                }
                allInvestments.push(investment);
            }
            const expectedState = {
                allInvestments,
                activeInvestments,
                inactiveInvestments,
            };
            return expectedState;
        };

        const investments = [
            {
                json:
                    '{"principalToken":"0x9b62bd396837417ce319e2e5c8845a5a960010ea","principalAmount":"10","termsContract":"0x1c907384489d939400fa5c6571d8aad778213d74","termsContractParameters":"0x0000000000000000000000000000008500000000000000000000000000000064","kernelVersion":"0x89c5b853e9e32bf47c7da1ccb02e981b74c47f2f","issuanceVersion":"0x1d8e76d2022e017c6c276b44cb2e4c71bd3cc3de","debtor":"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935","debtorFee":"0","creditor":"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935","creditorFee":"0","relayer":"0x0000000000000000000000000000000000000000","relayerFee":"0","underwriter":"0x0000000000000000000000000000000000000000","underwriterFee":"0","underwriterRiskRating":"0","expirationTimestampInSec":"1524613355","salt":"0","debtorSignature":{"v":27,"r":"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d","s":"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788"},"creditorSignature":{"v":27,"r":"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d","s":"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788"},"underwriterSignature":{"r":"","s":"","v":0}}',
                principalTokenSymbol: "REP",
                description: "Hello, Can I borrow some REP please?",
                issuanceHash: "active",
                earnedAmount: new BigNumber(4),
                termLength: new BigNumber(100),
                interestRate: new BigNumber(12.3),
                amortizationUnit: "hours",
                status: "active",
            },
        ];

        it("returns without setting state if investments is null", () => {
            const props = {
                investments: null,
            };
            const wrapper = shallow(<Investments {...props} />);
            const spy = jest.spyOn(wrapper.instance(), "setState");

            wrapper.instance().getInvestmentsDetails(null);
            expect(spy).not.toHaveBeenCalled();
            spy.mockRestore();
        });

        it("add investment to activeInvestments when status is active", () => {
            const props = {
                investments,
            };
            props.investments[0].status = "active";
            const wrapper = shallow(<Investments {...props} />);
            const expectedState = determineExpectedState(props.investments);
            expect(wrapper.state()).toEqual(expectedState);
        });

        it("add investment to inactiveInvestments when status is inactive", () => {
            const props = {
                investments,
            };
            props.investments[0].status = "inactive";
            const wrapper = shallow(<Investments {...props} />);
            const expectedState = determineExpectedState(props.investments);
            expect(wrapper.state()).toEqual(expectedState);
        });
    });
});
