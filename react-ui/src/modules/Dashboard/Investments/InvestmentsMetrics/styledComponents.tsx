import * as React from "react";
import styled from "styled-components";
import { Row, Col } from "reactstrap";

interface Props {
    className?: string;
}

export const Wrapper = styled(Row)`
    margin-bottom: 20px;

    @media only screen and (max-width: 823px) {
        margin-bottom: 12px;
    }
    @media only screen and (max-width: 568px) {
        margin-bottom: 10px;
    }
`;

class UglyHalfCol extends React.Component<Props, {}> {
    render() {
        return (
            <Col className={this.props.className} xs="6" md="6">
                {this.props.children}
            </Col>
        );
    }
}

export const HalfCol = styled(UglyHalfCol)``;

export const Value = styled.div`
    color: #002326;
    font-family: DIN-Bold;
    font-size: 17px;
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

export const TokenWrapper = styled.span`
    &:first-child {
        border-right: 1px solid #002326;
        padding-right: 10px;
    }
    &:last-child {
        border-right: 0;
        padding-left: 10px;
    }
    &:first-child:last-child {
        border-right: 0;
        padding: 0 0 0 0;
    }
    &:not(:first-child):not(:last-child) {
        border-right: 1px solid #002326;
        padding: 0 10px;
    }
    @media only screen and (max-width: 823px) {
        &:first-child {
            padding-right: 6px;
        }
        &:last-child {
            padding-left: 6px;
        }
        &:not(:first-child):not(:last-child) {
            padding: 0 6px;
        }
    }
    @media only screen and (max-width: 568px) {
        &:first-child {
            padding-right: 4px;
        }
        &:last-child {
            padding-left: 4px;
        }
        &:not(:first-child):not(:last-child) {
            padding: 0 4px;
        }
    }
`;

export const Label = Value.extend`
    opacity: 0.5;
    text-transform: uppercase;
`;
