// External libraries
import { connect } from "react-redux";

// Actions
import { setError } from "../../components/Toast/actions";
import { agreeToTerms } from "./TermsAgreement/actions";

// Components
import { Onboarding } from "./Onboarding";

const mapStateToProps = (state: any) => {
    return {
        agreeToTerms: state.plexReducer.agreeToTerms,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleSetError: (errorMessage: string) => dispatch(setError(errorMessage)),
        handleAgreeToTerms: (agree: boolean) => dispatch(agreeToTerms(agree)),
    };
};

export const OnboardingContainer = connect(mapStateToProps, mapDispatchToProps)(Onboarding);
