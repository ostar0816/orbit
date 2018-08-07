import { actionsEnums } from "../../../common/actionsEnums";

export const agreeToTerms = (agree: boolean) => {
    return {
        type: actionsEnums.AGREE_TO_TERMS,
        payload: agree,
    };
};
