import * as React from "react";
import { mount } from "enzyme";
import { ScrollToTopOnMount } from "../../../src/components/ScrollToTopOnMount";

describe("<ScrollToTopOnMount />", () => {
    let wrapper;

    it("should render the component", () => {
        wrapper = mount(<ScrollToTopOnMount />);
        expect(wrapper.length).toEqual(1);
    });

    it("calls scrollTo() inside componentDidMount()", () => {
        const spy = jest.spyOn(global, "scrollTo");
        wrapper = mount(<ScrollToTopOnMount />);
        expect(spy).toHaveBeenCalled();
    });
});
