import { actionsEnums } from "../common/actionsEnums";
import { TokenEntity } from "../models";

class TokenReducerState {
    tokens: TokenEntity[];

    constructor() {
        this.tokens = [];
    }
}

const handleToggleTokenLoadingSpinner = (state: TokenReducerState, action: any) => {
    return {
        ...state,
        tokens: state.tokens.map((token) => {
            if (token.address === action.tokenAddress) {
                return {
                    ...token,
                    awaitingTransaction: action.loading,
                };
            }
            return token;
        }),
    };
};

const handleSetAllTokensTradingPermission = (state: TokenReducerState, action: any) => {
    return {
        ...state,
        tokens: action.tokens,
    };
};

const handleToggleTokenTradingPermission = (state: TokenReducerState, action: any) => {
    return {
        ...state,
        tokens: state.tokens.map((token) => {
            if (token.address === action.tokenAddress) {
                return {
                    ...token,
                    tradingPermitted: action.permission,
                };
            }
            return token;
        }),
    };
};

const handleSetTokenBalance = (state: TokenReducerState, action: any) => {
    return {
        ...state,
        tokens: state.tokens.map((token) => {
            if (token.address === action.tokenAddress) {
                return {
                    ...token,
                    balance: action.balance,
                };
            }
            return token;
        }),
    };
};

const handleSuccessfulRepayment = (state: TokenReducerState, action: any) => {
    return {
        tokens: state.tokens.map((token) => {
            if (token.symbol === action.repaymentTokenSymbol) {
                return {
                    ...token,
                    balance: token.balance.minus(action.repaymentAmount),
                };
            }
            return token;
        }),
    };
};

export const tokenReducer = (state: TokenReducerState = new TokenReducerState(), action: any) => {
    switch (action.type) {
        case actionsEnums.SET_ALL_TOKENS_TRADING_PERMISSION:
            return handleSetAllTokensTradingPermission(state, action);
        case actionsEnums.TOGGLE_TOKEN_LOADING_SPINNER:
            return handleToggleTokenLoadingSpinner(state, action);
        case actionsEnums.TOGGLE_TOKEN_TRADING_PERMISSION:
            return handleToggleTokenTradingPermission(state, action);
        case actionsEnums.SET_TOKEN_BALANCE:
            return handleSetTokenBalance(state, action);
        case actionsEnums.SUCCESSFUL_REPAYMENT:
            return handleSuccessfulRepayment(state, action);
        default:
            return state;
    }
};
