import * as React from "react";
import { shallow, mount } from "enzyme";
import * as _ from "lodash";
import MockDharma from "__mocks__/dharma.js";
import { DebtsMetrics } from "src/modules/Dashboard/Debts/DebtsMetrics/DebtsMetrics";
import { TokenEntity, DebtEntity } from "src/models";
import { BigNumber } from "bignumber.js";
import {
    HalfCol,
    Value,
    TokenWrapper,
    Label,
} from "src/modules/Dashboard/Debts/DebtsMetrics/styledComponents";
import { TokenAmount } from "src/components";
import { DebtOrder as DharmaDebtOrder } from "@dharmaprotocol/dharma.js/dist/types/src/types";
import { FilledDebtEntity } from "../../../../../../src/models";

describe("<DebtsMetrics />", () => {
    const dharma: MockDharma = new MockDharma();
    let debtEntities: DebtEntity[];
    let tokens: TokenEntity[];
    let props: Object;

    beforeEach(() => {
        debtEntities = [
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
                issuanceHash: "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                repaidAmount: new BigNumber(4),
                repaymentSchedule: [1553557371],
                status: "active",
                json:
                    '{"principalToken":"0x9b62bd396837417ce319e2e5c8845a5a960010ea","principalAmount":"10","termsContract":"0x1c907384489d939400fa5c6571d8aad778213d74","termsContractParameters":"0x0000000000000000000000000000008500000000000000000000000000000064","kernelVersion":"0x89c5b853e9e32bf47c7da1ccb02e981b74c47f2f","issuanceVersion":"0x1d8e76d2022e017c6c276b44cb2e4c71bd3cc3de","debtor":"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935","debtorFee":"0","creditor":"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935","creditorFee":"0","relayer":"0x0000000000000000000000000000000000000000","relayerFee":"0","underwriter":"0x0000000000000000000000000000000000000000","underwriterFee":"0","underwriterRiskRating":"0","expirationTimestampInSec":"1524613355","salt":"0","debtorSignature":{"v":27,"r":"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d","s":"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788"},"creditorSignature":{"v":27,"r":"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d","s":"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788"},"underwriterSignature":{"r":"","s":"","v":0}}',
                creditor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
                description: "Hello, Can I borrow some REP please?",
                fillLoanShortUrl: "http://bit.ly/2I4bahM",
            },
        ];

        tokens = [
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

        props = { debtEntities, dharma, tokens };
    });

    describe("#render", () => {
        it("should render the component", () => {
            const wrapper = shallow(<DebtsMetrics {...props} />);
            expect(wrapper.length).toEqual(1);
        });
    });

    describe("#componentDidMount", async () => {
        it("should call initiateTokenBalance", async () => {
            const wrapper = shallow(<DebtsMetrics />);
            const spy = jest
                .spyOn(wrapper.instance(), "initiateTokenBalance")
                .mockImplementation(() => {});
            wrapper.setProps({ debtEntities, tokens });
            await expect(spy).toHaveBeenCalledWith(tokens);
            spy.mockRestore();
        });
    });

    describe("#initiateTokenBalance", () => {
        let debtEntities: FilledDebtEntity[];

        const tokens = [
            {
                address: "0x07e93e27ac8a1c114f1931f65e3c8b5186b9b77e",
                symbol: "MKR",
                name: "MKR",
                tradingPermitted: true,
                balance: new BigNumber(10000),
                numDecimals: new BigNumber(18),
            },
            {
                address: "0xc3017eb5cd063bf6745723895edead65257a5f6e",
                symbol: "ZRX",
                name: "ZRX",
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
                address: "0x744d70fdbe2ba4cf95131626614a1763df805b9e",
                symbol: "SNT",
                name: "SNT",
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

        beforeEach(async () => {
            const defaults = {
                debtor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
                dharmaOrder: {},
                amortizationUnit: "hours",
                interestRate: new BigNumber(3.12),
                principalAmount: new BigNumber(10),
                termLength: new BigNumber(6),
                repaidAmount: new BigNumber(4),
                repaymentSchedule: [1553557371],
                creditor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
                description: "Hello, Can I borrow some MKR please?",
                fillLoanShortUrl: "http://bit.ly/2I4bahM",
                totalExpectedRepayment: new BigNumber(
                    await dharma.servicing.getTotalExpectedRepayment(),
                ),
            };

            debtEntities = _.map(
                tokens,
                (token) =>
                    new FilledDebtEntity({
                        principalTokenSymbol: token.symbol,
                        description: `Hello, Can I borrow some ${token.symbol} please?`,
                        ...defaults,
                    }),
            );
        });

        it("should have the correct tokenBalances", async (done) => {
            const props = { debtEntities, dharma, tokens };
            const wrapper = shallow(<DebtsMetrics {...props} />);
            await wrapper.instance().initiateTokenBalance();

            process.nextTick(async () => {
                try {
                    expect(wrapper.state("tokenBalances")).toEqual({
                        MKR: {
                            totalOwed: new BigNumber(
                                await dharma.servicing.getTotalExpectedRepayment(),
                            ),
                            totalRepaid: new BigNumber(4),
                        },
                        ZRX: {
                            totalOwed: new BigNumber(
                                await dharma.servicing.getTotalExpectedRepayment(),
                            ),
                            totalRepaid: new BigNumber(4),
                        },
                        REP: {
                            totalOwed: new BigNumber(
                                await dharma.servicing.getTotalExpectedRepayment(),
                            ),
                            totalRepaid: new BigNumber(4),
                        },
                        SNT: {
                            totalOwed: new BigNumber(
                                await dharma.servicing.getTotalExpectedRepayment(),
                            ),
                            totalRepaid: new BigNumber(4),
                        },
                        OMG: {
                            totalOwed: new BigNumber(
                                await dharma.servicing.getTotalExpectedRepayment(),
                            ),
                            totalRepaid: new BigNumber(4),
                        },
                    });
                } catch (e) {
                    done();
                    return fail(e);
                }

                done();
            });
        });
    });
});
