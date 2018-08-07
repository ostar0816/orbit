import { connect } from "react-redux";
import { Walkthrough } from "./Walkthrough";
import { finishWalkthrough } from "../../actions";

const mapStateToProps = (state: any) => {
    return {
        tokens: state.tokenReducer.tokens,
        walkthroughCompleted: state.plexReducer.walkthroughCompleted,
        isMobileBrowser: state.plexReducer.isMobileBrowser,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        finishWalkthrough: () => dispatch(finishWalkthrough()),
    };
};

export const WalkthroughContainer = connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
