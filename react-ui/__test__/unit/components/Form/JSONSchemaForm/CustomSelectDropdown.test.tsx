import * as React from "react";
import { shallow } from "enzyme";
import { CustomSelectDropdown } from "src/components/Form/JSONSchemaForm/CustomSelectDropdown";
import { PressEnter } from "src/components/Form/JSONSchemaForm/PressEnter";
import Select from "react-select";

describe("<CustomSelectDropdown />", () => {
    let wrapper;
    const props = {
        options: {
            enumOptions: [
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
            ],
            pressEnter: true,
        },
        value: "option1",
        onChange: jest.fn(),
    };

    beforeEach(() => {
        wrapper = shallow(<CustomSelectDropdown {...props} />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <Select /> component", () => {
        expect(wrapper.find(Select).length).toEqual(1);
    });

    it("should not render a <PressEnter /> component when options.pressEnter is false", () => {
        let newOptions = props.options;
        newOptions.pressEnter = false;
        wrapper.setProps({ options: newOptions });
        expect(wrapper.find(PressEnter).length).toEqual(0);
    });

    it("should render a <PressEnter /> component when options.pressEnter is undefined", () => {
        let newOptions = props.options;
        newOptions.pressEnter = undefined;
        wrapper.setProps({ options: newOptions });
        expect(wrapper.find(PressEnter).length).toEqual(1);
    });

    it("calls onChange prop when Select is changed", () => {
        wrapper.find(Select).simulate("change", { target: { value: "option2" } });
        expect(props.onChange.mock.calls.length).toBe(1);
    });
});
