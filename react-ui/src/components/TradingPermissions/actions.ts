import { actionsEnums } from "../../common/actionsEnums";
import { TokenEntity } from "../../models";

import { BigNumber } from "bignumber.js";

export const setAllTokensTradingPermission = (tokens: TokenEntity[]) => {
    return {
        type: actionsEnums.SET_ALL_TOKENS_TRADING_PERMISSION,
        tokens: tokens,
    };
};

export const toggleTokenTradingPermission = (tokenAddress: string, permission: boolean) => {
    return {
        type: actionsEnums.TOGGLE_TOKEN_TRADING_PERMISSION,
        tokenAddress: tokenAddress,
        permission: permission,
    };
};

export const toggleTokenLoadingSpinner = (tokenAddress: string, loading: boolean) => {
    return {
        type: actionsEnums.TOGGLE_TOKEN_LOADING_SPINNER,
        tokenAddress,
        loading,
    };
};

export const setTokenBalance = (tokenAddress: string, balance: BigNumber) => {
    return {
        type: actionsEnums.SET_TOKEN_BALANCE,
        tokenAddress,
        balance,
    };
};
