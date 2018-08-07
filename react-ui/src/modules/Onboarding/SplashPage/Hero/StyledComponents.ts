import styled from "styled-components";

import { color, fontFamily } from "../../../../theme";

export const Wrapper = styled.div`
    position: relative;
`;

export const Header = styled.div`
    position: relative;
    width: 100%;
`;

export const Slash = styled.img`
    transition: opacity 1s;
    transition-delay: 0.3s;
    position: absolute;
    bottom: -20px;
    width: 32px;
    height: 8px;
`;

export const Title = styled.div`
    font-family: ${fontFamily.light};
    font-size: 40px;
    margin-bottom: 30px;
    color: ${color.dharmaBlue};

    @media (max-width: 700px) {
        font-size: 30px;
    }
`;

export const SubTitle = styled.div`
    transition: opacity 1s;
    transition-delay: 0.3s;
    font-family: ${fontFamily.bold};
    color: ${color.dharmaGreen};
    font-size: 40px;
    margin-bottom: 40px;
    line-height: 50px;

    @media (max-width: 700px) {
        font-size: 30px;
        line-height: 36px;
        margin-bottom: 30px;
    }
`;

export const Description = styled.div`
    transition: opacity 1s;
    transition-delay: 0.5s;
    font-family: "Din Regular";
    font-size: 17px;
    margin: 20px 0;
    line-height: 25.5px;
    color: ${color.dharmaGreen};
`;

export const Button = styled.div`
    display: block;
    font-family: "Din Bold";
    font-size: 15px;
    text-align: center;
    text-transform: uppercase;
    padding: 15px;
    color: ${color.white};
    background: ${color.dharmaGreen};
    margin-right: 5px;
    margin-top: 20px;
    transition: color 0.5s, background 0.5s, border 0.5s;
    width: 300px;

    &:hover {
        cursor: pointer;
    }
`;

export const BlocksBetweenContainer = styled.div`
    transition: opacity 1s;
    transition-delay: 0.5s;
    justify-content: space-between;

    @media (max-width: 600px) {
        flex-wrap: wrap;
    }
`;

export const HeroContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    max-width: 1200px;

    margin: 12px auto 80px auto;

    @media (max-width: 600px) {
        margin: 40px auto 0 auto;
    }
`;

export const HeroDescription = styled.div`
    width: 50%;
    padding-right: 80px;

    @media (max-width: 600px) {
        width: 100%;
        padding: 20px;
    }
`;

export const HeroImage = styled.div`
    width: 50%;

    width: 300px;
    margin: 0 auto;

    img {
        width: 150%;
    }

    @media (max-width: 600px) {
        display: none;
    }
`;
