import * as React from "react";
import { shallow } from "enzyme";
import { FieldTemplate } from "../../../../../src/components/Form/JSONSchemaForm/FieldTemplate";
import {
    Description,
    FieldWrapper,
    Error,
    Help,
} from "../../../../../src/components/Form/JSONSchemaForm/styledComponents";

describe("<FieldTemplate />", () => {
    let wrapper;
    const props = {
        classNames: "some-class",
        displayLabel: true,
        label: "Some label",
        required: true,
        rawDescription: "Some description",
        rawErrors: ["Some error message", "Another error message"],
    };

    beforeEach(() => {
        wrapper = shallow(<FieldTemplate {...props} />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <FieldWrapper /> component", () => {
        expect(wrapper.find(FieldWrapper).length).toEqual(1);
    });

    it("should render a <Help /> component inside <FieldWrapper />", () => {
        expect(wrapper.find(FieldWrapper).find(Help).length).toEqual(1);
    });

    it("should render the correct className", () => {
        expect(wrapper.find(FieldWrapper).prop("className")).toBe(
            props.classNames + " field-wrapper",
        );
    });

    it("should render a <label /> if displayLabel is true", () => {
        expect(wrapper.find(FieldWrapper).find("label").length).toEqual(1);
    });

    it("should render the correct label content", () => {
        expect(
            wrapper
                .find(FieldWrapper)
                .find("label")
                .get(0).props.children[0],
        ).toEqual(props.label);
        expect(
            wrapper
                .find(FieldWrapper)
                .find("label")
                .get(0).props.children[1],
        ).toEqual("*");
    });

    it("should render a <Description /> if displayLabel is true", () => {
        expect(wrapper.find(FieldWrapper).find(Description).length).toEqual(1);
    });

    it("should render the correct description content", () => {
        expect(
            wrapper
                .find(FieldWrapper)
                .find(Description)
                .get(0).props.children,
        ).toBe(props.rawDescription);
    });

    it("should render 2 <Error /> components inside <FieldWrapper />", () => {
        expect(wrapper.find(FieldWrapper).find(Error).length).toEqual(2);
    });

    it("should not render <label /> and <Description /> if displayLabel is false", () => {
        wrapper.setProps({ displayLabel: false });
        expect(wrapper.find(FieldWrapper).find("label").length).toEqual(0);
        expect(wrapper.find(FieldWrapper).find(Description).length).toEqual(0);
    });

    it("should not render '*' if required is false", () => {
        wrapper.setProps({ required: false });
        expect(
            wrapper
                .find(FieldWrapper)
                .find("label")
                .get(0).props.children[1],
        ).toBeNull();
    });
});
