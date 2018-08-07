import styled from "styled-components";

import { color, fontFamily, fontSize } from "../../theme";

export const StyledModalHeader = styled.div`
    color: ${color.dharmaBlue};
    font-family: ${fontFamily.title};
    font-size: ${fontSize.h1};
    letter-spacing: 0;
    line-height: 50px;
`;

export const StyledModalBody = styled.p`
    color: #002326;
    display: inline-block;
    font-family: ${fontFamily.base};
    font-size: ${fontSize.body};
    line-height: 25.5px;
`;

export const StyledModalBodyBold = styled.span`
    font-family: ${fontFamily.bold};
`;

export const StyledModalBodyBoldBlue = StyledModalBodyBold.extend`
    color: ${color.dharmaBlue};
`;

export const StyledModalBodyDetail = StyledModalBody.extend`
    font-size: ${fontSize.detail};
`;
