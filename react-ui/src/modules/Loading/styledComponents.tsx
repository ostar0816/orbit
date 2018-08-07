import styled from "styled-components";

export const BrandLogo = styled.img`
    height: 48px;
    width: 48px;

    margin: 0 auto 32px;

    animation: spin 1550ms infinite cubic-bezier(0.6, 0.26, 0.63, 0.87);
    -webkit-animation: spin 1550ms infinite cubic-bezier(0.6, 0.26, 0.63, 0.87);

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }
`;

export const Content = styled.div`
    text-align: center;
    padding-top: 96px;
    min-height: 600px;
`;

export const LoadingBar = styled.div`
    width: 130px;
    height: 2px;
    margin: 0 auto;
    border-radius: 2px;
    background-color: #cfcfcf;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transform: rotateY(0);
    transition: transform 0.3s ease-in;
`;

export const LoadingAnimation = styled.div`
    height: 100%;
    width: 68px;
    position: absolute;
    -webkit-transform: translate(-34px, 0);
    background-color: #f3764b;
    border-radius: 2px;

    animation: initial-loading 1.5s infinite ease;
    -webkit-animation: initial-loading 1.5s infinite ease;

    @keyframes initial-loading {
        0%,
        100% {
            transform: translate(-34px, 0);
        }

        50% {
            transform: translate(96px, 0);
        }
    }

    @-webkit-keyframes initial-loading {
        0%,
        100% {
            -webkit-transform: translate(-34px, 0);
        }

        50% {
            -webkit-transform: translate(96px, 0);
        }
    }
`;
