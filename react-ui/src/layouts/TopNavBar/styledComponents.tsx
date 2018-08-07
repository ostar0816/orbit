import styled from "styled-components";
import { NavbarToggler, NavItem, Nav } from "reactstrap";
import { Link } from "react-router";

export const Wrapper = styled.div`
    background-color: #0d3034;
    position: fixed;
    width: 100%;
    z-index: 1;
    /* remove display:none if we want the topnavbar again */
    display: none;

    @media only screen and (max-width: 480px) {
        background-color: #002326;
        position: relative;
        width: 100%;
        z-index: 1;
        display: block;
    }
`;

export const BrandLogo = styled.img`
    width: 35px;
    position: absolute;
    top: 38px;
    left: 88px;
    z-index: 1;

    @media only screen and (max-width: 480px) {
        width: 30px;
        position: initial;
        top: auto;
        left: auto;
    }
`;

export const StyledNavbarToggler = styled(NavbarToggler)`
	border: 0 !important;

	& > .navbar-toggler-icon {
		background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E") !important;
		width: 40px;
		height: 25px;
	}
}
`;

export const StyledNavItem = styled(NavItem)`
    padding: 7px 0px 7px 20px;
    &:first-child,
    &:nth-child(2) {
        margin-right: 40px;
    }

    @media only screen and (max-width: 480px) {
        padding: 0px;

        &:first-child,
        &:nth-child(2) {
            margin-right: 0px;
        }
    }
`;

export const StyledLink = styled(Link)`
    font-size: 15px;
    color: #ffffff;
    transition: color 0.3s ease-in-out;
    opacity: 0.5;

    &:hover,
    &.active {
        text-decoration: none;
        color: #f3764b;
        opacity: 1;
    }

    @media only screen and (max-width: 480px) {
        font-size: 10px;
    }
`;

export const StyledNav = styled(Nav)`
    margin: 10px 0 20px !important;
`;
