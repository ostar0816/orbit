import * as React from "react";
import { shallow } from "enzyme";
import { ParentContainer } from "../../../../src/layouts/ParentContainer";

describe("<ParentContainer />", () => {
    it("should render the component", () => {
        const wrapper = shallow(<ParentContainer />);
        expect(wrapper.length).toEqual(1);
    });
});
