import * as React from "react";
import { Dharma } from "@dharmaprotocol/dharma.js";
import { Row, Col, Label } from "reactstrap";
import { BigNumber } from "bignumber.js";
import { OpenCollateralizedDebtEntity } from "../../../../models";
import { amortizationUnitToFrequency } from "../../../../utils";
import {
    Wrapper,
    StyledLabel,
    GrayContainer,
    InfoItem,
    Title,
    Content,
    SummaryJsonContainer,
    TextareaContainer,
    StyledTextarea,
    CopyButton,
    CopiedMessage,
} from "./styledComponents";
import { TokenAmount } from "src/components";

interface Props {
    debtEntity: OpenCollateralizedDebtEntity;
    dharma: Dharma;
    urlParams: any;
}

interface State {
    collateralTokenDecimals?: BigNumber;
    copied: boolean;
    principalTokenDecimals?: BigNumber;
}

class RequestLoanSummary extends React.Component<Props, State> {
    private summaryTextarea: HTMLTextAreaElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            copied: false,
        };
        this.handleCopyClipboard = this.handleCopyClipboard.bind(this);
        this.setTokenDecimals = this.setTokenDecimals.bind(this);
    }

    async componentDidMount() {
        await this.setTokenDecimals();
    }

    async componentDidUpdate(prevProps: Props) {
        if (this.props.dharma !== prevProps.dharma) {
            await this.setTokenDecimals();
        }
    }

    async setTokenDecimals() {
        const { debtEntity, dharma } = this.props;

        if (!dharma) {
            return;
        }

        const collateralTokenSymbol = debtEntity.collateralTokenSymbol;
        const principalTokenSymbol = debtEntity.principalTokenSymbol;

        const collateralTokenDecimals = await dharma.token.getNumDecimals(collateralTokenSymbol);
        const principalTokenDecimals = await dharma.token.getNumDecimals(principalTokenSymbol);

        this.setState({
            collateralTokenDecimals,
            principalTokenDecimals,
        });
    }

    handleCopyClipboard() {
        this.summaryTextarea!.select();
        document.execCommand("copy");
        this.summaryTextarea!.focus();
        this.setState({ copied: true });
    }

    render() {
        const { dharma, debtEntity, urlParams } = this.props;
        const { collateralTokenDecimals, principalTokenDecimals } = this.state;

        if (!dharma || !collateralTokenDecimals || !principalTokenDecimals) {
            return null;
        }

        const termLength = `${debtEntity.termLength.toNumber()} ${debtEntity.amortizationUnit}`;
        const interestRate = `${debtEntity.interestRate.toNumber()}%`;
        const installmentFrequency = amortizationUnitToFrequency(debtEntity.amortizationUnit);

        const collateral = (
            <InfoItem>
                <Title>Collateral</Title>
                <Content>
                    <TokenAmount
                        tokenAmount={debtEntity.collateralAmount}
                        tokenDecimals={collateralTokenDecimals}
                        tokenSymbol={debtEntity.collateralTokenSymbol}
                    />
                </Content>
            </InfoItem>
        );
        const gracePeriod = (
            <InfoItem>
                <Title>Grace Period</Title>
                <Content>
                    {debtEntity.gracePeriodInDays.toNumber()} {"days"}
                </Content>
            </InfoItem>
        );

        return (
            <Wrapper>
                <StyledLabel>Loan request summary</StyledLabel>
                <GrayContainer>
                    <Row>
                        <Col xs="6" md="6">
                            <InfoItem>
                                <Title>Principal</Title>
                                <Content>
                                    <TokenAmount
                                        tokenAmount={debtEntity.principalAmount}
                                        tokenDecimals={principalTokenDecimals}
                                        tokenSymbol={debtEntity.principalTokenSymbol}
                                    />
                                </Content>
                            </InfoItem>
                            <InfoItem>
                                <Title>Term Length</Title>
                                <Content>{termLength}</Content>
                            </InfoItem>
                            {collateral}
                        </Col>
                        <Col xs="6" md="6">
                            <InfoItem>
                                <Title>Interest Rate</Title>
                                <Content>{interestRate}</Content>
                            </InfoItem>
                            <InfoItem>
                                <Title>Installment Frequency</Title>
                                <Content>{installmentFrequency}</Content>
                            </InfoItem>
                            {gracePeriod}
                        </Col>
                        <Col xs="12">
                            <InfoItem>
                                <Title>Description</Title>
                                <Content>{debtEntity.description}</Content>
                            </InfoItem>
                        </Col>
                    </Row>
                    <SummaryJsonContainer>
                        <Label>JSON</Label>
                        <TextareaContainer>
                            <StyledTextarea
                                value={JSON.stringify(urlParams)}
                                readOnly={true}
                                innerRef={(textarea: HTMLTextAreaElement) => {
                                    this.summaryTextarea = textarea;
                                }}
                            />
                            <CopyButton onClick={this.handleCopyClipboard}>Copy</CopyButton>
                        </TextareaContainer>
                        <CopiedMessage>{this.state.copied ? "Copied!" : ""}</CopiedMessage>
                    </SummaryJsonContainer>
                </GrayContainer>
            </Wrapper>
        );
    }
}

export { RequestLoanSummary };
