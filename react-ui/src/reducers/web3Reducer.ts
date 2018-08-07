import { actionsEnums } from "../common/actionsEnums";

class Web3ReducerState {
    web3: any;
    accounts: string[];
    showWeb3BrowserModal: boolean;

    constructor() {
        this.web3 = null;
        this.accounts = [];
        this.showWeb3BrowserModal = false;
    }
}

const handleNonWeb3EnabledBrowserDetection = (state: Web3ReducerState, action: any) => {
    return {
        ...state,
        showWeb3BrowserModal: true,
    };
};

const handleWeb3Connected = (state: Web3ReducerState, action: any) => {
    return {
        ...state,
        web3: action.web3,
    };
};

const handleSetAccounts = (state: Web3ReducerState, action: any) => {
    return {
        ...state,
        accounts: action.accounts,
    };
};

const handleSetNetworkId = (state: Web3ReducerState, action: any) => {
    return {
        ...state,
        networkId: action.networkId,
    };
};

export const web3Reducer = (state: Web3ReducerState = new Web3ReducerState(), action: any) => {
    switch (action.type) {
        case actionsEnums.WEB3_CONNECTED:
            return handleWeb3Connected(state, action);
        case actionsEnums.SET_ACCOUNTS:
            return handleSetAccounts(state, action);
        case actionsEnums.SET_NETWORK_ID:
            return handleSetNetworkId(state, action);
        case actionsEnums.NON_WEB3_ENABLED_BROWSER_DETECTED:
            return handleNonWeb3EnabledBrowserDetection(state, action);
        default:
            return state;
    }
};
