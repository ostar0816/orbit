import * as React from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import { ClipLoader } from "react-spinners";
import { BigNumber } from "bignumber.js";
import { Types } from "@dharmaprotocol/dharma.js";
const singleLineString = require("single-line-string");

import { CreditorModalContent } from "./CreditorModalContent";
import { DebtorModalContent } from "./DebtorModalContent";
import { StyledModalBodyBold, StyledModalBodyDetail } from "./styledComponents";

import { convertTokenAmountByTicker } from "../../utils";

export enum ConfirmOpenLoanModalType {
    Creditor = "Creditor",
    Debtor = "Debtor",
}

export interface ModalContentProps {
    amortizationUnit: string;
    perPaymentTokenAmount: Types.TokenAmount;
    perPaymentUsdAmount: BigNumber;
    principalTokenAmount: Types.TokenAmount;
    principalUsdAmount: BigNumber;
    termLength: BigNumber;
}

export interface Props {
    amortizationUnit: string;
    awaitingTransaction?: boolean;
    collateralTokenAmount: Types.TokenAmount;
    interestRate: BigNumber;
    modalOpen: boolean;
    modalType: ConfirmOpenLoanModalType;
    onConfirm: () => void;
    onToggle?: () => void;
    principalTokenAmount: Types.TokenAmount;
    termLength: BigNumber;
}

interface State {
    collateralUsdAmount?: BigNumber;
    perPaymentTokenAmount?: Types.TokenAmount;
    perPaymentUsdAmount?: BigNumber;
    principalUsdAmount?: BigNumber;
    totalOfPaymentsTokenAmount?: Types.TokenAmount;
    totalOfPaymentsUsdAmount?: BigNumber;
}

class ConfirmOpenLoanModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    async componentWillReceiveProps(nextProps: Props) {
        await this.getUsdAmounts(nextProps);
        this.calculateTotalOfPayments(nextProps);
    }

    async getUsdAmounts(props: Props) {
        const { collateralTokenAmount, interestRate, principalTokenAmount, termLength } = props;

        const perPaymentTokenAmount = new Types.TokenAmount({
            amount: principalTokenAmount.rawAmount
                .times(interestRate.div(100).plus(1))
                .div(termLength),
            symbol: principalTokenAmount.tokenSymbol,
            type: Types.TokenAmountType.Raw,
        });

        const principalUsdAmount = await convertTokenAmountByTicker(principalTokenAmount, "USD");
        const collateralUsdAmount = await convertTokenAmountByTicker(collateralTokenAmount, "USD");
        const perPaymentUsdAmount = await convertTokenAmountByTicker(perPaymentTokenAmount, "USD");

        this.setState({
            collateralUsdAmount,
            perPaymentTokenAmount,
            perPaymentUsdAmount,
            principalUsdAmount,
        });
    }

    calculateTotalOfPayments(props: Props) {
        const { termLength } = props;

        const { perPaymentTokenAmount, perPaymentUsdAmount } = this.state;

        if (!perPaymentTokenAmount || !perPaymentUsdAmount) {
            return;
        }

        const totalOfPaymentsTokenAmount = new Types.TokenAmount({
            amount: perPaymentTokenAmount.rawAmount.times(termLength),
            symbol: perPaymentTokenAmount.tokenSymbol,
            type: Types.TokenAmountType.Raw,
        });

        const totalOfPaymentsUsdAmount = perPaymentUsdAmount.times(termLength);

        this.setState({
            totalOfPaymentsTokenAmount,
            totalOfPaymentsUsdAmount,
        });
    }

    render() {
        const {
            amortizationUnit,
            awaitingTransaction,
            collateralTokenAmount,
            interestRate,
            modalType,
            onConfirm,
            onToggle,
            principalTokenAmount,
            termLength,
        } = this.props;

        const {
            collateralUsdAmount,
            perPaymentTokenAmount,
            perPaymentUsdAmount,
            principalUsdAmount,
            totalOfPaymentsTokenAmount,
            totalOfPaymentsUsdAmount,
        } = this.state;

        if (
            !collateralUsdAmount ||
            !perPaymentTokenAmount ||
            !perPaymentUsdAmount ||
            !principalUsdAmount ||
            !totalOfPaymentsTokenAmount ||
            !totalOfPaymentsUsdAmount
        ) {
            return null;
        }

        let modalContent: React.ReactElement<any>;
        let confirmButtonText: string;
        let closeButtonText: string;

        if (modalType === ConfirmOpenLoanModalType.Debtor) {
            modalContent = (
                <DebtorModalContent
                    amortizationUnit={amortizationUnit}
                    perPaymentTokenAmount={perPaymentTokenAmount}
                    perPaymentUsdAmount={perPaymentUsdAmount}
                    principalTokenAmount={principalTokenAmount}
                    principalUsdAmount={principalUsdAmount}
                    termLength={termLength}
                />
            );
            confirmButtonText = "Generate Request";
            closeButtonText = "Modify Request";
        } else {
            modalContent = (
                <CreditorModalContent
                    amortizationUnit={amortizationUnit}
                    perPaymentTokenAmount={perPaymentTokenAmount}
                    perPaymentUsdAmount={perPaymentUsdAmount}
                    principalTokenAmount={principalTokenAmount}
                    principalUsdAmount={principalUsdAmount}
                    termLength={termLength}
                />
            );
            confirmButtonText = "Fill Request";
            closeButtonText = "Cancel";
        }

        return (
            <div>
                <Modal
                    isOpen={this.props.modalOpen}
                    toggle={onToggle}
                    keyboard={false}
                    backdrop={"static"}
                >
                    {modalContent}
                    <ModalBody>
                        <Row>
                            <Col>{"Interest Rate"}</Col>

                            <Col className={"align-right"}>
                                <StyledModalBodyBold>
                                    {`${interestRate.toNumber()}%`}
                                </StyledModalBodyBold>
                            </Col>
                        </Row>
                        <Row>
                            <Col>{"Total of Payments"}</Col>
                            <Col className={"align-right"}>
                                <StyledModalBodyBold>
                                    {`${totalOfPaymentsTokenAmount.toString()} (${totalOfPaymentsUsdAmount.toFormat(
                                        2,
                                    )} USD* )`}
                                </StyledModalBodyBold>
                            </Col>
                        </Row>
                        <Row>
                            <Col>{"Collateral"}</Col>
                            <Col className={"align-right"}>
                                <StyledModalBodyBold>
                                    {`${collateralTokenAmount.toString()} (${collateralUsdAmount.toFormat(
                                        2,
                                    )} USD* )`}
                                </StyledModalBodyBold>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalBody>
                        <Row>
                            <StyledModalBodyDetail>
                                {singleLineString`* All conversions to USD are estimates.
                                Borrowers and lenders should understand that token values are volatile.`}
                            </StyledModalBodyDetail>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Row className="button-container">
                            <Col>
                                <Button
                                    className="button secondary width-95"
                                    disabled={!!awaitingTransaction}
                                    onClick={onToggle}
                                >
                                    {closeButtonText}
                                </Button>
                            </Col>

                            <Col className={"align-right"}>
                                <Button
                                    className={"button width-95"}
                                    disabled={!!awaitingTransaction}
                                    onClick={onConfirm}
                                >
                                    {confirmButtonText}
                                    <ClipLoader
                                        size={12}
                                        color={"#FFFFFF"}
                                        loading={!!awaitingTransaction}
                                    />
                                </Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export { ConfirmOpenLoanModal };
