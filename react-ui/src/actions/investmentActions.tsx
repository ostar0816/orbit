import { actionsEnums } from "../common/actionsEnums";
import { InvestmentEntity } from "../models";

export const setInvestments = (investments: InvestmentEntity[]) => {
    return {
        investments,
        type: actionsEnums.SET_INVESTMENTS,
    };
};

export const updateInvestment = (investment: InvestmentEntity) => {
    return {
        investment,
        type: actionsEnums.UPDATE_INVESTMENT,
    };
};
