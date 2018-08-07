import { connect } from "react-redux";
import { EnsureAgreedToTerms } from "./EnsureAgreedToTerms";

const mapStateToProps = (state: any) => {
    return {
        agreeToTerms: state.plexReducer.agreeToTerms,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export const EnsureAgreedToTermsContainer = connect(mapStateToProps, mapDispatchToProps)(
    EnsureAgreedToTerms,
);
