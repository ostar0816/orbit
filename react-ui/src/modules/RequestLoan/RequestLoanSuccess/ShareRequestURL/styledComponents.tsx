import * as React from "react";
import styled from "styled-components";
import { Label, Row, Col, FormGroup } from "reactstrap";
import { StyledButton } from "../../../../components";

interface Props {
    className?: string;
}

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
    @media only screen and (max-width: 480px) {
        font-size: 14px;
        line-height: 22px;
    }
`;

export const GrayRow = styled(Row)`
    padding: 20px;
    background-color: #f5f5f5;
`;

class UglyImageContainer extends React.Component<Props, {}> {
    render() {
        return (
            <Col xs="3" md="3" className={this.props.className}>
                {this.props.children}
            </Col>
        );
    }
}

export const ImageContainer = styled(UglyImageContainer)``;

export const IdenticonImage = styled.img`
    width: 100px;
    height: 100px;

    @media only screen and (max-width: 823px) {
        width: 80px;
        height: 80px;
    }
    @media only screen and (max-width: 568px) {
        width: 60px;
        height: 60px;
    }
    @media only screen and (max-width: 480px) {
        width: 50px;
        height: 50px;
    }
`;

class UglyDetailContainer extends React.Component<Props, {}> {
    render() {
        return (
            <Col xs="9" md="9" className={this.props.className}>
                {this.props.children}
            </Col>
        );
    }
}

export const DetailContainer = styled(UglyDetailContainer)``;

export const ShareButtonsContainer = styled.div`
    margin: 10px 0px 10px 10px;

    @media only screen and (max-width: 823px) {
        margin: 8px 0px 8px 8px;
    }
    @media only screen and (max-width: 568px) {
        margin: 5px 0px 5px 5px;
    }
    @media only screen and (max-width: 480px) {
        margin: 0 0 2px 0;
    }
`;

export const ShareButton = styled.div`
    display: inline;
    margin: 0 10px;
    cursor: pointer;

    > img {
        width: 35px;
    }

    @media only screen and (max-width: 823px) {
        margin: 0 8px;
        > img {
            width: 25px;
        }
    }
    @media only screen and (max-width: 568px) {
        margin: 0 5px;
        > img {
            width: 20px;
        }
    }
`;

export const StyledFormGroup = styled(FormGroup)`
    margin-left: 10px;
    margin-bottom: 0px !important;

    @media only screen and (max-width: 480px) {
        margin-left: 0;
    }
`;

class UglyInputContainer extends React.Component<Props, {}> {
    render() {
        return (
            <Col xs="8" md="8" className={this.props.className}>
                {this.props.children}
            </Col>
        );
    }
}

export const InputContainer = styled(UglyInputContainer)``;

export const RequestInput = styled.input`
    cursor: pointer;
    height: 46px !important;
    font-size: 17px !important;
    font-family: DIN-Bold;
    width: 95% !important;

    @media only screen and (max-width: 823px) {
        height: 31px !important;
        font-size: 12px !important;
    }
    @media only screen and (max-width: 568px) {
        height: 29px !important;
        font-size: 10px !important;
    }
`;

class UglyButtonContainer extends React.Component<Props, {}> {
    render() {
        return (
            <Col xs="4" md="4" className={this.props.className}>
                {this.props.children}
            </Col>
        );
    }
}

export const ButtonContainer = styled(UglyButtonContainer)``;

export const CopyButton = StyledButton.extend`
    min-width: auto !important;
    width: 100% !important;
    padding: 2px 10px !important;

    @media only screen and (max-width: 823px) {
        min-width: auto !important;
    }
    @media only screen and (max-width: 568px) {
        min-width: auto !important;
    }
`;

export const CopiedMessage = styled.div`
    font-family: DIN-Bold;
    font-size: 15px;

    @media only screen and (max-width: 823px) {
        font-size: 12px;
        margin-bottom: 4px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        margin-bottom: 2px;
    }
`;
