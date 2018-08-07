import styled from "styled-components";

export const Background = styled.div``;

export const InnerContainer = styled.div`
    width: 620px;
    margin: 0px auto;
    background-color: #e8e3e3;
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.12);

    @media only screen and (max-width: 823px) {
        width: 560px;
    }
    @media only screen and (max-width: 768px) {
        width: 520px;
    }
    @media only screen and (max-width: 736px) {
        width: 490px;
    }
    @media only screen and (max-width: 667px) {
        width: 460px;
    }
    @media only screen and (max-width: 568px) {
        width: 360px;
    }
    @media only screen and (max-width: 480px) {
        margin: 0px;
        width: 100%;
        box-shadow: none;
    }
`;
