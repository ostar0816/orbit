import * as React from "react";
import { TermsAgreement } from "./TermsAgreement";

import SplashPage from "./SplashPage/SplashPage";

import { Navigation } from "./Navigation/Navigation";

import { OnboardingContainer } from "./StyledComponents";

export interface Props {
    agreeToTerms: boolean;
    handleSetError: (errorMessage: string) => void;
    handleAgreeToTerms: (agree: boolean) => void;
}

interface State {
    step: number;
}

export class Onboarding extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // Set up binding proactively for performance.
        this.handleEnterApp = this.handleEnterApp.bind(this);

        // Set default state.
        this.state = {
            step: 0,
        };
    }

    handleEnterApp() {
        this.setState({ step: 1 });
    }

    render() {
        const { agreeToTerms, handleSetError, handleAgreeToTerms } = this.props;
        const { step } = this.state;

        return (
            <OnboardingContainer>
                <Navigation />

                {step === 0 ? (
                    <SplashPage handleEnterApp={this.handleEnterApp} />
                ) : (
                    <TermsAgreement
                        agreeToTerms={agreeToTerms}
                        handleSetError={handleSetError}
                        handleAgreeToTerms={handleAgreeToTerms}
                    />
                )}
            </OnboardingContainer>
        );
    }
}
