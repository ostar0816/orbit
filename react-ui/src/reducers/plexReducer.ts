import { actionsEnums } from "../common/actionsEnums";

class PlexReducerState {
    agreeToTerms: boolean;
    walkthroughCompleted: boolean;
    isMobileBrowser: boolean;

    constructor() {
        this.agreeToTerms = false;
        this.walkthroughCompleted = false;
        this.isMobileBrowser = false;
    }
}

const handleAgreeToTerms = (state: PlexReducerState, action: any) => {
    return {
        ...state,
        agreeToTerms: action.payload,
    };
};

const handleFinishWalkthrough = (state: PlexReducerState) => {
    return {
        ...state,
        walkthroughCompleted: true,
    };
};

const handleMobileBrowserDetection = (state: PlexReducerState, action: any) => {
    return {
        ...state,
        isMobileBrowser: action.isMobileBrowser,
    };
};

export const plexReducer = (state: PlexReducerState = new PlexReducerState(), action: any) => {
    switch (action.type) {
        case actionsEnums.AGREE_TO_TERMS:
            return handleAgreeToTerms(state, action);
        case actionsEnums.FINISH_WALKTHROUGH:
            return handleFinishWalkthrough(state);
        case actionsEnums.DETECT_MOBILE_BROWSER:
            return handleMobileBrowserDetection(state, action);
        default:
            return state;
    }
};
