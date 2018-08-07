import * as React from "react";
import { shallow } from "enzyme";
import { Privacy } from "../../../../src/modules/Privacy";

describe("<Privacy />", () => {
    it("should render the component", () => {
        const wrapper = shallow(<Privacy />);
        expect(wrapper.length).toEqual(1);
    });
});
