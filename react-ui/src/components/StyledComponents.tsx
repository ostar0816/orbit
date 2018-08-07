import styled from "styled-components";
import { Button } from "reactstrap";
import { Link } from "react-router";

// styles-components
export const MainWrapper = styled.div`
    padding: 50px;
    @media only screen and (max-width: 823px) {
        padding: 40px;
    }
    @media only screen and (max-width: 568px) {
        padding: 30px;
    }
    @media only screen and (max-width: 480px) {
        padding: 15px;
    }
`;

// styles-components
export const Code = styled.code`
    margin: 30px 0px;
    font-size: 13px;
`;

export const StyledButton = styled(Button)`
    color: #ffffff !important;
    font-family: DIN;
    font-size: 15px !important;
    line-height: 40px !important;
    padding: 2px 45px !important;
    background-color: #1cc1cc !important;
    border: 1px solid #1cc1cc !important;
    border-radius: 0 !important;
    text-transform: uppercase;
    min-width: 200px !important;

    @media only screen and (max-width: 823px) {
        font-size: 12px !important;
        line-height: 24px !important;
        min-width: 150px !important;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px !important;
        line-height: 22px !important;
        min-width: 130px !important;
    }
`;

export const Wrapper30 = styled.div`
    margin: 30px 0px;
`;

export const Bold = styled.span`
    font-family: DIN-Bold;
`;

export const A = styled.a`
    font-family: DIN-Bold;
    color: #002326;
    text-decoration: none;

    &:hover {
        font-family: DIN-Bold;
        color: #002326;
        text-decoration: none;
    }
`;

export const P = styled.p`
    margin: 20px 0;
`;

export const Ol = styled.ol`
    padding-left: 0px;
`;

export const Li = styled.li`
    margin: 20px 0;
`;

export const StyledLink = styled(Link)`
    font-family: DIN-Bold;
    color: #002326;
    text-decoration: none;

    &:hover {
        font-family: DIN-Bold;
        color: #002326;
        text-decoration: none;
    }
`;
