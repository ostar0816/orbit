import * as React from "react";
import { shallow } from "enzyme";
import { CustomTextarea } from "src/components/Form/JSONSchemaForm/CustomTextarea";
import { PressEnter } from "src/components/Form/JSONSchemaForm/PressEnter";

describe("<CustomTextarea />", () => {
    let wrapper;
    const props = {
        id: "textarea-id",
        placeholder: "Some placeholder",
        required: true,
        disabled: false,
        readonly: false,
        value: "",
        options: {
            pressEnter: true,
            rows: 3,
        },
        onChange: jest.fn(),
    };

    beforeEach(() => {
        wrapper = shallow(<CustomTextarea {...props} />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render an <textarea /> component", () => {
        expect(wrapper.find("textarea").length).toEqual(1);
    });

    it("should render the correct id", () => {
        expect(wrapper.find("textarea").prop("id")).toBe(props.id);
    });

    it("should render the correct placeholder", () => {
        expect(wrapper.find("textarea").prop("placeholder")).toBe(props.placeholder);
    });

    it("should have the correct required attr", () => {
        expect(wrapper.find("textarea").prop("required")).toBe(props.required);
    });

    it("should have the correct disabled attr", () => {
        expect(wrapper.find("textarea").prop("disabled")).toBe(props.disabled);
    });

    it("should have the correct readOnly attr", () => {
        expect(wrapper.find("textarea").prop("readOnly")).toBe(props.readonly);
    });

    it("should have the correct rows attr", () => {
        expect(wrapper.find("textarea").prop("rows")).toBe(props.options.rows);
    });

    it("should not render a <PressEnter /> component when options.pressEnter is false", () => {
        wrapper.setProps({ options: { pressEnter: false } });
        expect(wrapper.find(PressEnter).length).toEqual(0);
    });

    it("should render a <PressEnter /> component when options.pressEnter is undefined", () => {
        wrapper.setProps({ options: { pressEnter: undefined } });
        expect(wrapper.find(PressEnter).length).toEqual(1);
    });

    it("calls onChange prop when the textarea is changed", () => {
        wrapper.find("textarea").simulate("change", { target: { value: "some value" } });
        expect(props.onChange.mock.calls.length).toBe(1);
    });
});
