import * as React from "react";
import { shallow } from "enzyme";
import { ActiveInvestment } from "src/modules/Dashboard/Investments/ActiveInvestment/ActiveInvestment";
import {
    Wrapper,
    ImageContainer,
    IdenticonImage,
    DetailContainer,
    Amount,
    Url,
    StatusActive,
    StatusDefaulted,
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
    TransferButton,
} from "src/modules/Dashboard/Investments/ActiveInvestment/styledComponents";
import { Collapse } from "reactstrap";
import {
    formatDate,
    formatTime,
    getIdenticonImgSrc,
    shortenString,
    amortizationUnitToFrequency,
} from "src/utils";
import { BigNumber } from "bignumber.js";
import { TokenAmount } from "src/components";
import { ScheduleIcon } from "src/components/scheduleIcon/scheduleIcon";

describe("<ActiveInvestment />", () => {
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

    let investment;

    beforeEach(() => {
        investment = {
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
    });

    describe("#render", () => {
        let wrapper;
        let props;
        beforeEach(() => {
            props = { investment, currentTime: 12345, tokens };
            wrapper = shallow(<ActiveInvestment {...props} />);
        });

        it("should render successfully", () => {
            expect(wrapper.length).toEqual(1);
        });

        it("should not render when there is no investment", () => {
            wrapper.setProps({ investment: null });
            expect(wrapper.find(Wrapper).length).toEqual(0);
        });

        describe("<ImageContainer />", () => {
            it("should render", () => {
                expect(wrapper.find(ImageContainer).length).toEqual(1);
            });

            it("should render a <IdenticonImage />", () => {
                const identiconImgSrc = getIdenticonImgSrc(props.investment.issuanceHash, 60, 0.1);
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
                ).toEqual(props.investment.principalAmount);
                expect(
                    detailContainer
                        .find(Amount)
                        .find(TokenAmount)
                        .prop("tokenSymbol"),
                ).toEqual(props.investment.principalTokenSymbol);
            });

            it("should render <StatusActive /> if active", () => {
                expect(detailContainer.find(StatusActive).length).toEqual(1);
            });

            it("should render <StatusDefaulted /> if status defaulted", () => {
                props.investment.status = "defaulted";
                wrapper.setProps({ props });
                detailContainer = wrapper.find(DetailContainer);
                expect(detailContainer.find(StatusDefaulted).length).toEqual(1);
            });

            it("should render a <Terms />", () => {
                expect(detailContainer.find(Terms).length).toEqual(1);
            });
        });

        describe("<RepaymentScheduleContainer />", () => {
            it("should render", () => {
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

                it('should render <ScheduleIcon state="past" />', () => {
                    props.investment.repaymentSchedule = [0];
                    wrapper.setProps({ investment: props.investment });
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(ScheduleIconContainer)
                            .find(ScheduleIcon).length,
                    ).toEqual(1);
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(ScheduleIconContainer)
                            .find(ScheduleIcon)
                            .prop("state"),
                    ).toEqual("past");
                });

                it('should render <ScheduleIcon state="future" />', () => {
                    props.investment.repaymentSchedule = [1234567];
                    wrapper.setProps({ investment: props.investment });
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(ScheduleIconContainer)
                            .find(ScheduleIcon).length,
                    ).toEqual(1);
                    expect(
                        wrapper
                            .find(Schedule)
                            .first()
                            .find(ScheduleIconContainer)
                            .find(ScheduleIcon)
                            .prop("state"),
                    ).toEqual("future");
                });

                it("should render time in <PaymentDate />", () => {
                    props.investment.repaymentSchedule = [2553557371];
                    props.investment.amortizationUnit = "hours";
                    wrapper.setProps({ investment: props.investment });
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
                    props.investment.repaymentSchedule = [2553557371];
                    props.investment.amortizationUnit = "days";
                    wrapper.setProps({ investment: props.investment });
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
                    props.investment.repaymentSchedule = [
                        1553557371,
                        1553657371,
                        1553757371,
                        1553857371,
                        1553957371,
                        1554 - 57371,
                    ];
                    wrapper.setProps({ investment: props.investment });
                    expect(
                        wrapper
                            .find(Schedule)
                            .last()
                            .find(ShowMore).length,
                    ).toEqual(1);
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

            it("should render 5 <InfoItem />", () => {
                expect(collapse.find(InfoItem).length).toEqual(5);
            });

            it("1st <InfoItem /> should render Lent info", () => {
                const elm = collapse.find(InfoItem).at(0);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Lent");
                expect(
                    elm
                        .find(InfoItemContent)
                        .find(TokenAmount)
                        .prop("tokenAmount"),
                ).toEqual(props.investment.principalAmount);
                expect(
                    elm
                        .find(InfoItemContent)
                        .find(TokenAmount)
                        .prop("tokenSymbol"),
                ).toEqual(props.investment.principalTokenSymbol);
            });

            it("2nd <InfoItem /> should render Earned info", () => {
                const elm = collapse.find(InfoItem).at(1);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Earned");
                expect(
                    elm
                        .find(InfoItemContent)
                        .find(TokenAmount)
                        .prop("tokenAmount"),
                ).toEqual(props.investment.earnedAmount);
                expect(
                    elm
                        .find(InfoItemContent)
                        .find(TokenAmount)
                        .prop("tokenSymbol"),
                ).toEqual(props.investment.principalTokenSymbol);
            });

            it("3rd <InfoItem /> should render Term Length info", () => {
                const elm = collapse.find(InfoItem).at(2);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Term Length");
                const content =
                    props.investment.termLength.toNumber() +
                    " " +
                    props.investment.amortizationUnit;
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });

            it("4th <InfoItem /> should render Interest Rate info", () => {
                const elm = collapse.find(InfoItem).at(3);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual("Interest Rate");
                const content = props.investment.interestRate.toNumber() + "%";
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });

            it("5th <InfoItem /> should render Installment Frequency info", () => {
                const elm = collapse.find(InfoItem).at(4);
                expect(elm.find(InfoItemTitle).get(0).props.children).toEqual(
                    "Installment Frequency",
                );
                const content = amortizationUnitToFrequency(props.investment.amortizationUnit);
                expect(elm.find(InfoItemContent).get(0).props.children).toEqual(content);
            });
        });
    });

    describe("#onClick Wrapper", () => {
        it("should call toggleDrawer on click", () => {
            const props = { investment, currentTime: 12345, tokens };
            const spy = jest.spyOn(ActiveInvestment.prototype, "toggleDrawer");
            const wrapper = shallow(<ActiveInvestment {...props} />);
            wrapper.simulate("click");
            expect(spy).toHaveBeenCalled();
        });

        it("toggleDrawer should call setState", () => {
            const props = { investment, currentTime: 12345, tokens };
            const spy = jest.spyOn(ActiveInvestment.prototype, "setState");
            const wrapper = shallow(<ActiveInvestment {...props} />);
            const collapse = wrapper.state("collapse");
            wrapper.simulate("click");
            expect(spy).toHaveBeenCalledWith({ collapse: !collapse });
        });
    });
});
