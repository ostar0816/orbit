import * as React from "react";

import { connect } from "react-redux";

import { BigNumber } from "bignumber.js";

import * as moment from "moment";

import { Row, Col, Collapse, Label } from "reactstrap";

import { DebtEntity, OpenCollateralizedDebtEntity } from "../../models";
import { Dharma } from "@dharmaprotocol/dharma.js";

import { amortizationUnitToFrequency, generateDebtQueryParams } from "../../utils";

import { TokenAmount } from "src/components";

import { Wrapper, Heading, Content, Drawer } from "./styledComponents";

import {
    SummaryJsonContainer,
    TextareaContainer,
    StyledTextarea,
    CopyButton,
    CopiedMessage,
} from "../RequestLoan/RequestLoanSuccess/RequestLoanSummary/styledComponents";

interface Props {
    dharma: Dharma;
    debt: DebtEntity;
}

interface State {
    collateralTokenDecimals: BigNumber;
    principalTokenDecimals: BigNumber;
    collapse: boolean;
    copied: boolean;
}

class DebtOrder extends React.Component<Props, State> {
    state = {
        collateralTokenDecimals: new BigNumber(0),
        principalTokenDecimals: new BigNumber(0),
        collapse: false,
        copied: false,
    };

    private summaryTextarea: HTMLTextAreaElement;

    componentDidMount() {
        if (this.props.dharma) {
            this.retrieveTokenDecimals();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.dharma !== prevProps.dharma) {
            this.retrieveTokenDecimals();
        }
    }

    toggleDrawer = () => this.setState((state) => ({ collapse: !state.collapse }));

    handleCopyClipboard = () => {
        this.summaryTextarea!.select();
        document.execCommand("copy");
        this.summaryTextarea!.focus();
        this.setState({ copied: true });
    }

    generateDebtJSON(debt: DebtEntity) {
        return JSON.stringify(generateDebtQueryParams(debt as OpenCollateralizedDebtEntity));
    }

    async retrieveTokenDecimals() {
        const { debt, dharma } = this.props;

        const collateralTokenSymbol = debt.collateralTokenSymbol;
        const collateralTokenDecimals = await dharma.token.getNumDecimals(collateralTokenSymbol);

        const principalTokenSymbol = debt.principalTokenSymbol;
        const principalTokenDecimals = await dharma.token.getNumDecimals(principalTokenSymbol);

        this.setState({ collateralTokenDecimals, principalTokenDecimals });
    }

    render() {
        const { debt } = this.props;

        if (!debt) {
            return null;
        }

        const debtEntity = debt;

        return (
            <Wrapper>
                <Row onClick={this.toggleDrawer}>
                    <Col className="d-flex flex-md-column flex-sm-row" xs="12">
                        <Row className="d-flex">
                            <Heading xs="12" sm="12" md="2">
                                Created
                            </Heading>
                            <Heading xs="12" sm="12" md="1">
                                Principal
                            </Heading>
                            <Heading xs="12" sm="12" md="1">
                                Term
                            </Heading>
                            <Heading xs="12" sm="12" md="2">
                                Total repayment
                            </Heading>
                            <Heading xs="12" sm="12" md="2">
                                Interest rate
                            </Heading>
                            <Heading xs="12" sm="12" md="2">
                                Collateral
                            </Heading>
                            <Heading xs="12" sm="12" md="2">
                                Repayment frequency
                            </Heading>
                        </Row>

                        <Row className="d-flex">
                            <Content xs="12" sm="12" md="2">
                                {moment(debtEntity.createdAt).format("YYYY-MM-DD HH:mm")}
                            </Content>
                            <Content xs="12" sm="12" md="1">
                                <TokenAmount
                                    tokenAmount={debtEntity.principalAmount}
                                    tokenDecimals={this.state.principalTokenDecimals}
                                    tokenSymbol={debtEntity.principalTokenSymbol}
                                />
                            </Content>
                            <Content xs="12" sm="12" md="1">
                                {debtEntity.termLength.toNumber()} {debtEntity.amortizationUnit}
                            </Content>
                            <Content xs="12" sm="12" md="2">
                                <TokenAmount
                                    tokenAmount={debtEntity.totalRepayment}
                                    tokenDecimals={this.state.principalTokenDecimals}
                                    tokenSymbol={debtEntity.principalTokenSymbol}
                                />
                            </Content>
                            <Content xs="12" sm="12" md="2">
                                {debtEntity.interestRate.toNumber()}%
                            </Content>
                            <Content xs="12" sm="12" md="2">
                                <TokenAmount
                                    tokenAmount={debtEntity.collateralAmount}
                                    tokenDecimals={this.state.collateralTokenDecimals}
                                    tokenSymbol={debtEntity.collateralTokenSymbol}
                                />
                            </Content>
                            <Content xs="12" sm="12" md="2">
                                {amortizationUnitToFrequency(debtEntity.amortizationUnit)}
                            </Content>
                        </Row>
                    </Col>
                </Row>

                <Collapse isOpen={this.state.collapse}>
                    <Drawer>
                        <Row className="d-flex">
                            <Content xs="12" sm="12" md="6">
                                <Row>
                                    <Col xs="6" sm="6" md="6">
                                        <Label>Description</Label>
                                    </Col>
                                    <Col xs="6" sm="6" md="6">
                                        {debtEntity.description}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="6" sm="6" md="6">
                                        <Label>Grace Period</Label>
                                    </Col>
                                    <Col xs="6" sm="6" md="6">
                                        {`${debtEntity.gracePeriodInDays.toNumber()} days`}
                                    </Col>
                                </Row>
                            </Content>
                            <Content xs="12" sm="12" md="6">
                                <SummaryJsonContainer>
                                    <Label>JSON</Label>
                                    <TextareaContainer>
                                        <StyledTextarea
                                            value={this.generateDebtJSON(debtEntity)}
                                            readOnly={true}
                                            innerRef={(textarea: HTMLTextAreaElement) => {
                                                this.summaryTextarea = textarea;
                                            }}
                                        />
                                        <CopyButton onClick={this.handleCopyClipboard}>
                                            Copy
                                        </CopyButton>
                                    </TextareaContainer>
                                    <CopiedMessage>
                                        {this.state.copied ? "Copied!" : ""}
                                    </CopiedMessage>
                                </SummaryJsonContainer>
                            </Content>
                        </Row>
                    </Drawer>
                </Collapse>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dharma: state.dharmaReducer.dharma,
});

export default connect(mapStateToProps)(DebtOrder);
