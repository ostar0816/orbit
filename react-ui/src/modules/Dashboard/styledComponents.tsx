import styled from "styled-components";
import { NavItem } from "reactstrap";

export const Wrapper = styled.div`
    padding-bottom: 80px;
    @media only screen and (max-width: 480px) {
        padding-bottom: 20px;
    }
`;

export const StyledNavItem = styled(NavItem)`
    @media only screen and (max-width: 480px) {
        width: 50%;
    }
`;

export const TitleFirstWord = styled.span`
    display: inline-block;
    margin-right: 5px;

    @media only screen and (max-width: 480px) {
        display: none;
    }
`;

export const TitleRest = styled.span``;
