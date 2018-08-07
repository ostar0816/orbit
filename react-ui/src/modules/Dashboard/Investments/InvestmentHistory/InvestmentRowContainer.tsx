import { connect } from "react-redux";
import { InvestmentRow } from "./InvestmentRow";

const mapStateToProps = (state: any) => {
    return {
        dharma: state.dharmaReducer.dharma,
        tokens: state.tokenReducer.tokens,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export const InvestmentRowContainer = connect(mapStateToProps, mapDispatchToProps)(InvestmentRow);
