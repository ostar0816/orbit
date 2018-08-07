import { connect } from "react-redux";
import { App } from "./App";
import { detectMobileBrowser } from "./actions";

const mapStateToProps = (state: any) => {
    return {
        web3: state.web3Reducer.web3,
        accounts: state.web3Reducer.accounts,
        showWeb3BrowserModal: state.web3Reducer.showWeb3BrowserModal,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        detectMobileBrowser: (isMobileBrowser: boolean) =>
            dispatch(detectMobileBrowser(isMobileBrowser)),
    };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
