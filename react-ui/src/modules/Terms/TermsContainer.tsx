import { connect } from "react-redux";
import { Terms } from "./Terms";

// HACK: This is a strange coupling. TODO: Decouple this.
import { agreeToTerms } from "../Onboarding/TermsAgreement/actions";

const mapStateToProps = (state: any) => {
    return {
        agreeToTerms: state.plexReducer.agreeToTerms,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleAgreeToTerms: (agree: boolean) => dispatch(agreeToTerms(agree)),
    };
};

export const TermsContainer = connect(mapStateToProps, mapDispatchToProps)(Terms);
