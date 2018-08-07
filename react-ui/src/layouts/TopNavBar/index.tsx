import * as React from "react";
import { Collapse, Navbar } from "reactstrap";
import { IndexLink } from "react-router";
import {
    Wrapper,
    BrandLogo,
    StyledNavbarToggler,
    StyledNavItem,
    StyledLink,
    StyledNav,
} from "./styledComponents";
import { TradingPermissionsContainer } from "../../components";

interface TopNavBarState {
    isOpen: boolean;
}

interface LinkItem {
    url: string;
    display: string;
}

interface Props {
    linkItems: LinkItem[];
}

class TopNavBar extends React.Component<Props, TopNavBarState> {
    constructor(props: Props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { isOpen: false };
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { linkItems } = this.props;
        const linkItemRows = linkItems.map((link) => (
            <StyledNavItem key={link.display}>
                <StyledLink to={link.url} activeClassName="active">
                    {link.display}
                </StyledLink>
            </StyledNavItem>
        ));

        return (
            <Wrapper>
                <Navbar color="faded" light={true} expand="md">
                    <IndexLink to="/">
                        <BrandLogo src={require("../../assets/img/logo_icon_white.png")} />
                    </IndexLink>
                    <StyledNavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar={true}>
                        <StyledNav className="ml-auto" navbar={true}>
                            {linkItemRows}
                        </StyledNav>
                        <TradingPermissionsContainer />
                    </Collapse>
                </Navbar>
            </Wrapper>
        );
    }
}

export default TopNavBar;
