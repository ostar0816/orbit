import styled from "styled-components";
import { Alert } from "reactstrap";

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    z-index: 10;
    width: inherit;
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

    &.alert:empty {
        display: none;
    }

    &.alert-danger {
        color: #002326;
        background-color: #e93d59;
    }

    &.alert-success {
        color: #002326;
        background-color: #1cc1cc;
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
