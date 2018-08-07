import * as React from "react";
import { shallow, mount } from "enzyme";
import { JSONSchemaForm } from "../../../../../src/components/Form/JSONSchemaForm";
import {
    StyledForm,
    FieldWrapper,
} from "../../../../../src/components/Form/JSONSchemaForm/styledComponents";
import { schema, uiSchema } from "../../../../../src/modules/TestForm/schema";

describe("<JSONSchemaForm />", () => {
    let wrapper;
    const props = {
        className: "some-class",
        schema: schema,
        uiSchema: uiSchema,
        formData: {},
        buttonText: "Submit",
        onHandleChange: jest.fn(),
        onHandleSubmit: jest.fn(),
        validate: jest.fn(),
    };

    it("should render the component", () => {
        wrapper = shallow(<JSONSchemaForm {...props} />);
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <StyledForm />", () => {
        wrapper = shallow(<JSONSchemaForm {...props} />);
        expect(wrapper.find(StyledForm).length).toEqual(1);
    });

    it("should render a <FieldWrapper /> with .button-container class", () => {
        wrapper = shallow(<JSONSchemaForm {...props} />);
        expect(
            wrapper
                .find(StyledForm)
                .find(FieldWrapper)
                .hasClass("button-container"),
        ).toEqual(true);
    });

    it("calls addEventListener() inside componentDidMount()", () => {
        const spy = jest.spyOn(global, "addEventListener");
        wrapper = mount(<JSONSchemaForm {...props} />);
        expect(spy).toHaveBeenCalled();
    });

    it("calls props onHandleChange when the form is changed", () => {
        wrapper = shallow(<JSONSchemaForm {...props} />);
        wrapper.instance().handleChange({ formData: {} });
        expect(props.onHandleChange.mock.calls.length).toBe(1);
    });

    it("calls props onHandleSubmit when the form is submitted", () => {
        wrapper = shallow(<JSONSchemaForm {...props} />);
        wrapper.instance().handleSubmit({ formData: {} });
        expect(props.onHandleSubmit.mock.calls.length).toBe(1);
    });

    it("should not call highlightNextSibling() on handleKeyPress() when there is no valid event", () => {
        const highlightNextSibling = jest.fn();
        wrapper = shallow(<JSONSchemaForm {...props} />);
        wrapper.instance().handleKeyPress({});
        expect(highlightNextSibling).not.toHaveBeenCalled();
    });

    it("should not call highlightElement()/highlightGrandParentPressEnter() on handleKeyUp() when there is no valid event", () => {
        const highlightElement = jest.fn();
        const highlightGrandParentPressEnter = jest.fn();
        wrapper = shallow(<JSONSchemaForm {...props} />);
        wrapper.instance().handleKeyUp({});
        expect(highlightElement).not.toHaveBeenCalled();
        expect(highlightGrandParentPressEnter).not.toHaveBeenCalled();
    });

    it("should not call highlightElement() on handleClick() when there is no valid event", () => {
        const highlightElement = jest.fn();
        wrapper = shallow(<JSONSchemaForm {...props} />);
        wrapper.instance().handleClick({});
        expect(highlightElement).not.toHaveBeenCalled();
    });
});
