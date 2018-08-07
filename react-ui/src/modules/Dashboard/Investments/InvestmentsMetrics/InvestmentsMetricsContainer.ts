import { connect } from "react-redux";
import { InvestmentsMetrics } from "./InvestmentsMetrics";

const mapStateToProps = (state: any) => {
    return {
        tokens: state.tokenReducer.tokens,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export const InvestmentsMetricsContainer = connect(mapStateToProps, mapDispatchToProps)(
    InvestmentsMetrics,
);
