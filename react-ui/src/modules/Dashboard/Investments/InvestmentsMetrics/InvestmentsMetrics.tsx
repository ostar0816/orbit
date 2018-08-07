import * as React from "react";
import { TokenEntity, InvestmentEntity } from "../../../../models";
import { BigNumber } from "bignumber.js";
import { Wrapper, HalfCol, Value, TokenWrapper, Label } from "./styledComponents";
import { TokenAmount } from "src/components";

interface Props {
    investments: InvestmentEntity[];
    tokens: TokenEntity[];
}

interface State {
    tokenBalances: {
        [key: string]: {
            totalLended: BigNumber;
            totalEarned: BigNumber;
        };
    };
}

class InvestmentsMetrics extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            tokenBalances: {},
        };
    }

    componentDidMount() {
        this.initiateTokenBalance(this.props.tokens);
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.tokens !== prevProps.tokens) {
            this.initiateTokenBalance(this.props.tokens);
        }
    }

    initiateTokenBalance(tokens: TokenEntity[]) {
        const { investments } = this.props;
        if (!tokens || !investments) {
            return;
        }
        let tokenBalances: any = {};
        for (let token of tokens) {
            tokenBalances[token.symbol] = {
                totalLended: new BigNumber(0),
                totalEarned: new BigNumber(0),
            };
        }
        for (let investment of investments) {
            if (tokenBalances[investment.principalTokenSymbol]) {
                tokenBalances[investment.principalTokenSymbol].totalLended = tokenBalances[
                    investment.principalTokenSymbol
                ].totalLended.plus(investment.principalAmount);
                tokenBalances[investment.principalTokenSymbol].totalEarned = tokenBalances[
                    investment.principalTokenSymbol
                ].totalEarned.plus(investment.earnedAmount);
            }
        }
        this.setState({ tokenBalances });
    }

    render() {
        const { tokens } = this.props;
        const { tokenBalances } = this.state;
        let totalLendedRows: JSX.Element[] = [];
        let totalEarnedRows: JSX.Element[] = [];

        for (let tokenSymbol in tokenBalances) {
            if (tokenBalances.hasOwnProperty(tokenSymbol)) {
                const { totalLended, totalEarned } = tokenBalances[tokenSymbol];
                const token = tokens.find((tokenEntity) => tokenEntity.symbol === tokenSymbol);

                if (!token) {
                    continue;
                }

                const tokenDecimals = token.numDecimals;

                if (totalLended.gt(0) || totalEarned.gt(0)) {
                    if (totalLended.gt(0) && totalLendedRows.length < 4) {
                        if (totalLendedRows.length === 3) {
                            totalLendedRows.push(
                                <TokenWrapper key={"more"}>AND MORE</TokenWrapper>,
                            );
                        } else {
                            totalLendedRows.push(
                                <TokenWrapper key={tokenSymbol}>
                                    <TokenAmount
                                        tokenAmount={totalLended}
                                        tokenDecimals={tokenDecimals}
                                        tokenSymbol={tokenSymbol}
                                    />
                                </TokenWrapper>,
                            );
                        }
                    }
                    if (totalEarned.gt(0) && totalEarnedRows.length < 4) {
                        if (totalEarnedRows.length === 3) {
                            totalEarnedRows.push(
                                <TokenWrapper key={"more"}>AND MORE</TokenWrapper>,
                            );
                        } else {
                            totalEarnedRows.push(
                                <TokenWrapper key={tokenSymbol}>
                                    <TokenAmount
                                        tokenAmount={totalEarned}
                                        tokenDecimals={tokenDecimals}
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
                    <Value>{totalLendedRows.length ? totalLendedRows : defaultTotal}</Value>
                    <Label>Total Lent</Label>
                </HalfCol>
                <HalfCol>
                    <Value>{totalEarnedRows.length ? totalEarnedRows : defaultTotal}</Value>
                    <Label>Total Earned</Label>
                </HalfCol>
            </Wrapper>
        );
    }
}

export { InvestmentsMetrics };
