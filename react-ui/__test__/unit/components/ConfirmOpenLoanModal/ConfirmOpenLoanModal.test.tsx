import * as React from "react";
import * as _ from "lodash";
import { BigNumber } from "bignumber.js";
import { shallow, ShallowWrapper } from "enzyme";
import { Types } from "@dharmaprotocol/dharma.js";

import { convertTokenAmountByTicker } from "../../../../src/utils";
import {
    ConfirmOpenLoanModal,
    ConfirmOpenLoanModalType,
    Props,
} from "../../../../src/components/ConfirmOpenLoanModal/ConfirmOpenLoanModal";

jest.mock("../../../../src/utils", () => ({
    convertTokenAmountByTicker: jest.fn(
        (tokenAmount: Types.TokenAmount, ticker: string) => tokenAmount.decimalAmount,
    ),
}));

describe("ConfirmOpenLoanModal (Unit)", () => {
    const collateralTokenAmount = new Types.TokenAmount({
        amount: new BigNumber(100),
        symbol: "WETH",
        type: Types.TokenAmountType.Decimal,
    });

    const principalTokenAmount = new Types.TokenAmount({
        amount: new BigNumber(8000),
        symbol: "REP",
        type: Types.TokenAmountType.Decimal,
    });

    const DEFAULT_PROPS: Props = {
        amortizationUnit: "days",
        collateralTokenAmount,
        interestRate: new BigNumber(11),
        modalOpen: false,
        modalType: ConfirmOpenLoanModalType.Creditor,
        onConfirm: jest.fn(),
        onToggle: jest.fn(),
        principalTokenAmount,
        termLength: new BigNumber(12),
    };

    const perPaymentTokenAmount = new Types.TokenAmount({
        amount: new BigNumber(740),
        symbol: DEFAULT_PROPS.principalTokenAmount.tokenSymbol,
        type: Types.TokenAmountType.Decimal,
    });

    function generateComponent(props: Props = DEFAULT_PROPS): ShallowWrapper {
        return shallow(
            <ConfirmOpenLoanModal
                amortizationUnit={props.amortizationUnit}
                collateralTokenAmount={props.collateralTokenAmount}
                interestRate={props.interestRate}
                modalOpen={props.modalOpen}
                modalType={props.modalType}
                onConfirm={props.onConfirm}
                onToggle={props.onToggle}
                principalTokenAmount={props.principalTokenAmount}
                termLength={props.termLength}
            />,
        );
    }

    let confirmOpenLoanModalWrapper: ShallowWrapper;
    let confirmOpenLoanModalInstance: ConfirmOpenLoanModal;

    beforeEach(() => {
        confirmOpenLoanModalWrapper = generateComponent();
        confirmOpenLoanModalInstance = confirmOpenLoanModalWrapper.instance() as ConfirmOpenLoanModal;
    });

    describe("#render", () => {
        test("should render", () => {
            expect(confirmOpenLoanModalWrapper.length).toEqual(1);
        });
    });

    describe("#componentDidMount", () => {
        it("should call #getUsdAmounts", async () => {
            const getUsdAmountsSpy = jest
                .spyOn(confirmOpenLoanModalInstance, "getUsdAmounts")
                .mockImplementation(jest.fn());

            await confirmOpenLoanModalInstance.componentDidMount();

            expect(getUsdAmountsSpy).toHaveBeenCalled();
        });

        it("should call #calculateTotalOfPayments", async () => {
            const calculateTotalOfPaymentsSpy = jest
                .spyOn(confirmOpenLoanModalInstance, "calculateTotalOfPayments")
                .mockImplementation(jest.fn());

            await confirmOpenLoanModalInstance.componentDidMount();

            expect(calculateTotalOfPaymentsSpy).toHaveBeenCalled();
        });
    });

    describe("#getUsdAmounts", async () => {
        it("should calculate and set the perPaymentTokenAmount", async () => {
            await confirmOpenLoanModalInstance.getUsdAmounts();

            expect(confirmOpenLoanModalInstance.state.perPaymentTokenAmount).toEqual(
                perPaymentTokenAmount,
            );
        });

        it("should convert values to USD", async () => {
            await confirmOpenLoanModalInstance.getUsdAmounts();

            const tokenAmounts = [
                DEFAULT_PROPS.principalTokenAmount,
                DEFAULT_PROPS.collateralTokenAmount,
                perPaymentTokenAmount,
            ];

            const usdAmounts: BigNumber[] = [];

            for (const tokenAmount of tokenAmounts) {
                expect(convertTokenAmountByTicker).toHaveBeenCalledWith(tokenAmount, "USD");

                const usdAmount = await convertTokenAmountByTicker(tokenAmount, "USD");
                usdAmounts.push(usdAmount);
            }

            expect(confirmOpenLoanModalWrapper.state().principalUsdAmount).toEqual(usdAmounts[0]);
            expect(confirmOpenLoanModalWrapper.state().collateralUsdAmount).toEqual(usdAmounts[1]);
            expect(confirmOpenLoanModalWrapper.state().perPaymentUsdAmount).toEqual(usdAmounts[2]);
        });
    });

    describe("#calculateTotalOfPayments", () => {
        it("should calculate the totalOfPaymentsTokenAmount", () => {
            const perPaymentUsdAmount = new BigNumber(10);

            const totalOfPaymentsTokenAmount = new Types.TokenAmount({
                amount: new BigNumber(8880),
                symbol: perPaymentTokenAmount.tokenSymbol,
                type: Types.TokenAmountType.Decimal,
            });

            confirmOpenLoanModalWrapper.setState({
                perPaymentTokenAmount,
                perPaymentUsdAmount,
            });

            confirmOpenLoanModalInstance.calculateTotalOfPayments();

            expect(confirmOpenLoanModalInstance.state.totalOfPaymentsTokenAmount).toEqual(
                totalOfPaymentsTokenAmount,
            );
            expect(confirmOpenLoanModalInstance.state.totalOfPaymentsUsdAmount).toEqual(
                perPaymentUsdAmount.times(DEFAULT_PROPS.termLength),
            );
        });
    });
});
