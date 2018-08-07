import * as React from "react";
import { Dharma } from "@dharmaprotocol/dharma.js";
import { DebtEntity, FilledDebtEntity, TokenEntity } from "../../../../models";
import { BigNumber } from "bignumber.js";
import { Wrapper, HalfCol, Value, TokenWrapper, Label } from "./styledComponents";
import { TokenAmount } from "src/components";

interface Props {
    debtEntities: DebtEntity[];
    dharma: Dharma;
    tokens: TokenEntity[];
}

interface State {
    tokenBalances: {
        [key: string]: {
            totalOwed: BigNumber;
            totalRepaid: BigNumber;
        };
    };
}

class DebtsMetrics extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            tokenBalances: {},
        };
    }

    async componentDidMount() {
        await this.initiateTokenBalance(this.props.tokens);
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.tokens !== prevProps.tokens) {
            this.initiateTokenBalance(this.props.tokens);
        }
    }

    async initiateTokenBalance(tokens: TokenEntity[]) {
        if (!tokens || !tokens.length) {
            return;
        }
        const { debtEntities } = this.props;
        let tokenBalances: any = {};
        for (let token of tokens) {
            tokenBalances[token.symbol] = {
                totalOwed: new BigNumber(0),
                totalRepaid: new BigNumber(0),
            };
        }
        for (let debtEntity of debtEntities) {
            const tokenSymbol = debtEntity.principalTokenSymbol;

            // TODO: Should we exclude pending debt orders?
            tokenBalances[tokenSymbol].totalOwed = tokenBalances[tokenSymbol].totalOwed.plus(
                await this.props.dharma.servicing.getTotalExpectedRepayment(
                    debtEntity.issuanceHash,
                ),
            );

            if (debtEntity instanceof FilledDebtEntity) {
                tokenBalances[tokenSymbol].totalRepaid = tokenBalances[
                    tokenSymbol
                ].totalRepaid.plus(debtEntity.repaidAmount);
            }
        }
        this.setState({ tokenBalances });
    }

    render() {
        const { tokens } = this.props;
        const { tokenBalances } = this.state;
        let totalOwedRows: JSX.Element[] = [];
        let totalRepaidRows: JSX.Element[] = [];

        for (let tokenSymbol in tokenBalances) {
            if (tokenBalances.hasOwnProperty(tokenSymbol)) {
                const { totalOwed, totalRepaid } = tokenBalances[tokenSymbol];

                const token = tokens.find((tokenEntity) => tokenEntity.symbol === tokenSymbol);

                if (!token) {
                    continue;
                }

                if (totalOwed.gt(0) || totalRepaid.gt(0)) {
                    if (totalOwed.gt(0) && totalOwedRows.length < 4) {
                        if (totalOwedRows.length === 3) {
                            totalOwedRows.push(<TokenWrapper key={"more"}>AND MORE</TokenWrapper>);
                        } else {
                            totalOwedRows.push(
                                <TokenWrapper key={tokenSymbol}>
                                    <TokenAmount
                                        tokenAmount={totalOwed}
                                        tokenDecimals={token.numDecimals}
                                        tokenSymbol={tokenSymbol}
                                    />
                                </TokenWrapper>,
                            );
                        }
                    }
                    if (totalRepaid.gt(0) && totalRepaidRows.length < 4) {
                        if (totalRepaidRows.length === 3) {
                            totalRepaidRows.push(
                                <TokenWrapper key={"more"}>AND MORE</TokenWrapper>,
                            );
                        } else {
                            totalRepaidRows.push(
                                <TokenWrapper key={tokenSymbol}>
                                    <TokenAmount
                                        tokenAmount={totalRepaid}
                                        tokenDecimals={token.numDecimals}
                                        tokenSymbol={tokenSymbol}
                                    />
                                </TokenWrapper>,
                            );
                        }
                    }
                }
            }
        }
        const defaultTotal = <TokenWrapper>0 ETH</TokenWrapper>;
        return (
            <Wrapper>
                <HalfCol>
                    <Value>{totalOwedRows.length ? totalOwedRows : defaultTotal}</Value>
                    <Label>Total Owed</Label>
                </HalfCol>
                <HalfCol>
                    <Value>{totalRepaidRows.length ? totalRepaidRows : defaultTotal}</Value>
                    <Label>Total Repaid</Label>
                </HalfCol>
            </Wrapper>
        );
    }
}

export { DebtsMetrics };
