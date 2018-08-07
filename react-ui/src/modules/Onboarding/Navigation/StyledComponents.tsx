import styled from "styled-components";

import { color } from "../../../theme";

export const NavBarContainer = styled.div`
    width: 100%;
`;

export const NavBar = styled.div`
    padding: 30px 20px;
    max-width: 1200px;
    margin: 0 auto;

    display: flex;

    @media (max-width: 600px) {
        display: block;
    }
`;

export const LogoContainer = styled.div`
    @media (max-width: 600px) {
        padding-bottom: 20px;
    }
`;

export const BrandLogo = styled.img`
    width: 35px;
`;

export const MenuRight = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-left: 20px;
`;

export const MenuItem = styled.div`
    display: inline-block;
    margin: 0 20px;

    a {
        color: ${color.dharmaBlue};

        &:hover {
            color: ${color.dharmaGreen};
        }
    }
`;
