import { connect } from "react-redux";
import { Toast } from "./Toast";
import { clearToast } from "./actions";

const mapStateToProps = (state: any) => {
    return {
        message: state.toastReducer.message,
        type: state.toastReducer.type,
        persisted: state.toastReducer.persisted,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleClearToast: () => dispatch(clearToast()),
    };
};

export const ToastContainer = connect(mapStateToProps, mapDispatchToProps)(Toast);
