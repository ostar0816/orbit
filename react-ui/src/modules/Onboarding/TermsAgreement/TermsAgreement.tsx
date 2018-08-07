// External libraries
import * as React from "react";
import { browserHistory } from "react-router";

// Layouts
import { PaperLayout } from "../../../layouts";

// Components
import { MainWrapper, Checkbox } from "../../../components";

// Styled components
import {
    BannerContainer,
    Header,
    Description,
    ButtonContainer,
    NextButton,
    StyledLink,
} from "./styledComponents";

interface Props {
    agreeToTerms: boolean;
    handleSetError: (errorMessage: string) => void;
    handleAgreeToTerms: (agree: boolean) => void;
}

interface State {
    agreeToTermsOfUse: boolean;
}

class TermsAgreement extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleAgreeChange = this.handleAgreeChange.bind(this);
        this.checkAgree = this.checkAgree.bind(this);

        this.state = {
            agreeToTermsOfUse: false,
        };
    }

    componentDidMount() {
        if (this.props.agreeToTerms) {
            browserHistory.push("/request");
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.agreeToTerms !== prevProps.agreeToTerms && this.props.agreeToTerms) {
            browserHistory.push("/request");
        }
    }

    handleAgreeChange(checked: boolean) {
        this.setState({
            agreeToTermsOfUse: checked,
        });
    }

    checkAgree() {
        this.props.handleSetError("");

        if (!this.state.agreeToTermsOfUse) {
            this.props.handleSetError("You have to agree to the terms of use to continue");
            return;
        }

        this.props.handleAgreeToTerms(true);

        browserHistory.push("/request");
    }

    render() {
        const checkboxLabel = (
            <span>
                I have read and agree to the <StyledLink to="/">Terms of Use</StyledLink>.
            </span>
        );
        return (
            <PaperLayout>
                <BannerContainer />
                <MainWrapper>
                    <Header>Orbit Network</Header>
                    <Description>
                        <h2>
                            {" "}
                            Orbit enables users to interact on the Ethereum blockchain using
                            tokenized debt agreements. Orbit is not a party to any contract entered
                            into between users, does not act as a lender or give loans using Orbit,
                            and does not otherwise enter into any agreements with or commit to any
                            obligations to any user of the Orbit Network.
                        </h2>
                    </Description>
                    <Checkbox
                        name="agree"
                        label={checkboxLabel}
                        onChange={this.handleAgreeChange}
                        checked={this.state.agreeToTermsOfUse}
                    />
                    <ButtonContainer>
                        <NextButton onClick={this.checkAgree}>Next &rarr;</NextButton>
                    </ButtonContainer>
                </MainWrapper>
            </PaperLayout>
        );
    }
}

export { TermsAgreement };
