import styled from "styled-components";
import { Col } from "reactstrap";

import { color } from "../../theme";

export const Wrapper = styled.div`
    margin-bottom: 20px;
    background-color: #ffffff;
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
`;

const PaddedCol = styled(Col)`
    padding: 7px !important;
`;

export const Heading = PaddedCol.extend`
    background-color: #082c30;
    font-size: 13px;
    color: #ffffff;
    text-transform: uppercase;
`;

export const Content = PaddedCol.extend`
    font-size: 14px;
`;

export const Drawer = styled.div`
    background-color: ${color.lightGray};
`;
