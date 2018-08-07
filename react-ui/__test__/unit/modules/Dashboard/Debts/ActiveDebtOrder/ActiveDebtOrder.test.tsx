jest.unmock("@dharmaprotocol/dharma.js");

import { Types } from "@dharmaprotocol/dharma.js";

import * as React from "react";
import { shallow } from "enzyme";
import { ActiveDebtOrder } from "src/modules/Dashboard/Debts/ActiveDebtOrder/ActiveDebtOrder";
import {
    Wrapper,
    ImageContainer,
    IdenticonImage,
    DetailContainer,
    Amount,
    Url,
    StatusActive,
    StatusPending,
    Terms,
    RepaymentScheduleContainer,
    Title,
    Schedule,
    ScheduleIconContainer,
    Strikethrough,
    PaymentDate,
    ShowMore,
    DetailLink,
    Drawer,
    InfoItem,
    InfoItemTitle,
    InfoItemContent,
    ActionButton,
    PendingActionContainer,
    CancelButton,
} from "src/modules/Dashboard/Debts/ActiveDebtOrder/styledComponents";
import { Collapse } from "reactstrap";
import {
    formatDate,
    formatTime,
    getIdenticonImgSrc,
    shortenString,
    amortizationUnitToFrequency,
} from "src/utils";
import { BigNumber } from "bignumber.js";
import MockDharma from "__mocks__/dharma.js";
import { TokenAmount } from "src/components";
import { ScheduleIcon } from "src/components/scheduleIcon/scheduleIcon";
import {
    FilledCollateralizedDebtEntity,
    FilledDebtEntity,
    OpenDebtEntity,
} from "../../../../../../src/models";

describe("<ActiveDebtOrder />", () => {
    const debtOrderInstance: Types.DebtOrder = {
        debtor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
        termsContract: "0x1c907384489d939400fa5c6571d8aad778213d74",
        termsContractParameters:
            "0x0000000000000000000000000000008500000000000000000000000000000064",
        underwriter: "0x0000000000000000000000000000000000000000",
        underwriterRiskRating: new BigNumber(0),
        principalAmount: new BigNumber(100),
        creditor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
    };

    const debtEntity: FilledDebtEntity = new FilledDebtEntity({
        amortizationUnit: "hours",
        creditor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
        debtor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
        dharmaOrder: debtOrderInstance,
        description: "Hello, Can I borrow some REP please?",
        fillLoanShortUrl: "http://bit.ly/2I4bahM",
        interestRate: new BigNumber(3.12),
        issuanceHash: "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
        principalAmount: new BigNumber(100),
        principalTokenSymbol: "REP",
        repaidAmount: new BigNumber(4),
        repaymentSchedule: [1553557371],
        termLength: new BigNumber(6),
        totalExpectedRepayment: new BigNumber(103.12),
    });

    describe("#render", () => {
        let wrapper;
        let props;
        beforeEach(() => {
            props = {
                currentTime: 12345,
                debtEntity,
                dharma: new MockDharma(),
                accounts: [],
                handleSuccessfulRepayment: jest.fn(),
                handleSetErrorToast: jest.fn(),
                handleSetSuccessToast: jest.fn(),
                handleCancelDebtEntity: jest.fn(),
            };
            wrapper = shallow(<ActiveDebtOrder {...props} />);
        });

        it("should render successfully", () => {
            expect(wrapper.length).toEqual(1);
        });

        it("should not render when there is no debtEntity", () => {
            wrapper.setProps({ debtEntity: null });
            expect(wrapper.find(Wrapper).length).toEqual(0);
        });

        describe("<ImageContainer />", () => {
            it("should render", () => {
                expect(wrapper.find(ImageContainer).length).toEqual(1);
            });

            it("should render a <IdenticonImage />", () => {
                const identiconImgSrc = getIdenticonImgSrc(props.debtEntity.issuanceHash, 60, 0.1);
                expect(wrapper.find(ImageContainer).find(IdenticonImage).length).toEqual(1);
                expect(
                    wrapper
                        .find(ImageContainer)
                        .find(IdenticonImage)
                        .prop("src"),
                ).toEqual(identiconImgSrc);
            });
        });

        describe("<DetailContainer />", () => {
            let detailContainer;
            beforeEach(() => {
                detailContainer = wrapper.find(DetailContainer);
            });

            it("should render", () => {
                expect(detailContainer.length).toEqual(1);
            });

            it("should render correct <Amount />", () => {
                expect(detailContainer.find(Amount).length).toEqual(1);
                expect(
                    detailContainer
                        .find(Amount)
                        .find(TokenAmount)
                        .prop("tokenAmount"),
                ).toEqual(props.debtEntity.principalAmount);
                expect(
                    detailContainer
                        .find(Amount)
                        .find(TokenAmount)
                        .prop("tokenSymbol"),
                ).toEqual(props.debtEntity.principalTokenSymbol);
            });

            describe("<Url />", () => {
                it("should render correct <Url /> when status is active", () => {
                    wrapper.setProps({ debtEntity: props.debtEntity });
                    detailContainer = wrapper.find(DetailContainer);
                    expect(detailContainer.find(Url).length).toEqual(1);
                    expect(detailContainer.find(Url).get(0).props.children).toEqual(
                        shortenString(props.debtEntity.issuanceHash),
                    );
                });
            });

            it("should render a Make Repayment button if collateral is not returnable", () => {
                props.debtEntity.collateralReturnable = false;
                wrapper.setProps({ debtEntity: props.debtEntity });
                detailContainer = wrapper.find(DetailContainer);
                expect(detailContainer.find(ActionButton).length).toEqual(1);
                expect(
                    detailContainer
                        .find(ActionButton)
                        .first()
                        .props().children,
                ).toEqual("Make Repayment");
            });

            it("should render <StatusActive /> if active", () => {
                expect(detailContainer.find(StatusActive).length).toEqual(1);
            });

            it("should render a <Terms />", () => {
                expect(detailContainer.find(Terms).length).toEqual(1);
            });
        });

        describe("<RepaymentScheduleContainer />", () => {
            it("should render", () => {
                wrapper.setProps({ props });
                expect(wrapper.find(RepaymentScheduleContainer).length).toEqual(1);
            });

            it("should render a <Title />", () => {
                expect(wrapper.find(RepaymentScheduleContainer).find(Title).length).toEqual(1);
            });

            describe("<Schedule />", () => {
                it("should render", () => {
                    expect(wrapper.find(Schedule).length).toEqual(1);
                });

                it("should render a <ScheduleContainer />", () => {
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(ScheduleIconContainer).length,
                    ).toEqual(1);
                });

                it("should render <ScheduleIcon />", () => {
                    props.debtEntity.repaymentSchedule = [0];
                    wrapper.setProps({ debtEntity: props.debtEntity });
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(ScheduleIconContainer)
                            .find(ScheduleIcon).length,
                    ).toEqual(1);
                });

                it("should render time in <PaymentDate />", () => {
                    props.debtEntity.amortizationUnit = "hours";
                    props.debtEntity.repaymentSchedule = [2553557371];
                    wrapper.setProps({ debtEntity: props.debtEntity });
                    const expectedValue = formatTime(2553557371);
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(PaymentDate).length,
                    ).toEqual(1);
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(PaymentDate)
                            .get(0).props.children,
                    ).toEqual(expectedValue);
                });

                it("should render date in <PaymentDate />", () => {
                    props.debtEntity.amortizationUnit = "days";
                    wrapper.setProps({ debtEntity: props.debtEntity });
                    const expectedValue = formatDate(2553557371);
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(PaymentDate).length,
                    ).toEqual(1);
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(PaymentDate)
                            .get(0).props.children,
                    ).toEqual(expectedValue);
                });

                it("last <Schedule /> should render <ShowMore /> when there is more than 5 repayment schedules", () => {
                    props.debtEntity.repaymentSchedule = [
                        1553557371,
                        1553657371,
                        1553757371,
                        1553857371,
                        1553957371,
                        1554 - 57371,
                    ];
                    wrapper.setProps({ debtEntity: props.debtEntity });
                    expect(
                        wrapper
                            .find(Schedule)
                            .last()
                            .find(ShowMore).length,
                    ).toEqual(1);
                });
            });

            describe("#status pending", () => {
                let detailContainer;

                beforeEach(() => {
                    props.debtEntity = new OpenDebtEntity({
                        amortizationUnit: "hours",
                        debtor: "0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935",
                        dharmaOrder: debtOrderInstance,
                        description: "Hello, Can I borrow some REP please?",
                        fillLoanShortUrl: "http://bit.ly/2I4bahM",
                        interestRate: new BigNumber(3.12),
                        issuanceHash:
                            "0x89e9eac37c5f14b657c69ccd891704b3236b84b9ca1d449bd09c5fbaa24afebf",
                        principalAmount: new BigNumber(100),
                        principalTokenSymbol: "REP",
                        termLength: new BigNumber(6),
                    });

                    wrapper.setProps({ debtEntity: props.debtEntity });
                    detailContainer = wrapper.find(DetailContainer);
                });

                it("should render correct <Url />", () => {
                    expect(detailContainer.find(Url).find(DetailLink).length).toEqual(1);
                    expect(
                        detailContainer
                            .find(Url)
                            .find(DetailLink)
                            .prop("to"),
                    ).toEqual("/request/success/?issuanceHash=" + props.debtEntity.issuanceHash);
                    expect(
                        detailContainer
                            .find(Url)
                            .find(DetailLink)
                            .get(0).props.children,
                    ).toEqual(shortenString(props.debtEntity.issuanceHash));
                });

                it("should not render a <MakeRepaymentButton />", () => {
                    expect(detailContainer.find(ActionButton).length).toEqual(0);
                });

                it("should render <StatusPending />", () => {
                    expect(detailContainer.find(StatusPending).length).toEqual(1);
                });

                it("should render <CancelButton />", () => {
                    expect(wrapper.find(PendingActionContainer).find(CancelButton).length).toEqual(
                        1,
                    );
                });

                it("should not render <RepaymentScheduleContainer />", () => {
                    expect(wrapper.find(RepaymentScheduleContainer).length).toEqual(0);
                });
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

            it("should render 6 <InfoItem />", () => {
                expect(collapse.find(InfoItem).length).toEqual(6);
            });

            it("1st <InfoItem /> should render Requested info", () => {
                const elm = collapse.find(InfoItem).at(0);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Requested");
                expect(
                    elm
                        .find(InfoItemContent)
                        .find(TokenAmount)
                        .prop("tokenAmount"),
                ).toEqual(props.debtEntity.principalAmount);
                expect(
                    elm
                        .find(InfoItemContent)
                        .find(TokenAmount)
                        .prop("tokenSymbol"),
                ).toEqual(props.debtEntity.principalTokenSymbol);
            });

            it("2nd <InfoItem /> should render Repaid info", () => {
                const elm = collapse.find(InfoItem).at(1);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Repaid");
                expect(
                    elm
                        .find(InfoItemContent)
                        .find(TokenAmount)
                        .prop("tokenAmount"),
                ).toEqual(props.debtEntity.repaidAmount);
                expect(
                    elm
                        .find(InfoItemContent)
                        .find(TokenAmount)
                        .prop("tokenSymbol"),
                ).toEqual(props.debtEntity.principalTokenSymbol);
            });

            it("3rd <InfoItem /> should render Term Length info", () => {
                const elm = collapse.find(InfoItem).at(2);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Term Length");
                const content =
                    props.debtEntity.termLength.toNumber() +
                    " " +
                    props.debtEntity.amortizationUnit;
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });

            it("4th <InfoItem /> should render Interest Rate info", () => {
                const elm = collapse.find(InfoItem).at(3);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Interest Rate");
                const content = props.debtEntity.interestRate.toNumber() + "%";
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });

            it("5th <InfoItem /> should render Installment Frequency info", () => {
                const elm = collapse.find(InfoItem).at(4);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual(
                    "Installment Frequency",
                );
                const content = amortizationUnitToFrequency(props.debtEntity.amortizationUnit);
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });

            it("6th <InfoItem /> should render Description info", () => {
                const elm = collapse.find(InfoItem).at(5);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Description");
                const content = props.debtEntity.description;
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });
        });
    });

    describe("#onClick Wrapper", () => {
        it("should call toggleDrawer on click", () => {
            const props = { debtEntity, dharma: new MockDharma(), currentTime: 12345 };
            const spy = jest.spyOn(ActiveDebtOrder.prototype, "toggleDrawer");
            const wrapper = shallow(<ActiveDebtOrder {...props} />);
            wrapper.simulate("click");
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        it("toggleDrawer should call setState", () => {
            const props = { debtEntity, dharma: new MockDharma(), currentTime: 12345 };
            const spy = jest.spyOn(ActiveDebtOrder.prototype, "setState");
            const wrapper = shallow(<ActiveDebtOrder {...props} />);
            const collapse = wrapper.state("collapse");
            wrapper.simulate("click");
            expect(spy).toHaveBeenCalledWith({ collapse: !collapse });
            spy.mockRestore();
        });
    });

    describe("#onClick <MakeRepaymentButton />", () => {
        it("should call makeRepayment", () => {
            const props = { debtEntity, dharma: new MockDharma(), currentTime: 12345 };
            const spy = jest.spyOn(ActiveDebtOrder.prototype, "handleMakeRepaymentClick");
            const wrapper = shallow(<ActiveDebtOrder {...props} />);
            const event = {
                stopPropagation: jest.fn(),
            };
            wrapper.find(ActionButton).simulate("click", event);
            expect(spy).toHaveBeenCalledWith(event);
            spy.mockRestore();
        });
    });
});
