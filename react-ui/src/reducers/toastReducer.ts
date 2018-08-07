import { actionsEnums } from "../common/actionsEnums";
import { ToastType } from "../components/Toast/Toast";

class ToastReducerState {
    message: string;
    type: ToastType;
    persisted: boolean;

    constructor() {
        this.message = "";
        this.type = ToastType.Info;
        this.persisted = false;
    }
}

const handleSetErrorToast = (state: ToastReducerState, action: any) => {
    return {
        ...state,
        message: action.errorMessage,
        type: ToastType.Error,
        persisted: action.persisted,
    };
};

const handleSetInfoToast = (state: ToastReducerState, action: any) => {
    return {
        ...state,
        message: action.infoMessage,
        type: ToastType.Info,
        persisted: action.persisted,
    };
};

const handleSetSuccessToast = (state: ToastReducerState, action: any) => {
    return {
        ...state,
        message: action.successMessage,
        type: ToastType.Success,
    };
};

const handleClearToast = (state: ToastReducerState, action: any) => {
    return {
        ...state,
        message: "",
    };
};

export const toastReducer = (state: ToastReducerState = new ToastReducerState(), action: any) => {
    switch (action.type) {
        case actionsEnums.SET_ERROR_TOAST:
            return handleSetErrorToast(state, action);
        case actionsEnums.SET_INFO_TOAST:
            return handleSetInfoToast(state, action);
        case actionsEnums.SET_SUCCESS_TOAST:
            return handleSetSuccessToast(state, action);
        case actionsEnums.CLEAR_TOAST:
            return handleClearToast(state, action);
        default:
            return state;
    }
};
