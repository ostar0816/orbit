import * as React from "react";
import { FilledCollateralizedDebtEntity, FilledDebtEntity } from "../../../../models";
import { shortenString, amortizationUnitToFrequency } from "../../../../utils";
import { Row, Col, Collapse } from "reactstrap";
import { StyledRow, Drawer, InfoItem, InfoItemTitle, InfoItemContent } from "./styledComponents";
import { TokenAmount } from "src/components";
import { Dharma } from "@dharmaprotocol/dharma.js";
import { BigNumber } from "bignumber.js";

interface Props {
    dharma: Dharma;
    debtEntity: FilledDebtEntity;
}

interface State {
    collapse: boolean;
    decimals: BigNumber;
    status: string;
}

class DebtOrderRow extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            collapse: false,
            decimals: new BigNumber(0),
            status: "",
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    async componentDidMount() {
        await this.determineStatus(this.props.dharma);
    }

    async componentDidUpdate(prevProps: Props) {
        if (this.props.dharma !== prevProps.dharma) {
            await this.determineStatus(this.props.dharma);
        }
    }

    async determineStatus(dharma: Dharma) {
        const debtEntity: FilledDebtEntity = this.props.debtEntity;
        if (!dharma || !debtEntity) {
            return;
        }

        const decimals = await dharma.token.getNumDecimals(
            this.props.debtEntity.principalTokenSymbol,
        );
        const valueRepaid = await dharma.servicing.getValueRepaid(debtEntity.issuanceHash);
        const totalExpectedRepayment = await dharma.servicing.getTotalExpectedRepayment(
            debtEntity.issuanceHash,
        );

        let status = new BigNumber(valueRepaid).lt(new BigNumber(totalExpectedRepayment))
            ? "Delinquent"
            : "Paid";

        if (
            debtEntity instanceof FilledCollateralizedDebtEntity &&
            debtEntity.collateralWithdrawn
        ) {
            status = "Collateral Seized";
        }

        this.setState({
            decimals,
            status,
        });
    }

    toggleDrawer() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        const { debtEntity } = this.props;
        const { decimals } = this.state;

        if (!debtEntity) {
            return null;
        }

        return (
            <div onClick={this.toggleDrawer}>
                <StyledRow>
                    <Col xs="3" md="2">
                        <TokenAmount
                            tokenAmount={debtEntity.principalAmount}
                            tokenDecimals={decimals}
                            tokenSymbol={debtEntity.principalTokenSymbol}
                        />
                    </Col>
                    <Col xs="3" md="2">
                        {shortenString(debtEntity.issuanceHash)}
                    </Col>
                    <Col xs="3" md="4">
                        {this.state.status}
                    </Col>
                    <Col xs="3" md="4">
                        Simple Interest Loan (Non-Collateralized)
                    </Col>
                </StyledRow>
                <Collapse isOpen={this.state.collapse}>
                    <Drawer>
                        <Row>
                            <Col xs="6" md="2">
                                <InfoItem>
                                    <InfoItemTitle>Term Length</InfoItemTitle>
                                    <InfoItemContent>
                                        {debtEntity.termLength.toNumber() +
                                            " " +
                                            debtEntity.amortizationUnit}
                                    </InfoItemContent>
                                </InfoItem>
                            </Col>
                            <Col xs="6" md="2">
                                <InfoItem>
                                    <InfoItemTitle>Interest Rate</InfoItemTitle>
                                    <InfoItemContent>
                                        {debtEntity.interestRate.toNumber() + "%"}
                                    </InfoItemContent>
                                </InfoItem>
                            </Col>
                            <Col xs="6" md="3">
                                <InfoItem>
                                    <InfoItemTitle>Installment Frequency</InfoItemTitle>
                                    <InfoItemContent>
                                        {amortizationUnitToFrequency(debtEntity.amortizationUnit)}
                                    </InfoItemContent>
                                </InfoItem>
                            </Col>
                            <Col xs="6" md="5">
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
            </div>
        );
    }
}

export { DebtOrderRow };
