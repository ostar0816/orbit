import styled from "styled-components";
import { StyledButton } from "../../../components";
import { Link } from "react-router";
import { fontSize } from "../../../theme";

export const BannerContainer = styled.div`
    @media only screen and (max-width: 823px) {
        height: 140px;
    }
    @media only screen and (max-width: 568px) {
        height: 120px;
    }
    @media only screen and (max-width: 480px) {
        display: none;
    }
`;

export const Header = styled.div`
    color: #002326;
    font-family: Arial;
    font-size: ${fontSize.h1};
    line-height: 50px;

    @media only screen and (max-width: 823px) {
        font-size: 28px;
        line-height: 33px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 20px;
        line-height: 25px;
    }
    @media only screen and (max-width: 480px) {
        width: 100%;
    }
`;

export const Description = styled.div`
    color: #002326;
    font-family: DIN;
    font-size: 17px;
    line-height: 25px;
    margin: 20px 0;

    @media only screen and (max-width: 823px) {
        font-size: 12px;
        line-height: 20px;
        margin: 12px 0;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
        margin: 10px 0;
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 30px;
`;

export const SkipButton = styled(StyledButton)`
    width: 49%;
    margin-right: 1%;
    background-color: #ffffff !important;
    color: #002326 !important;
    font-family: DIN-Bold !important;
    border: 0 !important;

    @media only screen and (max-width: 480px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const NextButton = styled(StyledButton)`
    @media only screen and (max-width: 480px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const StyledLink = styled(Link)`
    color: #002326;
    font-family: DIN-Bold;
    font-size: 17px;
    line-height: 25px;

    @media only screen and (max-width: 823px) {
        font-size: 12px;
        line-height: 20px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
    }
`;
