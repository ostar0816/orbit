import styled from "styled-components";

import { color, fontSize } from "../../../../theme";

export const Wrapper = styled.div`
    width: 100%;
    position: relative;

    background: ${color.dharmaGreen};

    margin: 0;
    margin-top: 200px;

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        bottom: 100%;
        left: 0;
        border-style: solid;
        border-width: 0 0 100px 2000px;
        border-color: transparent transparent ${color.dharmaGreen};
    }
`;

export const ExplainerContent = styled.div`
    max-width: 650px;
    margin: 0 auto;

    padding: 80px 20px;

    color: ${color.white};

    p {
        font-size: ${fontSize.body};
    }

    a {
        color: ${color.dharmaOrange};
        text-decoration: underline;
    }
`;
