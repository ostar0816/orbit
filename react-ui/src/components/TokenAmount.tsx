import * as React from "react";
import { BigNumber } from "bignumber.js";

interface Props {
    tokenAmount: BigNumber;
    tokenDecimals: BigNumber;
    tokenSymbol: string;
}

class TokenAmount extends React.Component<Props, {}> {
    render() {
        const { tokenAmount, tokenDecimals, tokenSymbol } = this.props;
        const humanReadableTokenAmount = this.formatAsHumanReadable(tokenAmount, tokenDecimals);

        return `${humanReadableTokenAmount} ${tokenSymbol}`;
    }

    private formatAsHumanReadable(value: BigNumber, power: BigNumber): string {
        if (!(value instanceof BigNumber)) {
            value = new BigNumber(value);
        }
        return value.div(new BigNumber(10).pow(power.toNumber())).toString();
    }
}

export { TokenAmount };
