import { actionsEnums } from "../../common/actionsEnums";

export const setError = (errorMessage: string, persisted?: boolean) => {
    return {
        type: actionsEnums.SET_ERROR_TOAST,
        errorMessage: errorMessage,
        persisted,
    };
};

export const setInfo = (infoMessage: string, persisted?: boolean) => {
    return {
        type: actionsEnums.SET_INFO_TOAST,
        infoMessage: infoMessage,
        persisted,
    };
};

export const setSuccess = (successMessage: string | JSX.Element) => {
    return {
        type: actionsEnums.SET_SUCCESS_TOAST,
        successMessage: successMessage,
    };
};

export const clearToast = () => {
    return {
        type: actionsEnums.CLEAR_TOAST,
    };
};
