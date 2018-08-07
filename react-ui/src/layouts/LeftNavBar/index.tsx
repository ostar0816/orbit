import * as React from "react";
import { IndexLink } from "react-router";
import { Wrapper, LogoContainer, BrandLogo, StyledLink } from "./styledComponents";
import { TradingPermissionsContainer } from "../../components";

interface Props {
    handleCloseDrawer: () => void;
}

class LeftNavBar extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.closeDrawer = this.closeDrawer.bind(this);
    }

    closeDrawer() {
        const { handleCloseDrawer } = this.props;
        handleCloseDrawer();
    }

    render() {
        return (
            <Wrapper>
                <LogoContainer>
                    <IndexLink to="/">
                        <BrandLogo src={require("../../assets/img/logo_icon_white.png")} />
                    </IndexLink>
                </LogoContainer>

                <StyledLink
                    to="/dashboard"
                    onClick={this.closeDrawer}
                    className="nav-link"
                    activeClassName="active"
                >
                    Dashboard
                </StyledLink>

                <StyledLink
                    to="/loans"
                    onClick={this.closeDrawer}
                    className="nav-link"
                    activeClassName="active"
                >
                    Loans List
                </StyledLink>

                <StyledLink
                    to="/request"
                    onClick={this.closeDrawer}
                    className="nav-link"
                    activeClassName="active"
                >
                    Request Loan
                </StyledLink>

                <StyledLink
                    to="/fill"
                    onClick={this.closeDrawer}
                    className="nav-link"
                    activeClassName="active"
                >
                    Fill Loan
                </StyledLink>

                <TradingPermissionsContainer className="TradingPermissionsContainer left" />
            </Wrapper>
        );
    }
}

export default LeftNavBar;
