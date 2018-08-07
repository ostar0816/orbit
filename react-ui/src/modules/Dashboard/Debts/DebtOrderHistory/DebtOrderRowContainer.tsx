import { connect } from "react-redux";
import { DebtOrderRow } from "./DebtOrderRow";

const mapStateToProps = (state: any) => {
    return {
        dharma: state.dharmaReducer.dharma,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export const DebtOrderRowContainer = connect(mapStateToProps, mapDispatchToProps)(DebtOrderRow);
