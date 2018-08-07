import * as React from "react";
import * as Web3 from "web3";
import { Dharma } from "@dharmaprotocol/dharma.js";
import { BigNumber } from "bignumber.js";

import { WrapETH } from "../../components/WrapETH/WrapETH";

// Styled Components
import { TradingPermissionsWrapper, TradingPermissionsTitle } from "./styledComponents";

import { TokenEntity } from "../../models";
const promisify = require("tiny-promisify");
import { web3Errors } from "../../common/web3Errors";
import { BLOCKCHAIN_API } from "../../common/constants";
import { Tooltip } from "../Tooltip/Tooltip";
import { TokenSearch } from "./TokenSearch";

interface Props {
    web3: Web3;
    dharma: Dharma;
    networkId: number;
    tokens: TokenEntity[];
    className?: string;
    handleSetAllTokensTradingPermission: (tokens: TokenEntity[]) => void;
    handleToggleTokenTradingPermission: (tokenAddress: string, permission: boolean) => void;
    handleSetError: (errorMessage: string) => void;
    handleClearToast: () => void;
    handleFaucetRequest: (tokenAddress: string, userAddress: string, dharma: Dharma) => void;
    toggleTokenLoadingSpinner: (tokenAddress: string, loading: boolean) => void;
    agreeToTerms: boolean;
}

interface State {
    collapse: boolean;
}

class TradingPermissions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.getTokenAllowance = this.getTokenAllowance.bind(this);
        this.updateProxyAllowanceAsync = this.updateProxyAllowanceAsync.bind(this);
        this.showMore = this.showMore.bind(this);
    }

    async componentDidMount() {
        this.getTokenData(this.props.dharma);
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.dharma !== prevProps.dharma) {
            this.getTokenData(this.props.dharma);
        }
    }

    async getTokenAllowance(tokenAddress: string) {
        const { web3, dharma } = this.props;
        if (!web3 || !dharma) {
            return new BigNumber(-1);
        }

        const accounts = await promisify(web3.eth.getAccounts)();
        // TODO: handle account retrieval error more robustly
        if (!accounts || !accounts[0]) {
            return new BigNumber(-1);
        }

        const ownerAddress = accounts[0];
        const tokenAllowance = await dharma.token.getProxyAllowanceAsync(
            tokenAddress,
            ownerAddress,
        );
        return new BigNumber(tokenAllowance);
    }

    async getTokenBalance(tokenAddress: string) {
        try {
            const { dharma, web3 } = this.props;
            if (!web3) {
                return new BigNumber(-1);
            }

            const accounts = await promisify(web3.eth.getAccounts)();
            // TODO: handle account retrieval error more robustly
            if (!accounts || !accounts[0]) {
                return new BigNumber(-1);
            }

            const ownerAddress = accounts[0];
            const tokenBalance = await dharma.token.getBalanceAsync(tokenAddress, ownerAddress);
            return new BigNumber(tokenBalance);
        } catch (e) {
            return new BigNumber(-1);
            // console.log(e);
        }
    }

    async getTokenData(dharma: Dharma) {
        try {
            const { handleSetAllTokensTradingPermission } = this.props;

            if (!dharma || !handleSetAllTokensTradingPermission) {
                return;
            }

            const tokens = await dharma.token.getSupportedTokens();

            const tokensWithBalance = await Promise.all(
                await tokens.map(async (token) => {
                    const address = token.address;

                    const tradingPermitted = this.isAllowanceUnlimited(
                        await this.getTokenAllowance(address),
                    );

                    let balance = await this.getTokenBalance(address);

                    const numDecimals = await dharma.token.getNumDecimals(token.symbol);

                    return {
                        address,
                        awaitingTransaction: false,
                        balance,
                        numDecimals,
                        tradingPermitted,
                        ...token,
                    };
                }),
            );

            handleSetAllTokensTradingPermission(tokensWithBalance);
        } catch (e) {
            this.props.handleSetError("Unable to get token data");
        }
    }

    async updateProxyAllowanceAsync(tradingPermitted: boolean, tokenAddress: string) {
        this.props.toggleTokenLoadingSpinner(tokenAddress, true);

        try {
            this.props.handleSetError("");
            const { tokens, dharma } = this.props;
            if (!dharma) {
                this.props.handleSetError(web3Errors.UNSUPPORTED_NETWORK);
                return;
            }

            let selectedToken: TokenEntity | undefined = undefined;
            for (let token of tokens) {
                if (token.address === tokenAddress) {
                    selectedToken = token;
                    break;
                }
            }
            if (selectedToken) {
                let txHash;
                if (tradingPermitted) {
                    txHash = await dharma.token.setProxyAllowanceAsync(
                        selectedToken.address,
                        new BigNumber(0),
                    );
                } else {
                    txHash = await dharma.token.setUnlimitedProxyAllowanceAsync(
                        selectedToken.address,
                    );
                }

                await dharma.blockchain.awaitTransactionMinedAsync(
                    txHash,
                    BLOCKCHAIN_API.POLLING_INTERVAL,
                    BLOCKCHAIN_API.TIMEOUT,
                );

                selectedToken.tradingPermitted = this.isAllowanceUnlimited(
                    await this.getTokenAllowance(selectedToken.address),
                );

                this.props.handleToggleTokenTradingPermission(tokenAddress, !tradingPermitted);
            }

            this.props.toggleTokenLoadingSpinner(tokenAddress, false);
        } catch (e) {
            if (e.message.includes("Insufficient funds")) {
                this.props.handleSetError(
                    "Insufficient ether in account to pay gas for transaction",
                );
            } else if (e.message.includes("User denied transaction signature")) {
                this.props.handleSetError("Wallet has denied transaction.");
            } else {
                this.props.handleSetError(e.message);
            }

            this.props.toggleTokenLoadingSpinner(tokenAddress, false);
            // throw new Error(e);
        }
    }

    isAllowanceUnlimited(tokenAllowance: BigNumber) {
        return tokenAllowance.greaterThanOrEqualTo(
            new BigNumber(2).pow(32).minus(new BigNumber(1)),
        );
    }

    showMore() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        const {
            handleFaucetRequest,
            handleSetError,
            handleClearToast,
            tokens,
            agreeToTerms,
            dharma,
            web3,
            networkId,
        } = this.props;

        if (!this.props.tokens || !this.props.tokens.length) {
            return null;
        }

        const tooltipContent = (
            <span>
                Turn on permissions for a token to enable its use with the Dharma smart contracts.
            </span>
        );

        return (
            <TradingPermissionsWrapper className={this.props.className}>
                <TradingPermissionsTitle>
                    Token Permissions <Tooltip content={tooltipContent} id="token-permissions" />
                </TradingPermissionsTitle>
                <TokenSearch
                    tokens={tokens}
                    web3={web3}
                    networkId={networkId}
                    dharma={dharma}
                    setError={handleSetError}
                    clearToast={handleClearToast}
                    handleFaucetRequest={handleFaucetRequest}
                    agreeToTerms={agreeToTerms}
                    updateProxyAllowanceAsync={this.updateProxyAllowanceAsync}
                />
                <WrapETH />
            </TradingPermissionsWrapper>
        );
    }
}

export { TradingPermissions };
