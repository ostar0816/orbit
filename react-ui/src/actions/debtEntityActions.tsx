import { actionsEnums } from "../common/actionsEnums";
import { DebtEntity } from "../models";

import { debtOrderFromServerEntity } from "../utils/debtOrder";

import DebtsService from "../services/debts";

export const setPendingDebtEntity = (issuanceHash: string) => {
    return {
        type: actionsEnums.SET_PENDING_DEBT_ENTITY,
        payload: issuanceHash,
    };
};

export const createDebtEntity = (debtEntity: DebtEntity, networkId: number) => async (
    dispatch: any,
) => {
    const debt = await DebtsService.create({ debt: debtEntity, networkId });

    const newDebt = debtOrderFromServerEntity(debt);

    dispatch({
        type: actionsEnums.CREATE_DEBT_ENTITY,
        debtEntity: newDebt,
    });
};

export const updateDebtEntity = (debtEntity: DebtEntity) => {
    return {
        debtEntity,
        type: actionsEnums.UPDATE_DEBT_ENTITY,
    };
};
