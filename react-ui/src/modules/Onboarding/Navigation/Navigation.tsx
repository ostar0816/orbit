// External libraries
import * as React from "react";
import { IndexLink } from "react-router";

// Styled components
import {
    BrandLogo,
    LogoContainer,
    NavBar,
    NavBarContainer,
    MenuRight,
    MenuItem,
} from "./StyledComponents";

export class Navigation extends React.Component<{}, {}> {
    render() {
        return (
            <NavBarContainer>
                <NavBar>
                    <LogoContainer>
                        <IndexLink to="/">
                            <BrandLogo src={require("../../../assets/img/logo_color.png")} />
                        </IndexLink>
                    </LogoContainer>

                    <MenuRight>
                        <MenuItem>
                            <a href="https://orbitcoin.io" target="_blank">
                                About us
                            </a>
                        </MenuItem>

                        <MenuItem>
                            <a href="https://t.me/orbitnetwork" target="_blank">
                                Chat
                            </a>
                        </MenuItem>

                        <MenuItem>
                            <a href="#" target="_blank">
                                Blog
                            </a>
                        </MenuItem>

                        <MenuItem>
                            <a href="#" target="_blank">
                                Reddit
                            </a>
                        </MenuItem>
                    </MenuRight>
                </NavBar>
            </NavBarContainer>
        );
    }
}
