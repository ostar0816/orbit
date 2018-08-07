import * as React from "react";
import { shallow } from "enzyme";
import { CustomCheckbox } from "../../../../../src/components/Form/JSONSchemaForm/CustomCheckbox";
import {
    CheckboxLabel,
    Checkmark,
} from "../../../../../src/components/Form/JSONSchemaForm/styledComponents";

describe("<CustomCheckbox />", () => {
    let wrapper;
    const props = {
        schema: {
            title: "Some title",
        },
        required: true,
        onChange: jest.fn(),
        value: false,
    };

    beforeAll(() => {
        wrapper = shallow(<CustomCheckbox {...props} />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <CheckboxLabel />", () => {
        expect(wrapper.find(CheckboxLabel).length).toEqual(1);
    });

    it("<CheckboxLabel> should have an <input /> component and one <Checkmark />", () => {
        expect(wrapper.find(CheckboxLabel).find("input").length).toEqual(1);
        expect(wrapper.find(CheckboxLabel).find(Checkmark).length).toEqual(1);
    });

    it("<input /> should have type checkbox", () => {
        expect(
            wrapper
                .find(CheckboxLabel)
                .find("input")
                .prop("type"),
        ).toEqual("checkbox");
    });

    it("should have * inside <CheckboxLabel /> when field is required", () => {
        expect(
            wrapper
                .find(CheckboxLabel)
                .find("span")
                .get(0).props.children[2],
        ).toEqual("*");
    });

    it("should not have * inside <CheckboxLabel /> when field is not required", () => {
        wrapper.setProps({ required: false });
        expect(
            wrapper
                .find(CheckboxLabel)
                .find("span")
                .get(0).props.children[2],
        ).toBeNull();
    });

    it("calls onChange prop when the input is changed", () => {
        wrapper
            .find(CheckboxLabel)
            .find("input")
            .simulate("change", { currentTarget: { checked: false } });
        expect(props.onChange.mock.calls.length).toBe(1);
    });
});
