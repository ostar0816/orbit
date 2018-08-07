import { BigNumber } from "bignumber.js";
import { actionsEnums } from "../../../../common/actionsEnums";

import DebtsService from "../../../../services/debts";

export const successfulRepayment = (
    agreementId: string,
    repaymentAmount: BigNumber,
    repaymentTokenSymbol: string,
) => {
    return {
        type: actionsEnums.SUCCESSFUL_REPAYMENT,
        agreementId,
        repaymentAmount,
        repaymentTokenSymbol,
    };
};

export const cancelDebtEntity = (issuanceHash: string) => async (dispatch: any) => {
    await DebtsService.cancel(issuanceHash);

    dispatch({
        type: actionsEnums.CANCEL_DEBT_ENTITY,
        payload: issuanceHash,
    });
};
