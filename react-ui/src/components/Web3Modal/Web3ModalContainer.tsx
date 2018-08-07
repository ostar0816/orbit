import { connect } from "react-redux";
import { Web3Modal } from "./Web3Modal";

const mapStateToProps = (state: any) => {
    return {
        isMobileBrowser: state.plexReducer.isMobileBrowser,
    };
};

export const Web3ModalContainer = connect(mapStateToProps)(Web3Modal);
