import { actionsEnums } from "../common/actionsEnums";

export const finishWalkthrough = () => {
    return {
        type: actionsEnums.FINISH_WALKTHROUGH,
    };
};

export const detectMobileBrowser = (isMobileBrowser: boolean) => {
    return {
        type: actionsEnums.DETECT_MOBILE_BROWSER,
        isMobileBrowser,
    };
};
