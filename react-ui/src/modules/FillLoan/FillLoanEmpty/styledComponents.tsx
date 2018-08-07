import styled from "styled-components";
import { Link } from "react-router";

export const Instructions = styled.div`
    margin-top: 50px;
`;

export const Title = styled.div``;

export const StyledLink = styled(Link)`
    font-family: DIN-Bold;
    color: #002326;
    font-size: 15px;
    margin: 10px 0;
    display: block;

    @media only screen and (max-width: 823px) {
        font-size: 12px;
        line-height: 20px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
    }
`;
