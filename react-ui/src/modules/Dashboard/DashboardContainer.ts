import { connect } from "react-redux";
import { Dashboard } from "./Dashboard";
import { setError } from "../../components/Toast/actions";
import { setInvestments } from "../../actions/investmentActions";
import { DebtEntity, InvestmentEntity, OpenCollateralizedDebtEntity } from "../../models";
import { fillDebtEntity } from "../FillLoan/FillLoanEntered/actions";
import { setFilledDebtEntities } from "./actions";

const mapStateToProps = (state: any) => {
    const {
        debtEntities,
        filledDebtEntityIssuanceHashes,
        pendingDebtEntityIssuanceHashes,
    } = state.debtEntityReducer;

    const filledDebtEntities: DebtEntity[] = filledDebtEntityIssuanceHashes.map(
        (issuanceHash: string) => debtEntities.get(issuanceHash),
    );
    const pendingDebtEntities: DebtEntity[] = pendingDebtEntityIssuanceHashes.map(
        (issuanceHash: string) => new OpenCollateralizedDebtEntity(debtEntities.get(issuanceHash)),
    );

    return {
        accounts: state.web3Reducer.accounts,
        dharma: state.dharmaReducer.dharma,
        filledDebtEntities,
        investments: Array.from(state.investmentReducer.investments.values()),
        pendingDebtEntities,
        web3: state.web3Reducer.web3,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleSetError: (errorMessage: string) => dispatch(setError(errorMessage)),
        handleFillDebtEntity: (issuanceHash: string) => dispatch(fillDebtEntity(issuanceHash)),
        handleSetFilledDebtEntities: (filledDebtEntities: DebtEntity[]) =>
            dispatch(setFilledDebtEntities(filledDebtEntities)),
        setInvestments: (investments: InvestmentEntity[]) => dispatch(setInvestments(investments)),
    };
};

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
