import styled from "styled-components";
import { Label } from "reactstrap";

export const Checkmark = styled.span`
    position: absolute;
    top: 4px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #eee;

    &::after {
        content: "";
        position: absolute;
        display: none;
    }

    @media only screen and (max-width: 823px) {
        height: 12px;
        width: 12px;
        top: 5px;
    }
    @media only screen and (max-width: 568px) {
        height: 10px;
        width: 10px;
        top: 7px;
    }
`;

export const CheckboxLabel = styled(Label)`
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    cursor: pointer;
    font-family: DIN;
    font-size: 17px;
    text-transform: none;
    color: #002326;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    opacity: 1;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    &:hover input ~ ${Checkmark} {
        background-color: #ccc;
    }

    input:checked ~ ${Checkmark} {
        background-color: #1cc1cc;
    }

    input:checked ~ ${Checkmark}:after {
        display: block;
    }

    ${Checkmark}:after {
        left: 5px;
        top: 1px;
        width: 8px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    @media only screen and (max-width: 823px) {
        padding-left: 20px;
        margin-bottom: 5px;
        font-size: 12px;

        ${Checkmark}:after {
            left: 4px;
            top: 1px;
            width: 5px;
            height: 7px;
            border-width: 0 1px 1px 0;
        }
    }
    @media only screen and (max-width: 568px) {
        padding-left: 15px;
        margin-bottom: 5px;
        font-size: 10px;

        ${Checkmark}:after {
            left: 3px;
            top: 1px;
            width: 4px;
            height: 6px;
            border-width: 0 1px 1px 0;
        }
    }
`;
