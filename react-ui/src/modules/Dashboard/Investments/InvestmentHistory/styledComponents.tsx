import styled from "styled-components";
import { Row } from "reactstrap";

import { color } from "../../../../theme";

export const Wrapper = styled.div`
    margin-top: 80px;

    @media only screen and (max-width: 823px) {
        margin-top: 20px;
    }
    @media only screen and (max-width: 568px) {
        margin-top: 20px;
    }
`;

export const Title = styled.div`
    color: #002326;
    font-size: 17px;
    line-height: 25px;
    margin-bottom: 20px;

    @media only screen and (max-width: 823px) {
        font-size: 10px;
        line-height: 18px;
        margin-bottom: 10px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
        margin-bottom: 10px;
    }
`;

export const TableHeaderRow = styled(Row)`
    text-transform: uppercase;
    border-bottom: 4px solid #dddddd;
    opacity: 0.5;
    color: #002326;
    font-family: DIN-Bold;
    font-size: 15px;
    line-height: 25px;
    padding-bottom: 8px;

    @media only screen and (max-width: 823px) {
        font-size: 10px;
        line-height: 18px;
        padding-bottom: 4px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
        padding-bottom: 4px;
    }
`;

export const StyledRow = styled(Row)`
    color: #002326;
    font-family: DIN;
    font-size: 17px;
    line-height: 25px;
    padding: 15px 0px;
    cursor: pointer;

    @media only screen and (max-width: 823px) {
        font-size: 8px;
        padding: 4px 0px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 8px;
        padding: 4px 0px;
    }
`;

export const Drawer = styled.div`
    padding: 20px;
    background-color: ${color.lightGray};

    @media only screen and (max-width: 823px) {
        padding: 10px;
    }
    @media only screen and (max-width: 568px) {
        padding: 10px;
    }
`;

export const InfoItem = styled.div`
    @media only screen and (max-width: 823px) {
        margin-bottom: 5px;
    }
    @media only screen and (max-width: 568px) {
        margin-bottom: 5px;
    }
`;

export const InfoItemTitle = styled.div`
    text-transform: uppercase;
    font-family: DIN-Bold;
    opacity: 0.5;
    color: #002326;
    font-size: 13px;
    line-height: 20px;

    @media only screen and (max-width: 823px) {
        font-size: 10px;
        line-height: 18px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
    }
`;

export const InfoItemContent = styled.div`
    margin-top: 5px;
    font-family: DIN-Bold;
    opacity: 1;
    color: #002326;
    font-size: 13px;
    line-height: 20px;
    word-wrap: break-word;

    @media only screen and (max-width: 823px) {
        margin-top: 2px;
        font-size: 10px;
        line-height: 18px;
    }
    @media only screen and (max-width: 568px) {
        margin-top: 2px;
        font-size: 10px;
        line-height: 18px;
    }
`;
