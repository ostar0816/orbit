// External Libraries
import * as React from "react";
import * as Web3 from "web3";
import { Dharma } from "@dharmaprotocol/dharma.js";

// Models
import { TokenEntity } from "../../models";

import { TokenLabel } from "./TokenLabel";
import { Toggle } from "../Toggle";

interface Props {
    token: TokenEntity;
    web3: Web3;
    networkId: number;
    dharma: Dharma;
    setError: (errorMessage: string) => void;
    clearToast: () => void;
    handleFaucetRequest: (tokenAddress: string, userAddress: string, dharma: Dharma) => void;
    agreeToTerms: boolean;
    updateProxyAllowanceAsync: (tradingPermitted: boolean, tokenAddress: string) => void;
}

export class TokenSearchResult extends React.Component<Props, {}> {
    render() {
        const {
            token,
            web3,
            dharma,
            setError,
            clearToast,
            handleFaucetRequest,
            agreeToTerms,
            updateProxyAllowanceAsync,
            networkId,
        } = this.props;

        const { tradingPermitted, address, balance } = token;

        const disabled = balance.lte(0) || !agreeToTerms;

        return (
            <Toggle
                name={name}
                checked={tradingPermitted}
                disabled={disabled}
                onChange={() => updateProxyAllowanceAsync(tradingPermitted, address)}
                key={token.symbol}
            >
                <TokenLabel
                    token={token}
                    web3={web3}
                    networkId={networkId}
                    dharma={dharma}
                    setError={setError}
                    clearToast={clearToast}
                    handleFaucetRequest={handleFaucetRequest}
                />
            </Toggle>
        );
    }
}
