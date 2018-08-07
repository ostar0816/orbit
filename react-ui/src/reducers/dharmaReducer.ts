import { actionsEnums } from "../common/actionsEnums";

class DharmaReducerState {
    dharma: any;

    constructor() {
        this.dharma = null;
    }
}

const handleDharmaInstantiated = (state: DharmaReducerState, action: any) => {
    return {
        ...state,
        dharma: action.dharma,
    };
};

export const dharmaReducer = (
    state: DharmaReducerState = new DharmaReducerState(),
    action: any,
) => {
    switch (action.type) {
        case actionsEnums.DHARMA_INSTANTIATED:
            return handleDharmaInstantiated(state, action);
        default:
            return state;
    }
};
