import { actionsEnums } from "../common/actionsEnums";
import { InvestmentEntity } from "../models";

class InvestmentReducerState {
    // Map of issuanceHash to InvestmentEntity
    investments: Map<string, InvestmentEntity>;

    constructor() {
        this.investments = new Map<string, InvestmentEntity>();
    }
}

const handleSetInvestments = (
    state: InvestmentReducerState,
    newInvestments: InvestmentEntity[],
) => {
    const investments = state.investments;
    for (let investment of newInvestments) {
        investments.set(investment.issuanceHash, investment);
    }

    return {
        ...state,
        investments,
    };
};

const handleUpdateInvestment = (state: InvestmentReducerState, investment: InvestmentEntity) => {
    const investments = state.investments;
    investments.set(investment.issuanceHash, investment);

    return {
        ...state,
        investments,
    };
};

export const investmentReducer = (
    state: InvestmentReducerState = new InvestmentReducerState(),
    action: any,
) => {
    switch (action.type) {
        case actionsEnums.SET_INVESTMENTS:
            return handleSetInvestments(state, action.investments);
        case actionsEnums.UPDATE_INVESTMENT:
            return handleUpdateInvestment(state, action.investment);
        default:
            return state;
    }
};
