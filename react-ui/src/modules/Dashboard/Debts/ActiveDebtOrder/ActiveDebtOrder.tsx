// External libraries
import * as React from "react";
import { Row, Col, Collapse } from "reactstrap";
import { BigNumber } from "bignumber.js";
import { Dharma } from "@dharmaprotocol/dharma.js";

// Utils
import {
    formatDate,
    formatTime,
    getIdenticonImgSrc,
    shortenString,
    amortizationUnitToFrequency,
} from "../../../../utils";

// Models
import {
    DebtEntity,
    FilledDebtEntity,
    FilledCollateralizedDebtEntity,
    OpenDebtEntity,
    TokenEntity,
} from "../../../../models";

// Styled components
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
    DetailLink,
    Drawer,
    InfoItem,
    InfoItemTitle,
    InfoItemContent,
    ActionButton,
    Schedule,
    ScheduleIconContainer,
    Strikethrough,
    ShowMore,
    PaymentDate,
    PendingActionContainer,
    CancelButton,
    ShareButton,
} from "./styledComponents";

// Shared Components
import { MakeRepaymentModal, ConfirmationModal, Bold } from "../../../../components";
import { TokenAmount } from "src/components";
import { web3Errors } from "src/common/web3Errors";

// Icons
import { ScheduleIcon } from "../../../../components/scheduleIcon/scheduleIcon";

// Common
import { BLOCKCHAIN_API } from "../../../../common/constants";

interface Props {
    currentTime?: number;
    debtEntity: DebtEntity;
    dharma: Dharma;
    accounts: string[];
    handleSuccessfulRepayment: (
        agreementId: string,
        repaymentAmount: BigNumber,
        repaymentSymbol: string,
    ) => void;
    handleSetErrorToast: (errorMessage: string) => void;
    handleSetSuccessToast: (successMessage: string | JSX.Element) => void;
    handleCancelDebtEntity: (issuanceHash: string) => void;
    updateDebtEntity: (debtEntity: DebtEntity) => void;
    tokens: TokenEntity[];
    recommendedGasPrice: BigNumber;
}

interface State {
    awaitingCancelTx: boolean;
    awaitingRepaymentTx: boolean;
    collapse: boolean;
    collateralTokenDecimals: BigNumber;
    confirmationModal: boolean;
    makeRepayment: boolean;
    missedPayments: object;
    principalTokenDecimals: BigNumber;
    returningCollateral: boolean;
    showReturnCollateralModal: boolean;
}

class ActiveDebtOrder extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            awaitingCancelTx: false,
            awaitingRepaymentTx: false,
            collapse: false,
            collateralTokenDecimals: new BigNumber(0),
            confirmationModal: false,
            makeRepayment: false,
            missedPayments: {},
            principalTokenDecimals: new BigNumber(0),
            returningCollateral: false,
            showReturnCollateralModal: false,
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.toggleRepaymentModal = this.toggleRepaymentModal.bind(this);
        this.toggleReturnCollateralModal = this.toggleReturnCollateralModal.bind(this);
        this.handleMakeRepaymentClick = this.handleMakeRepaymentClick.bind(this);
        this.handleReturnCollateral = this.handleReturnCollateral.bind(this);
        this.handleReturnCollateralButtonClicked = this.handleReturnCollateralButtonClicked.bind(
            this,
        );
        this.handleRepaymentFormSubmission = this.handleRepaymentFormSubmission.bind(this);
        this.confirmationModalToggle = this.confirmationModalToggle.bind(this);
        this.handleCancelDebtEntityClick = this.handleCancelDebtEntityClick.bind(this);
        this.handleCancelDebtEntitySubmission = this.handleCancelDebtEntitySubmission.bind(this);
    }

    componentDidMount() {
        const { debtEntity } = this.props;

        this.retrieveTokenDecimals();
        if (debtEntity instanceof FilledDebtEntity) {
            // Calculate which payments have been missed, so as to display that in the repayment schedule.
            this.calculatePaymentsMissed();
        }
    }

    toggleDrawer() {
        this.setState({ collapse: !this.state.collapse });
    }

    toggleRepaymentModal() {
        this.setState({ makeRepayment: !this.state.makeRepayment });
    }

    toggleReturnCollateralModal() {
        this.setState({ showReturnCollateralModal: !this.state.showReturnCollateralModal });
    }

    handleMakeRepaymentClick(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        this.toggleRepaymentModal();
    }

    handleReturnCollateralButtonClicked(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        this.toggleReturnCollateralModal();
    }

    async handleReturnCollateral() {
        this.setState({ returningCollateral: true });

        const { dharma, recommendedGasPrice, updateDebtEntity, handleSetErrorToast } = this.props;

        // We assume that the debtEntity is collateralized
        const debtEntity = this.props.debtEntity as FilledCollateralizedDebtEntity;

        const adapter = dharma.adapters.collateralizedSimpleInterestLoan;

        try {
            const transactionHash = await adapter.returnCollateralAsync(debtEntity.issuanceHash, {
                gasPrice: recommendedGasPrice,
            });

            const transactionReceipt = await dharma.blockchain.awaitTransactionMinedAsync(
                transactionHash,
                BLOCKCHAIN_API.POLLING_INTERVAL,
                BLOCKCHAIN_API.TIMEOUT,
            );

            if (!transactionReceipt || !transactionReceipt.status) {
                throw new Error("Unable to return collateral.");
            }

            debtEntity.collateralReturnable = false;
            updateDebtEntity(debtEntity);
        } catch (e) {
            handleSetErrorToast(e.message);
        }

        this.setState({
            returningCollateral: false,
            showReturnCollateralModal: false,
        });
    }

    confirmationModalToggle() {
        this.setState({
            confirmationModal: !this.state.confirmationModal,
        });
    }

    handleCancelDebtEntityClick(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        this.confirmationModalToggle();
    }

    async handleCancelDebtEntitySubmission() {
        try {
            const {
                dharma,
                debtEntity,
                accounts,
                handleCancelDebtEntity,
                handleSetSuccessToast,
                handleSetErrorToast,
            } = this.props;

            handleSetErrorToast("");
            if (!dharma) {
                handleSetErrorToast(web3Errors.UNSUPPORTED_NETWORK);
                return;
            } else if (!accounts.length) {
                handleSetErrorToast(web3Errors.UNABLE_TO_FIND_ACCOUNTS);
                return;
            }
            this.setState({ awaitingCancelTx: true });

            const dharmaDebtOrder = debtEntity.dharmaOrder;
            if (dharmaDebtOrder.debtor !== accounts[0]) {
                this.confirmationModalToggle();
                handleSetErrorToast(
                    "Debt order can only be cancelled by the specified order's debtor",
                );
            } else {
                dharma.order
                    .cancelOrderAsync(dharmaDebtOrder, { from: accounts[0] })
                    .then((txHash) => {
                        return dharma.blockchain.awaitTransactionMinedAsync(
                            txHash,
                            BLOCKCHAIN_API.POLLING_INTERVAL,
                            BLOCKCHAIN_API.TIMEOUT,
                        );
                    })
                    .then((receipt) => {
                        return dharma.logs.getErrorLogs(receipt.transactionHash);
                    })
                    .then(async (errors) => {
                        this.setState({ awaitingCancelTx: false });
                        this.confirmationModalToggle();

                        if (errors.length > 0) {
                            handleSetErrorToast(errors[0]);
                        } else {
                            handleCancelDebtEntity(debtEntity.issuanceHash);

                            handleSetSuccessToast(
                                `Debt agreement ${shortenString(
                                    debtEntity.issuanceHash,
                                )} is cancelled successfully`,
                            );
                        }
                    })
                    .catch((err) => {
                        if (err.message.includes("User denied transaction signature")) {
                            handleSetErrorToast("Wallet has denied transaction.");
                        } else {
                            handleSetErrorToast(err.message);
                        }
                        this.confirmationModalToggle();
                        this.setState({ awaitingCancelTx: false });
                    });
            }
        } catch (e) {
            this.confirmationModalToggle();
            this.props.handleSetErrorToast(e.message);
            this.setState({ awaitingCancelTx: false });
        }
    }

    async handleRepaymentFormSubmission(tokenAmount: BigNumber, tokenSymbol: string) {
        const {
            debtEntity,
            dharma,
            handleSetErrorToast,
            handleSetSuccessToast,
            handleSuccessfulRepayment,
            updateDebtEntity,
        } = this.props;

        handleSetErrorToast("");

        if (!dharma) {
            handleSetErrorToast(web3Errors.UNSUPPORTED_NETWORK);
            return;
        }

        if (!(debtEntity instanceof FilledDebtEntity)) {
            return;
        }

        const tokenAddress = await dharma.contracts.getTokenAddressBySymbolAsync(tokenSymbol);
        const tokenDecimals = this.state.principalTokenDecimals;

        this.setState({ awaitingRepaymentTx: true });

        dharma.servicing
            .makeRepayment(debtEntity.issuanceHash, tokenAmount, tokenAddress)
            .then((txHash) => {
                return dharma.blockchain.awaitTransactionMinedAsync(
                    txHash,
                    BLOCKCHAIN_API.POLLING_INTERVAL,
                    BLOCKCHAIN_API.TIMEOUT,
                );
            })
            .then((receipt) => {
                return dharma.logs.getErrorLogs(receipt.transactionHash);
            })
            .then((errors) => {
                this.setState({ makeRepayment: false, awaitingRepaymentTx: false });

                if (errors.length > 0) {
                    if (debtEntity.principalTokenSymbol !== tokenSymbol) {
                        handleSetErrorToast(
                            `Repayments to debt agreement ${shortenString(
                                this.props.debtEntity.issuanceHash,
                            )} must be made in ${this.props.debtEntity.principalTokenSymbol}`,
                        );
                    } else {
                        handleSetErrorToast(errors[0]);
                    }
                } else {
                    debtEntity.repaidAmount = debtEntity.repaidAmount.plus(tokenAmount);

                    if (
                        debtEntity instanceof FilledCollateralizedDebtEntity &&
                        debtEntity.repaidAmount.eq(debtEntity.totalExpectedRepayment)
                    ) {
                        debtEntity.collateralReturnable = true;
                    }

                    updateDebtEntity(debtEntity);

                    handleSuccessfulRepayment(
                        this.props.debtEntity.issuanceHash,
                        tokenAmount,
                        tokenSymbol,
                    );
                    handleSetSuccessToast(
                        <div>
                            Successfully made repayment of{" "}
                            <TokenAmount
                                tokenAmount={tokenAmount}
                                tokenDecimals={tokenDecimals}
                                tokenSymbol={tokenSymbol}
                            />
                        </div>,
                    );
                }
            })
            .catch((err) => {
                if (err.message.includes("User denied transaction signature")) {
                    this.props.handleSetErrorToast("Wallet has denied transaction.");
                } else {
                    this.props.handleSetErrorToast(err.message);
                }

                this.setState({ makeRepayment: false, awaitingRepaymentTx: false });
            });
    }

    async calculatePaymentsMissed() {
        const { debtEntity, dharma } = this.props;
        if (!dharma || debtEntity instanceof OpenDebtEntity) {
            return;
        }

        const { issuanceHash, repaidAmount, repaymentSchedule } = this.props
            .debtEntity as FilledDebtEntity;

        let missedPayments = {};
        let paymentDate;
        let expectedRepaidAmount;

        for (let i = 0; i < repaymentSchedule.length; i++) {
            paymentDate = repaymentSchedule[i];
            expectedRepaidAmount = await dharma.servicing.getExpectedValueRepaid(
                issuanceHash,
                paymentDate,
            );
            missedPayments[paymentDate] = repaidAmount < expectedRepaidAmount;
        }

        this.setState({ missedPayments });
    }

    async retrieveTokenDecimals() {
        const { debtEntity, dharma } = this.props;
        let collateralTokenDecimals = new BigNumber(0);

        if (debtEntity instanceof FilledCollateralizedDebtEntity) {
            const collateralTokenSymbol = debtEntity.collateralTokenSymbol;
            collateralTokenDecimals = await dharma.token.getNumDecimals(collateralTokenSymbol);
        }

        const principalTokenSymbol = debtEntity.principalTokenSymbol;
        const principalTokenDecimals = await dharma.token.getNumDecimals(principalTokenSymbol);

        this.setState({ collateralTokenDecimals, principalTokenDecimals });
    }

    render() {
        const { currentTime, debtEntity, tokens } = this.props;

        if (!debtEntity || currentTime === undefined) {
            return null;
        }

        const repaymentScheduleItems: JSX.Element[] = [];
        if (debtEntity instanceof FilledDebtEntity) {
            const repaymentSchedule = debtEntity.repaymentSchedule;
            const now = currentTime;

            let maxDisplay = 0;
            let selected = false;
            let selectedPaymentSchedule = 0;
            repaymentSchedule.forEach((paymentSchedule) => {
                if (maxDisplay < 5) {
                    let repaymentState;

                    if (now > paymentSchedule) {
                        if (this.state.missedPayments[paymentSchedule]) {
                            repaymentState = "missed";
                        } else {
                            repaymentState = "past";
                        }
                    } else {
                        repaymentState = "future";
                    }

                    if (maxDisplay === 4 && repaymentSchedule.length > 5) {
                        repaymentScheduleItems.push(
                            <Schedule key={paymentSchedule}>
                                <ScheduleIconContainer>
                                    <ScheduleIcon state={repaymentState} />
                                </ScheduleIconContainer>
                                <Strikethrough />
                                <ShowMore>+ {repaymentSchedule.length - maxDisplay} more</ShowMore>
                            </Schedule>,
                        );
                    } else {
                        if (now <= paymentSchedule && !selected) {
                            selectedPaymentSchedule = paymentSchedule;
                            selected = true;
                        }
                        repaymentScheduleItems.push(
                            <Schedule
                                className={
                                    selectedPaymentSchedule === paymentSchedule ? "active" : ""
                                }
                                key={paymentSchedule}
                            >
                                <ScheduleIconContainer>
                                    <ScheduleIcon state={repaymentState} />
                                </ScheduleIconContainer>
                                <Strikethrough />
                                <PaymentDate>
                                    {debtEntity.amortizationUnit !== "hours"
                                        ? formatDate(paymentSchedule)
                                        : formatTime(paymentSchedule)}
                                </PaymentDate>
                            </Schedule>,
                        );
                    }
                }
                maxDisplay++;
            });
        }

        const identiconImgSrc = getIdenticonImgSrc(debtEntity.issuanceHash, 60, 0.1);
        const detailLink =
            debtEntity instanceof OpenDebtEntity ? (
                <DetailLink to={`/request/success/?issuanceHash=${debtEntity.issuanceHash}`}>
                    {shortenString(debtEntity.issuanceHash)}
                </DetailLink>
            ) : (
                shortenString(debtEntity.issuanceHash)
            );

        const confirmationModalContent = (
            <span>
                Are you sure you want to cancel debt agreement{" "}
                <Bold>{shortenString(debtEntity.issuanceHash)}</Bold>
            </span>
        );
        let terms = "Simple Interest (Non-Collateralized)";
        let collateral = null;
        let gracePeriod = null;

        if (debtEntity instanceof FilledCollateralizedDebtEntity) {
            terms = "Simple Interest (Collateralized)";
            collateral = (
                <Col xs="4" sm="4" md="4" lg="2">
                    <InfoItem>
                        <InfoItemTitle>Collateral</InfoItemTitle>
                        <InfoItemContent>
                            <TokenAmount
                                tokenAmount={debtEntity.collateralAmount!}
                                tokenDecimals={this.state.collateralTokenDecimals}
                                tokenSymbol={debtEntity.collateralTokenSymbol!}
                            />
                        </InfoItemContent>
                    </InfoItem>
                </Col>
            );
            gracePeriod = (
                <Col xs="8" sm="8" md="8" lg="2">
                    <InfoItem>
                        <InfoItemTitle>Grace period</InfoItemTitle>
                        <InfoItemContent>{debtEntity.gracePeriodInDays + " days"}</InfoItemContent>
                    </InfoItem>
                </Col>
            );
        }

        let actionButton = null;
        if (debtEntity instanceof FilledDebtEntity) {
            if (
                debtEntity instanceof FilledCollateralizedDebtEntity &&
                debtEntity.collateralReturnable
            ) {
                actionButton = (
                    <ActionButton onClick={this.handleReturnCollateralButtonClicked}>
                        Return Collateral
                    </ActionButton>
                );
            } else {
                actionButton = (
                    <ActionButton onClick={this.handleMakeRepaymentClick}>
                        Make Repayment
                    </ActionButton>
                );
            }
        }

        let returnCollateralModalContent = <div />;
        if (
            debtEntity instanceof FilledCollateralizedDebtEntity &&
            debtEntity.collateralReturnable
        ) {
            returnCollateralModalContent = (
                <span>
                    Debt agreement <Bold>{shortenString(debtEntity.issuanceHash)}</Bold> has been
                    fully paid and its collateral is returnable to you. Would you like to return the
                    collateral of{" "}
                    <TokenAmount
                        tokenAmount={debtEntity.collateralAmount}
                        tokenDecimals={this.state.collateralTokenDecimals}
                        tokenSymbol={debtEntity.collateralTokenSymbol}
                    />?
                </span>
            );
        }

        return (
            <Wrapper onClick={this.toggleDrawer}>
                <Row>
                    <ImageContainer>
                        {identiconImgSrc && <IdenticonImage src={identiconImgSrc} />}
                    </ImageContainer>
                    <DetailContainer>
                        <Row>
                            <Col xs="6" md="6">
                                <Amount>
                                    <TokenAmount
                                        tokenAmount={debtEntity.principalAmount}
                                        tokenDecimals={this.state.principalTokenDecimals}
                                        tokenSymbol={debtEntity.principalTokenSymbol}
                                    />
                                </Amount>
                                <Url>{detailLink}</Url>
                            </Col>
                            <Col xs="6" md="6">
                                {actionButton}
                            </Col>
                        </Row>
                        {debtEntity instanceof FilledDebtEntity ? (
                            <StatusActive>Active</StatusActive>
                        ) : (
                            <StatusPending>Pending</StatusPending>
                        )}
                        <Terms>{terms}</Terms>
                    </DetailContainer>
                    {debtEntity instanceof OpenDebtEntity ? (
                        <PendingActionContainer>
                            <CancelButton onClick={this.handleCancelDebtEntityClick}>
                                Cancel
                            </CancelButton>
                            <ShareButton
                                to={`/request/success/?issuanceHash=${debtEntity.issuanceHash}`}
                            >
                                Share
                            </ShareButton>
                        </PendingActionContainer>
                    ) : (
                        <RepaymentScheduleContainer
                            className={debtEntity instanceof FilledDebtEntity ? "active" : ""}
                        >
                            <Title>Repayment Schedule</Title>
                            {repaymentScheduleItems}
                        </RepaymentScheduleContainer>
                    )}
                </Row>
                <Collapse isOpen={this.state.collapse}>
                    <Drawer>
                        <Row>
                            <Col xs="4" sm="4" md="4" lg="2">
                                <InfoItem>
                                    <InfoItemTitle>Requested</InfoItemTitle>
                                    <InfoItemContent>
                                        <TokenAmount
                                            tokenAmount={debtEntity.principalAmount}
                                            tokenDecimals={this.state.principalTokenDecimals}
                                            tokenSymbol={debtEntity.principalTokenSymbol}
                                        />
                                    </InfoItemContent>
                                </InfoItem>
                            </Col>
                            <Col xs="4" sm="4" md="4" lg="2">
                                <InfoItem>
                                    <InfoItemTitle>Repaid</InfoItemTitle>
                                    <InfoItemContent>
                                        <TokenAmount
                                            tokenAmount={
                                                debtEntity instanceof FilledDebtEntity
                                                    ? debtEntity.repaidAmount
                                                    : new BigNumber(0)
                                            }
                                            tokenDecimals={this.state.principalTokenDecimals}
                                            tokenSymbol={debtEntity.principalTokenSymbol}
                                        />
                                    </InfoItemContent>
                                </InfoItem>
                            </Col>
                            <Col xs="4" sm="4" md="4" lg="2">
                                <InfoItem>
                                    <InfoItemTitle>Term Length</InfoItemTitle>
                                    <InfoItemContent>
                                        {debtEntity.termLength.toNumber() +
                                            " " +
                                            debtEntity.amortizationUnit}
                                    </InfoItemContent>
                                </InfoItem>
                            </Col>
                            <Col xs="4" sm="4" md="4" lg="2">
                                <InfoItem>
                                    <InfoItemTitle>Interest Rate</InfoItemTitle>
                                    <InfoItemContent>
                                        {debtEntity.interestRate.toNumber() + "%"}
                                    </InfoItemContent>
                                </InfoItem>
                            </Col>
                            <Col xs="8" sm="8" md="8" lg="2">
                                <InfoItem>
                                    <InfoItemTitle>Installment Frequency</InfoItemTitle>
                                    <InfoItemContent>
                                        {amortizationUnitToFrequency(debtEntity.amortizationUnit)}
                                    </InfoItemContent>
                                </InfoItem>
                            </Col>
                            {collateral}
                            {gracePeriod}
                            <Col xs="12" sm="12" md="12" lg="2">
                                <InfoItem>
                                    <InfoItemTitle>Description</InfoItemTitle>
                                    <InfoItemContent>
                                        {debtEntity.description ? debtEntity.description : "-"}
                                    </InfoItemContent>
                                </InfoItem>
                            </Col>
                        </Row>
                    </Drawer>
                </Collapse>
                {debtEntity instanceof FilledDebtEntity ? (
                    <MakeRepaymentModal
                        tokens={tokens}
                        modal={this.state.makeRepayment}
                        issuanceHash={debtEntity.issuanceHash}
                        principalTokenDecimals={this.state.principalTokenDecimals}
                        principalTokenSymbol={debtEntity.principalTokenSymbol}
                        totalExpectedRepaymentValue={debtEntity.totalExpectedRepayment}
                        amountAlreadyRepaid={debtEntity.repaidAmount}
                        title="Make Repayment"
                        closeButtonText="Nevermind"
                        submitButtonText={
                            this.state.awaitingRepaymentTx
                                ? "Making Repayment..."
                                : "Make Repayment"
                        }
                        awaitingTx={this.state.awaitingRepaymentTx}
                        onToggle={this.toggleRepaymentModal}
                        onSubmit={this.handleRepaymentFormSubmission}
                    />
                ) : null}
                <ConfirmationModal
                    modal={this.state.confirmationModal}
                    title="Please confirm"
                    content={confirmationModalContent}
                    onToggle={this.confirmationModalToggle}
                    onSubmit={this.handleCancelDebtEntitySubmission}
                    closeButtonText="No"
                    awaitingTx={this.state.awaitingCancelTx}
                    submitButtonText={this.state.awaitingCancelTx ? "Canceling Order..." : "Yes"}
                    displayMetamaskDependencies={true}
                />
                <ConfirmationModal
                    awaitingTx={this.state.returningCollateral}
                    closeButtonText="No"
                    content={returnCollateralModalContent}
                    modal={this.state.showReturnCollateralModal}
                    onSubmit={this.handleReturnCollateral}
                    onToggle={this.toggleReturnCollateralModal}
                    submitButtonText={
                        this.state.returningCollateral ? "Returning Collateral..." : "Yes"
                    }
                    title={"Return Collateral"}
                />
            </Wrapper>
        );
    }
}

export { ActiveDebtOrder };
