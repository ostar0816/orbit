import * as React from "react";
import styled from "styled-components";
import { Col } from "reactstrap";
import { StyledLink, StyledButton, A } from "../../../../components";
import { Link } from "react-router";

import { color } from "../../../../theme";

interface Props {
    className?: string;
}

export const Wrapper = styled.div`
    margin-bottom: 20px;
    background-color: #ffffff;
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
`;

class UglyImageContainer extends React.Component<Props, {}> {
    render() {
        return (
            <Col className={this.props.className} xs="3" sm="1" md="1">
                {this.props.children}
            </Col>
        );
    }
}

export const ImageContainer = styled(UglyImageContainer)`
    padding: 15px 0 15px 15px !important;

    @media only screen and (max-width: 823px) {
        padding: 10px 0 10px 10px !important;
    }
    @media only screen and (max-width: 568px) {
        padding: 10px 0 10px 10px !important;
    }
`;

export const IdenticonImage = styled.img`
    width: 60px;
    height: 60px;

    @media only screen and (max-width: 823px) {
        width: 40px;
        height: 40px;
    }
    @media only screen and (max-width: 568px) {
        width: 80px;
        height: 80px;
    }
    @media only screen and (max-width: 480px) {
        width: 60px;
        height: 60px;
    }
`;

class UglyDetailContainer extends React.Component<Props, {}> {
    render() {
        return (
            <Col className={this.props.className} xs="9" sm="5" md="5">
                {this.props.children}
            </Col>
        );
    }
}

export const DetailContainer = styled(UglyDetailContainer)`
    padding: 15px !important;

    @media only screen and (max-width: 823px) {
        padding: 10px !important;
    }
    @media only screen and (max-width: 568px) {
        padding: 10px !important;
    }
`;

export const Amount = styled.div`
    color: #002326;
    font-family: DIN-Bold;
    font-size: 17px;
    line-height: 25px;

    @media only screen and (max-width: 823px) {
        font-size: 14px;
        line-height: 22px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 14px;
        line-height: 22px;
    }
`;

export const Url = styled.div`
    color: #002326;
    font-size: 15px;
    line-height: 25px;

    @media only screen and (max-width: 823px) {
        font-size: 10px;
        line-height: 18px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
    }
`;

export const StatusActive = styled.div`
    display: inline-block;
    color: #ffffff;
    font-size: 12px;
    letter-spacing: 1px;
    line-height: 16px;
    border-radius: 12.5px;
    background-color: #1cc1cc;
    text-transform: uppercase;
    padding: 2px 10px;
    margin-right: 10px;

    @media only screen and (max-width: 823px) {
        font-size: 8px;
        line-height: 12px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 8px;
        line-height: 12px;
    }
`;

export const StatusPending = StatusActive.extend`
    background-color: #e93d59;
`;

export const Terms = styled.div`
    display: inline-block;
    font-family: DIN-Bold;
    font-size: 13px;
    line-height: 16px;
    text-transform: uppercase;

    @media only screen and (max-width: 823px) {
        font-size: 8px;
        line-height: 16px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 8px;
        line-height: 16px;
    }
`;

class HalfCol extends React.Component<Props, {}> {
    render() {
        return (
            <Col className={this.props.className} xs="12" sm="6" md="6">
                {this.props.children}
            </Col>
        );
    }
}
export { HalfCol };

export const RepaymentScheduleContainer = styled(HalfCol)`
    padding: 15px 30px !important;
    background-color: #082c30;
    color: #ffffff;
    display: none;

    &.active {
        display: block;
    }

    @media only screen and (max-width: 823px) {
        padding: 10px !important;
    }
    @media only screen and (max-width: 568px) {
        padding: 10px !important;
    }
`;

export const PendingActionContainer = RepaymentScheduleContainer.extend`
    background-color: #ffffff;
    display: block;

    @media only screen and (max-width: 568px) {
        float: none;
        padding-top: 0px !important;
        text-align: center;
    }
`;

export const Title = styled.div`
    color: #ffffff;
    font-size: 13px;
    line-height: 25px;
    text-transform: uppercase;

    @media only screen and (max-width: 823px) {
        font-size: 10px;
        line-height: 18px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
    }
`;

export const Strikethrough = styled.div`
    position: relative;
    display: inline-block;
    opacity: 0.5;

    &::before {
        content: " ";
        position: absolute;
        top: -4px;
        left: 0;
        border-bottom: 1px solid #ffffff;
        width: 65px;
    }

    @media only screen and (max-width: 1024px) {
        &::before {
            top: -3px;
            width: 50px;
        }
    }
    @media only screen and (max-width: 823px) {
        &::before {
            top: -3px;
            width: 43px;
        }
    }
    @media only screen and (max-width: 768px) {
        &::before {
            top: -3px;
            width: 38px;
        }
    }
    @media only screen and (max-width: 736px) {
        &::before {
            top: -3px;
            width: 35px;
        }
    }
    @media only screen and (max-width: 667px) {
        &::before {
            top: -3px;
            width: 32px;
        }
    }
    @media only screen and (max-width: 640px) {
        &::before {
            top: -3px;
            width: 30px;
        }
    }
    @media only screen and (max-width: 568px) {
        &::before {
            top: -3px;
            width: 63px;
        }
    }
    @media only screen and (max-width: 480px) {
        &::before {
            top: -3px;
            width: 44px;
        }
    }
`;

export const Schedule = styled.div`
    display: inline-block;
    width: 80px;
    opacity: 0.5;

    &:last-child > ${Strikethrough} {
        opacity: 0;
    }

    &.active {
        opacity: 1;
    }

    @media only screen and (max-width: 1024px) {
        width: 59px;
    }
    @media only screen and (max-width: 823px) {
        width: 53px;
    }
    @media only screen and (max-width: 768px) {
        width: 48px;
    }
    @media only screen and (max-width: 736px) {
        width: 45px;
    }
    @media only screen and (max-width: 667px) {
        width: 42px;
    }
    @media only screen and (max-width: 640px) {
        width: 40px;
    }
    @media only screen and (max-width: 568px) {
        width: 73px;
    }
    @media only screen and (max-width: 480px) {
        width: 54px;
    }
`;

export const ScheduleIconContainer = styled.div`
    display: inline-block;
    &:last-child {
        opacity: 0;
    }
`;

export const PaymentDate = styled.div`
    color: #ffffff;
    font-size: 13px;
    line-height: 25px;

    @media only screen and (max-width: 1024px) {
        font-size: 10px;
        line-height: 18px;
    }
    @media only screen and (max-width: 823px) {
        font-size: 8px;
        line-height: 16px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 8px;
        line-height: 16px;
    }
`;

export const ShowMore = PaymentDate.extend`
    text-transform: uppercase;
`;

export const Drawer = styled.div`
    padding: 20px;
    background-color: ${color.lightGray};

    @media only screen and (max-width: 823px) {
        padding: 12px;
    }
    @media only screen and (max-width: 568px) {
        padding: 10px;
    }
`;

export const InfoItem = styled.div`
    @media only screen and (max-width: 823px) {
        margin-bottom: 5px;
    }
    @media only screen and (max-width: 568px) {
        margin-bottom: 5px;
    }
`;

export const InfoItemTitle = styled.div`
    text-transform: uppercase;
    font-family: DIN-Bold;
    opacity: 0.5;
    color: #002326;
    font-size: 13px;
    line-height: 20px;

    @media only screen and (max-width: 823px) {
        font-size: 12px;
        line-height: 20px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 10px;
        line-height: 18px;
    }
`;

export const InfoItemContent = styled.div`
    margin-top: 5px;
    font-family: DIN-Bold;
    opacity: 1;
    color: #002326;
    font-size: 13px;
    line-height: 20px;
    word-wrap: break-word;

    @media only screen and (max-width: 823px) {
        margin-top: 2px;
        font-size: 10px;
        line-height: 18px;
    }
    @media only screen and (max-width: 568px) {
        margin-top: 2px;
        font-size: 10px;
        line-height: 18px;
    }
`;

export const DetailLink = StyledLink.extend`
    font-family: DIN;
    &:hover {
        font-family: DIN;
    }
`;

export const ActionButton = StyledButton.extend`
    background-color: #e93d59 !important;
    font-size: 13px !important;
    border-color: #e93d59 !important;
    min-width: auto !important;
    padding: 0px 15px !important;
    float: right;
    line-height: 36px !important;

    @media only screen and (max-width: 823px) {
        margin-top: 5px;
        padding: 4px 14px !important;
        font-size: 10px !important;
        line-height: 14px !important;
        min-width: auto !important;
    }
    @media only screen and (max-width: 736px) {
        margin-top: 5px;
        padding: 2px 12px !important;
        font-size: 8px !important;
        line-height: 12px !important;
        min-width: auto !important;
    }
    @media only screen and (max-width: 568px) {
        margin-top: 5px;
        padding: 4px 14px !important;
        font-size: 10px !important;
        line-height: 14px !important;
        min-width: auto !important;
    }
    @media only screen and (max-width: 480px) {
        padding: 3px 12px !important;
        font-size: 8px !important;
        line-height: 12px !important;
    }
`;

export const CancelButton = ActionButton.extend`
    border-color: #e93d59 !important;

    @media only screen and (max-width: 568px) {
        font-size: 10px !important;
        width: 100%;
    }
`;

export const ShareButton = styled(Link)`
    background-color: #e93d59 !important;
    font-size: 13px !important;
    border-color: #e93d59 !important;
    min-width: auto !important;
    padding: 0px 15px !important;
    float: right;
    line-height: 38px !important;
    margin-right: 10px;
    color: #ffffff !important;
    font-family: DIN;
    border-radius: 0 !important;
    text-transform: uppercase;
    text-align: center;

    &:hover {
        text-decoration: none;
    }

    @media only screen and (max-width: 823px) {
        margin-top: 5px;
        padding: 5px 14px !important;
        font-size: 10px !important;
        line-height: 14px !important;
        min-width: auto !important;
    }
    @media only screen and (max-width: 736px) {
        margin-top: 5px;
        padding: 3px 12px !important;
        font-size: 8px !important;
        line-height: 12px !important;
        min-width: auto !important;
    }
    @media only screen and (max-width: 568px) {
        padding: 3px 12px !important;
        font-size: 10px !important;
        line-height: 12px !important;
        margin-right: 0px;
        margin-bottom: 5px;
        width: 100%;
    }
`;

export const BitlyLink = A.extend``;
