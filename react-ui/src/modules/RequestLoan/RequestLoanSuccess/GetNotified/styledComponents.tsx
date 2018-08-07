import styled from "styled-components";
import { Label, Row, Input } from "reactstrap";
import { StyledButton } from "../../../../components";

export const StyledLabel = styled(Label)`
    text-transform: none;
    color: #002326;
    font-family: DIN;
    font-size: 17px;
    line-height: 25px;
    opacity: 1;
`;

export const StyledRow = styled(Row)`
    padding: 20px;
    background-color: #f5f5f5;
`;

export const EmailInput = styled(Input)`
    height: 46px;
    font-size: 17px;
    width: 95% !important;

    @media only screen and (max-width: 480px) {
        width: 100% !important;
        margin-bottom: 20px;
    }
`;

export const NotifiedButton = StyledButton.extend`
    min-width: auto !important;
    width: 100% !important;
    padding: 2px 0 !important;
`;
