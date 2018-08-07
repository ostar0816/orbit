import { connect } from "react-redux";
import { ActiveInvestment } from "./ActiveInvestment";
import { InvestmentEntity } from "../../../../models";
import { updateInvestment } from "../../../../actions/investmentActions";
import { setError } from "../../../../components/Toast/actions";

const mapStateToProps = (state: any) => {
    return {
        dharma: state.dharmaReducer.dharma,
        tokens: state.tokenReducer.tokens,
        recommendedGasPrice: state.gasPriceReducer.recommendedGasPrice,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setError: (errorMessage: string) => dispatch(setError(errorMessage)),
        updateInvestment: (investment: InvestmentEntity) => dispatch(updateInvestment(investment)),
    };
};

export const ActiveInvestmentContainer = connect(mapStateToProps, mapDispatchToProps)(
    ActiveInvestment,
);
