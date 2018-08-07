import { DebtEntity } from "src/models";
import { actionsEnums } from "src/common/actionsEnums";

export const setFilledDebtEntities = (filledDebtEntities: DebtEntity[]) => {
    return {
        type: actionsEnums.SET_FILLED_DEBT_ENTITIES,
        payload: filledDebtEntities,
    };
};
