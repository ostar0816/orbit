import { actionsEnums } from "../common/actionsEnums";
import { DebtEntity } from "../models";

class DebtsReducerState {
    debts: DebtEntity[];
    loading: boolean;

    constructor() {
        this.debts = [];
        this.loading = true;
    }
}

const handleCreateDebtEntity = (state: DebtsReducerState, debtEntity: DebtEntity) => ({
    ...state,
    debts: [debtEntity, ...state.debts],
});

const handlePendingDebtsFetch = (state: DebtsReducerState, debts: DebtEntity[]) => ({
    ...state,
    debts,
    loading: false,
});

const handlePendingDebtRemoval = (state: DebtsReducerState, issuanceHash: string) => ({
    ...state,
    debts: state.debts.filter((debt) => debt.issuanceHash !== issuanceHash),
});

export const debtsReducer = (state: DebtsReducerState = new DebtsReducerState(), action: any) => {
    switch (action.type) {
        case actionsEnums.CREATE_DEBT_ENTITY:
            return handleCreateDebtEntity(state, action.debtEntity);
        case actionsEnums.DEBTS_FETCH_REQUEST_SUCCESSED:
            return handlePendingDebtsFetch(state, action.debts);
        case actionsEnums.FILL_DEBT_ENTITY:
        case actionsEnums.CANCEL_DEBT_ENTITY:
            return handlePendingDebtRemoval(state, action.payload);
        default:
            return state;
    }
};
