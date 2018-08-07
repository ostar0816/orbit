import styled from "styled-components";
import { Alert } from "reactstrap";

export const Wrapper = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: inherit;

    @media only screen and (max-width: 769px) {
        left: 0;
        right: 0;
    }
`;

export const StyledAlert = styled(Alert)`
    font-family: DIN-Bold;
    font-size: 17px;
    text-align: center;

    &.alert {
        border: none;
        border-radius: 0;
        margin-bottom: 0px;
    }

    &.alert-info {
        color: #002326;
        background-color: #f27550;
    }

    & > .close {
        text-shadow: none;
    }

    @media only screen and (max-width: 568px) {
        &.alert {
            font-size: 12px;
        }
        & > .close {
            font-size: 15px;
        }
    }
`;
