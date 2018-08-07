import styled from "styled-components";

export const ScheduleIconImage = styled.img`
    width: 15px;

    @media only screen and (max-width: 1024px) {
        width: 10px;
    }
    @media only screen and (max-width: 568px) {
        width: 10px;
    }
`;

export const ScheduleIconDiv = styled.div`
    background-color: rgb(233, 61, 89);
    color: #082c30;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    line-height: 12px;
    vertical-align: middle;
    text-align: center;
    margin-left: 1px;
    font-family: sans-serif;
    font-size: 14px;
    padding-top: 1px;

    @media only screen and (max-width: 1024px) {
        width: 12px;
        height: 12px;
        font-size: 8px;
        padding-top: 0px;
        margin-right: -1px;
    }
    @media only screen and (max-width: 568px) {
        width: 12px;
        height: 12px;
        font-size: 8px;
        padding-top: 0px;
        margin-right: -1px;
    }
`;
