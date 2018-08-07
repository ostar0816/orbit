import { actionsEnums } from "../../../common/actionsEnums";

import DebtsService from "../../../services/debts";

export const fillDebtEntity = (issuanceHash: string) => async (dispatch: any) => {
    await DebtsService.cancel(issuanceHash);

    dispatch({
        type: actionsEnums.FILL_DEBT_ENTITY,
        payload: issuanceHash,
    });
};
