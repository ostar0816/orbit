import * as React from "react";
import { shallow } from "enzyme";
import { DefaultContent } from "../../../../src/modules/DefaultContent";

describe("<DefaultContent />", () => {
    it("should render the component", () => {
        const wrapper = shallow(<DefaultContent />);
        expect(wrapper.length).toEqual(1);
    });
});
