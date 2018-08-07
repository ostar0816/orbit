import { actionsEnums } from "../common/actionsEnums";
import { BigNumber } from "bignumber.js";

export const nonWeb3EnabledBrowserDetected = () => {
    return {
        type: actionsEnums.NON_WEB3_ENABLED_BROWSER_DETECTED,
    };
};

export const web3Connected = (web3: any) => {
    return {
        type: actionsEnums.WEB3_CONNECTED,
        web3: web3,
    };
};

export const dharmaInstantiated = (dharma: any) => {
    return {
        type: actionsEnums.DHARMA_INSTANTIATED,
        dharma: dharma,
    };
};

export const setAccounts = (accounts: string[]) => {
    return {
        type: actionsEnums.SET_ACCOUNTS,
        accounts: accounts,
    };
};

export const setNetworkId = (networkId: number) => {
    return {
        type: actionsEnums.SET_NETWORK_ID,
        networkId: networkId,
    };
};

export const setRecommendedGasPrice = (recommendedGasPrice: BigNumber) => {
    return {
        type: actionsEnums.SET_RECOMMENDED_GAS_PRICE,
        recommendedGasPrice,
    };
};
