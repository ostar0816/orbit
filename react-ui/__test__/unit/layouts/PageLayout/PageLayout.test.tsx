// External Libraries
import * as React from "react";
import { shallow } from "enzyme";

// Layouts
import { PageLayout } from "../../../../src/layouts/PageLayout";
import LeftNavBar from "../../../../src/layouts/LeftNavBar";

// Styled Components
import {
    Drawer,
    Main,
    Footer,
    FooterLink,
} from "../../../../src/layouts/PageLayout/styledComponents";

describe("<PageLayout />", () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallow(<PageLayout />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <Drawer />", () => {
        expect(wrapper.find(Drawer).length).toEqual(1);
    });

    it("should render a <LeftNavBar /> inside <Drawer />", () => {
        expect(wrapper.find(Drawer).find(LeftNavBar).length).toEqual(1);
    });

    it("should render a <Main />", () => {
        expect(wrapper.find(Main).length).toEqual(1);
    });

    it("should render a <Footer /> inside <Main />", () => {
        expect(wrapper.find(Main).find(Footer).length).toEqual(1);
    });

    it("should render 2 <FooterLink /> inside <Footer />", () => {
        expect(
            wrapper
                .find(Main)
                .find(Footer)
                .find(FooterLink).length,
        ).toEqual(2);
    });
});
