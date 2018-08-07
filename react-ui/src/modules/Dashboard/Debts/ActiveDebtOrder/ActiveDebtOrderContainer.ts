import { connect } from "react-redux";
import { ActiveDebtOrder } from "./ActiveDebtOrder";
import { BigNumber } from "bignumber.js";
import { successfulRepayment, cancelDebtEntity } from "./actions";
import { updateDebtEntity } from "../../../../actions/debtEntityActions";
import { setError, setSuccess } from "../../../../components/Toast/actions";
import { DebtEntity } from "../../../../models";

const mapStateToProps = (state: any) => {
    return {
        accounts: state.web3Reducer.accounts,
        tokens: state.tokenReducer.tokens,
        recommendedGasPrice: state.gasPriceReducer.recommendedGasPrice,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleSuccessfulRepayment: (
            agreementId: string,
            repaymentAmount: BigNumber,
            tokenSymbol: string,
        ) => dispatch(successfulRepayment(agreementId, repaymentAmount, tokenSymbol)),
        handleSetErrorToast: (errorMessage: string) => dispatch(setError(errorMessage)),
        handleSetSuccessToast: (successMessage: string | JSX.Element) =>
            dispatch(setSuccess(successMessage)),
        handleCancelDebtEntity: (issuanceHash: string) => dispatch(cancelDebtEntity(issuanceHash)),
        updateDebtEntity: (debtEntity: DebtEntity) => dispatch(updateDebtEntity(debtEntity)),
    };
};

export const ActiveDebtOrderContainer = connect(mapStateToProps, mapDispatchToProps)(
    ActiveDebtOrder,
);
