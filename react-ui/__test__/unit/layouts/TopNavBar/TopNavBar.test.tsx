import * as React from "react";
import { shallow } from "enzyme";
import { IndexLink } from "react-router";
import TopNavBar from "../../../../src/layouts/TopNavBar";
import {
    BrandLogo,
    StyledNavbarToggler,
    StyledLink,
} from "../../../../src/layouts/TopNavBar/styledComponents";
import { TradingPermissionsContainer } from "../../../../src/components";

describe("<TopNavBar />", () => {
    let wrapper;
    const props = {
        linkItems: [{ url: "/someurl", display: "Some Url" }],
    };

    beforeEach(() => {
        wrapper = shallow(<TopNavBar {...props} />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it('should have an <IndexLink /> to "/"', () => {
        expect(wrapper.find(IndexLink).length).toEqual(1);
        expect(wrapper.find(IndexLink).prop("to")).toEqual("/");
    });

    it("should render a <StyledNavbarToggler />", () => {
        expect(wrapper.find(StyledNavbarToggler).length).toEqual(1);
    });

    it("should isOpen state if <StyledNavbarToggler /> is clicked", () => {
        const isOpenState = wrapper.state("isOpen");
        const spy = jest.spyOn(TopNavBar.prototype, "setState");
        wrapper.find(StyledNavbarToggler).simulate("click");
        expect(spy).toHaveBeenCalledWith({ isOpen: !isOpenState });
    });

    it("should render a <StyledLink />", () => {
        expect(wrapper.find(StyledLink).length).toEqual(1);
    });

    it("<StyledLink /> should render the correct url", () => {
        expect(
            wrapper
                .find(StyledLink)
                .first()
                .prop("to"),
        ).toEqual("/someurl");
    });

    it("<StyledLink /> should render the correct title", () => {
        expect(wrapper.find(StyledLink).get(0).props.children).toEqual("Some Url");
    });

    it("should render a <TradingPermissionsContainer />", () => {
        expect(wrapper.find(TradingPermissionsContainer).length).toEqual(1);
    });
});
