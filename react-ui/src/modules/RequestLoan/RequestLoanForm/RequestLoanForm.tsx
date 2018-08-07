// External libraries
import * as React from "react";
import * as Web3 from "web3";
import * as _ from "lodash";
import { Dharma } from "@dharmaprotocol/dharma.js";
import { BigNumber } from "bignumber.js";
import { browserHistory } from "react-router";

// Schema
import { schema, uiSchema } from "./schema";

// Layouts
import { PaperLayout } from "../../../layouts";

// Models
import { Types } from "@dharmaprotocol/dharma.js";
import {
    OpenCollateralizedDebtEntity,
    DebtEntity,
    CollateralizedDebtParameters,
    TokenEntity,
} from "../../../models";

// Components
import {
    Header,
    JSONSchemaForm,
    MainWrapper,
    ConfirmOpenLoanModal,
    ConfirmOpenLoanModalType,
} from "../../../components";
import { RequestLoanDescription } from "./RequestLoanDescription";

// Utils
import { Analytics, generateDebtQueryParams } from "../../../utils";

// Validators
import { validateTermLength, validateInterestRate, validateCollateral } from "./validator";

// Common
import { web3Errors } from "../../../common/web3Errors";
import { JSONSchema4 } from "json-schema";
import { Loading } from "../../Loading";

interface Props {
    web3: Web3;
    networkId: number;
    accounts: string[];
    dharma: Dharma;
    tokens: TokenEntity[];
    createDebtEntity: (debtEntity: DebtEntity, networkId: number) => void;
    handleSetError: (errorMessage: string) => void;
    setPendingDebtEntity: (issuanceHash: string) => void;
    shortenUrl: (url: string, path?: string, queryParams?: object) => Promise<string>;
}

interface RequiredState {
    awaitingSignTx: boolean;
    confirmationModal: boolean;
    description: string;
    formBegun: boolean;
    formData: any;
    gracePeriodInDays: BigNumber;
    issuanceHash: string;
}

// State comprises of both required and optional state parameters.
interface State extends RequiredState {
    amortizationUnit?: string;
    collateralTokenAmount?: Types.TokenAmount;
    debtOrderInstance?: Types.DebtOrder;
    interestRate?: BigNumber;
    principalTokenAmount?: Types.TokenAmount;
    termLength?: BigNumber;
}

class RequestLoanForm extends React.Component<Props, State> {
    private defaultState: RequiredState = {
        awaitingSignTx: false,
        confirmationModal: false,
        description: "",
        formBegun: false,
        formData: {},
        gracePeriodInDays: new BigNumber(0),
        issuanceHash: "",
    };

    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignDebtOrder = this.handleSignDebtOrder.bind(this);
        this.confirmationModalToggle = this.confirmationModalToggle.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.transformErrors = this.transformErrors.bind(this);

        this.state = this.defaultState;
    }

    componentDidMount() {
        Analytics.track(Analytics.RequestLoanAction.ViewForm, {
            category: Analytics.Category.RequestLoan,
            nonInteraction: 1,
        });
    }

    handleChange(formData: any) {
        if (!this.state.formBegun) {
            Analytics.track(Analytics.RequestLoanAction.BeginForm, {
                category: Analytics.Category.RequestLoan,
            });
        }

        this.setState({
            formBegun: true,
            formData: formData,
        });

        if (formData.loan) {
            if (_.isNumber(formData.loan.principalAmount) && formData.loan.principalTokenSymbol) {
                this.setState({
                    principalTokenAmount: new Types.TokenAmount({
                        amount: new BigNumber(formData.loan.principalAmount),
                        symbol: formData.loan.principalTokenSymbol,
                        type: Types.TokenAmountType.Decimal,
                    }),
                });
            }

            if (formData.loan.description) {
                this.setState({ description: formData.loan.description });
            }
        }

        if (formData.terms) {
            if (_.isNumber(formData.terms.interestRate)) {
                this.setState({ interestRate: new BigNumber(formData.terms.interestRate) });
            }

            if (formData.terms.amortizationUnit) {
                this.setState({ amortizationUnit: formData.terms.amortizationUnit });
            }

            if (_.isNumber(formData.terms.termLength)) {
                this.setState({ termLength: new BigNumber(formData.terms.termLength) });
            }
        }

        if (formData.collateral) {
            if (
                _.isNumber(formData.collateral.collateralAmount) &&
                formData.collateral.collateralTokenSymbol
            ) {
                this.setState({
                    collateralTokenAmount: new Types.TokenAmount({
                        amount: new BigNumber(formData.collateral.collateralAmount),
                        symbol: formData.collateral.collateralTokenSymbol,
                        type: Types.TokenAmountType.Decimal,
                    }),
                });
            }

            this.setGracePeriod(formData);
        }
    }

    setGracePeriod(formData: any) {
        const formPeriod = formData.collateral.gracePeriodInDays;
        const defaultPeriod = this.defaultState.gracePeriodInDays!;

        this.setState({
            gracePeriodInDays: formPeriod ? new BigNumber(formPeriod) : defaultPeriod,
        });
    }

    async handleSubmit() {
        const { dharma, accounts, handleSetError } = this.props;
        const {
            amortizationUnit,
            collateralTokenAmount,
            gracePeriodInDays,
            interestRate,
            principalTokenAmount,
            termLength,
        } = this.state;

        try {
            Analytics.track(Analytics.RequestLoanAction.SubmitForm, {
                category: Analytics.Category.RequestLoan,
            });

            handleSetError("");

            if (!this.props.dharma) {
                handleSetError(web3Errors.UNSUPPORTED_NETWORK);
                return;
            }

            if (!accounts.length) {
                handleSetError(web3Errors.UNABLE_TO_FIND_ACCOUNTS);
                return;
            }

            const debtRequest: CollateralizedDebtParameters = {
                amortizationUnit: amortizationUnit!,
                collateralAmount: collateralTokenAmount!.rawAmount,
                collateralTokenSymbol: collateralTokenAmount!.tokenSymbol,
                gracePeriodInDays: gracePeriodInDays,
                interestRate: interestRate!,
                principalAmount: principalTokenAmount!.rawAmount,
                principalTokenSymbol: principalTokenAmount!.tokenSymbol,
                termLength: termLength!,
            };

            const debtOrderInstance = await dharma.adapters.collateralizedSimpleInterestLoan.toDebtOrder(
                debtRequest,
            );

            debtOrderInstance.debtor = accounts[0];

            const issuanceHash = await dharma.order.getIssuanceHash(debtOrderInstance);

            this.setState({
                debtOrderInstance,
                issuanceHash,
            });

            this.confirmationModalToggle();
        } catch (e) {
            this.props.handleSetError(e.message);
            return;
        }
    }

    async handleSignDebtOrder() {
        const { debtOrderInstance, description, issuanceHash, principalTokenAmount } = this.state;
        const {
            handleSetError,
            createDebtEntity,
            shortenUrl,
            setPendingDebtEntity,
            networkId,
        } = this.props;

        try {
            Analytics.track(Analytics.RequestLoanAction.ConfirmRequest, {
                category: Analytics.Category.RequestLoan,
            });

            handleSetError("");

            if (!debtOrderInstance) {
                handleSetError("No Debt Order has been generated yet");
                return;
            }

            if (!this.props.dharma) {
                handleSetError(web3Errors.UNSUPPORTED_NETWORK);
                return;
            }

            if (!this.props.accounts.length) {
                handleSetError(web3Errors.UNABLE_TO_FIND_ACCOUNTS);
                return;
            }

            this.setState({ awaitingSignTx: true });

            // Sign as debtor
            debtOrderInstance.debtorSignature = await this.props.dharma.sign.asDebtor(
                debtOrderInstance,
                true,
            );

            this.setState({
                debtOrderInstance,
                awaitingSignTx: false,
                confirmationModal: false,
            });

            const collateralizedLoanOrder = await this.props.dharma.adapters.collateralizedSimpleInterestLoan.fromDebtOrder(
                debtOrderInstance,
            );

            const {
                amortizationUnit,
                collateralAmount,
                collateralTokenSymbol,
                gracePeriodInDays,
                interestRate,
                termLength,
            } = collateralizedLoanOrder;

            let debtEntity: OpenCollateralizedDebtEntity = new OpenCollateralizedDebtEntity({
                amortizationUnit,
                collateralAmount,
                collateralTokenSymbol,
                debtor: debtOrderInstance.debtor!,
                dharmaOrder: debtOrderInstance,
                description,
                gracePeriodInDays,
                interestRate,
                issuanceHash,
                principalAmount: debtOrderInstance.principalAmount!,
                principalTokenSymbol: principalTokenAmount!.tokenSymbol,
                termLength,
            });

            const debtQueryParams = generateDebtQueryParams(debtEntity);

            let fillLoanShortUrl: string = "";

            let hostname = window.location.hostname;

            fillLoanShortUrl = await shortenUrl(hostname, "/fill/loan", debtQueryParams);

            debtEntity.fillLoanShortUrl = fillLoanShortUrl;

            createDebtEntity(debtEntity, networkId);
            setPendingDebtEntity(debtEntity.issuanceHash);

            browserHistory.push(`/request/success/?issuanceHash=${debtEntity.issuanceHash}`);
        } catch (e) {
            if (e.message.includes("User denied message signature")) {
                handleSetError("Wallet has denied message signature.");
            } else {
                handleSetError(e.message);
            }

            this.setState({
                awaitingSignTx: false,
                confirmationModal: false,
            });
            return;
        }
    }

    confirmationModalToggle() {
        this.setState({
            confirmationModal: !this.state.confirmationModal,
        });
    }

    validateForm(formData: any, errors: any) {
        if (formData.terms.termLength) {
            const error = validateTermLength(formData.terms.termLength);
            if (error) {
                errors.terms.termLength.addError(error);
            }
        }

        if (formData.terms.interestRate) {
            const error = validateInterestRate(formData.terms.interestRate);
            if (error) {
                errors.terms.interestRate.addError(error);
            }
        }

        if (formData.collateral) {
            const response = validateCollateral(this.props.tokens, formData.collateral);
            if (response.error) {
                errors.collateral[response.fieldName].addError(response.error);
            }
        }

        return errors;
    }

    transformErrors(errors: any[]) {
        return errors.map((error) => {
            if (error.name === "oneOf") {
                error.message = "Please fix the errors above";
            }
            return error;
        });
    }

    schemaWithTokens(): JSONSchema4 {
        let { tokens } = this.props;

        // HACK: Temporarily disallow requesting loans with EOS.
        tokens = _.filter(tokens, (token) => token.symbol !== "EOS");

        const tempSchema = _.clone(schema);

        if (tempSchema.definitions && tempSchema.definitions.tokens) {
            tempSchema.definitions.tokens.enum = _.map(tokens, "symbol");
            tempSchema.definitions.tokens.enumNames = _.map(tokens, "name");
        }

        return tempSchema;
    }

    render() {
        const { accounts, dharma, tokens, web3 } = this.props;

        const {
            amortizationUnit,
            awaitingSignTx,
            collateralTokenAmount,
            confirmationModal,
            interestRate,
            principalTokenAmount,
            termLength,
        } = this.state;

        if (!web3 || !dharma || accounts.length === 0 || tokens.length === 0) {
            return <Loading />;
        }

        let confirmOpenLoanModal = null;

        if (
            amortizationUnit &&
            collateralTokenAmount &&
            interestRate &&
            principalTokenAmount &&
            termLength
        ) {
            confirmOpenLoanModal = (
                <ConfirmOpenLoanModal
                    amortizationUnit={amortizationUnit}
                    awaitingTransaction={awaitingSignTx}
                    collateralTokenAmount={collateralTokenAmount}
                    interestRate={interestRate}
                    modalOpen={confirmationModal}
                    modalType={ConfirmOpenLoanModalType.Debtor}
                    onConfirm={this.handleSignDebtOrder}
                    onToggle={this.confirmationModalToggle}
                    principalTokenAmount={principalTokenAmount}
                    termLength={termLength}
                />
            );
        }

        return (
            <PaperLayout>
                <MainWrapper>
                    <Header title={"Request a Loan"} description={<RequestLoanDescription />} />
                    <JSONSchemaForm
                        schema={this.schemaWithTokens()}
                        uiSchema={uiSchema}
                        formData={this.state.formData}
                        buttonText="Generate Debt Order"
                        onHandleChange={this.handleChange}
                        onHandleSubmit={this.handleSubmit}
                        validate={this.validateForm}
                        transformErrors={this.transformErrors}
                    />
                </MainWrapper>
                {confirmOpenLoanModal}
            </PaperLayout>
        );
    }
}

export { RequestLoanForm };
