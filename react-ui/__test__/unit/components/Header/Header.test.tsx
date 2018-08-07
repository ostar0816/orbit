import * as React from "react";
import { shallow } from "enzyme";
import { Header } from "../../../../src/components/Header";
import { Description } from "../../../../src/components/Header/styledComponents";

describe("<Header />", () => {
    let wrapper;
    const props = {
        title: "Header Title",
        description: <div>Header Description</div>,
    };

    beforeAll(() => {
        wrapper = shallow(<Header {...props} />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <Description />", () => {
        expect(wrapper.find(Description).length).toEqual(1);
    });

    it("<Description /> should have the right content", () => {
        expect(wrapper.find(Description).get(0).props.children).toBe(props.description);
    });
});
