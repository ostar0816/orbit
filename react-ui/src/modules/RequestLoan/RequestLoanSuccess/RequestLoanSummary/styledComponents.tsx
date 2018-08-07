import styled from "styled-components";
import { Label, FormGroup } from "reactstrap";
import { StyledButton } from "../../../../components";

export const Wrapper = styled.div`
    margin-top: 30px;
`;

export const StyledLabel = styled(Label)`
    text-transform: none;
    color: #002326;
    font-family: DIN;
    font-size: 17px;
    line-height: 25px;
    opacity: 1;

    @media only screen and (max-width: 823px) {
        font-size: 12px;
        line-height: 20px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
    }
`;

export const GrayContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;

export const InfoItem = styled.div`
    margin-bottom: 30px;

    @media only screen and (max-width: 823px) {
        margin-bottom: 12px;
    }
    @media only screen and (max-width: 568px) {
        margin-bottom: 10px;
    }
`;

export const Title = styled.div`
    text-transform: uppercase;
    font-family: DIN-Bold;
    opacity: 0.5;
    color: #002326;
    font-size: 15px;
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

export const Content = styled.div`
    margin-top: 5px;
    font-family: DIN-Bold;
    opacity: 1;
    color: #002326;
    font-size: 17px;
    line-height: 25px;
    word-wrap: break-word;

    @media only screen and (max-width: 823px) {
        margin-top: 4px;
        font-size: 12px;
        line-height: 20px;
    }
    @media only screen and (max-width: 568px) {
        margin-top: 2px;
        font-size: 10px;
        line-height: 18px;
    }
`;

export const SummaryJsonContainer = styled(FormGroup)`
    width: 100%;
    position: relative;
`;

export const TextareaContainer = styled.div`
    position: relative;
`;

export const StyledTextarea = styled.textarea`
    width: 100%;
    min-height: 150px;
`;

export const CopyButton = StyledButton.extend`
    position: absolute;
    right: 0;
    bottom: 6px;
    min-width: auto !important;
    border-color: #002326 !important;
    background-color: #002326 !important;

    @media only screen and (max-width: 823px) {
        padding: 2px 25px !important;
        min-width: auto !important;
    }
    @media only screen and (max-width: 568px) {
        padding: 2px 25px !important;
        min-width: auto !important;
    }
`;

export const CopiedMessage = styled.div`
    position: absolute;
    font-family: DIN-Bold;
    font-size: 15px;

    @media only screen and (max-width: 823px) {
        position: relative;
        font-size: 12px;
        margin-bottom: 4px;
    }
    @media only screen and (max-width: 568px) {
        position: relative;
        font-size: 10px;
        margin-bottom: 2px;
    }
`;
