import * as React from "react";
import { shallow } from "enzyme";
import { Terms } from "src/modules/Terms/Terms";

describe("<Terms />", () => {
    it("should render the component", () => {
        const props = {
            agreeToTerms: true,
            handleAgreeToTerms: jest.fn(),
        };
        const wrapper = shallow(<Terms {...props} />);
        expect(wrapper.length).toEqual(1);
    });
});
