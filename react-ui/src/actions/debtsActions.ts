import { actionsEnums } from "../common/actionsEnums";
import { debtOrderFromServerEntity } from "../utils/debtOrder";

import DebtsService from "../services/debts";

import { DebtEntity } from "../models";

export function fetchDebts(networkId: number) {
    return async (dispatch: any, getState: any) => {
        const { accounts } = getState().web3Reducer;
        const { debts } = await DebtsService.list(networkId);

        const normalizedDebts = debts.map((debt: any) => debtOrderFromServerEntity(debt));

        dispatch({
            type: actionsEnums.DEBTS_FETCH_REQUEST_SUCCESSED,
            debts: normalizedDebts,
        });

        /**
         * Set user pending debts from the list
         */
        dispatch({
            type: actionsEnums.SET_PENDING_DEBT_ENTITIES,
            payload: normalizedDebts.filter((debt: DebtEntity) => debt.debtor === accounts[0]),
        });
    };
}
