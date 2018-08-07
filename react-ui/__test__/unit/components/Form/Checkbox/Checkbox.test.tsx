import * as React from "react";
import { shallow } from "enzyme";
import { Checkbox } from "../../../../../src/components/Form/Checkbox";
import { FormGroup, Input } from "reactstrap";
import {
    CheckboxLabel,
    Checkmark,
} from "../../../../../src/components/Form/Checkbox/styledComponents";

describe("<Checkbox />", () => {
    let wrapper;
    const props = {
        name: "checkbox-name",
        label: <span>Checkbox Label</span>,
        prepend: "some-id",
        checked: false,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        wrapper = shallow(<Checkbox {...props} />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <FormGroup /> component", () => {
        expect(wrapper.find(FormGroup).length).toEqual(1);
    });

    it("should render a <CheckboxLabel /> component", () => {
        expect(wrapper.find(FormGroup).find(CheckboxLabel).length).toEqual(1);
    });

    it("should render a <Checkmark /> component", () => {
        expect(wrapper.find(FormGroup).find(Checkmark).length).toEqual(1);
    });

    it("should have a <Input /> component in <CheckboxLabel />", () => {
        expect(
            wrapper
                .find(FormGroup)
                .find(CheckboxLabel)
                .find(Input).length,
        ).toEqual(1);
    });

    it("<Input /> should have an id of #{prepend}-{name} when prepend id is included", () => {
        wrapper.setProps({ prepend: "some-id" });
        expect(
            wrapper
                .find(FormGroup)
                .find(CheckboxLabel)
                .find(Input)
                .prop("id"),
        ).toEqual(props.prepend + "-" + props.name);
    });

    it("<Input /> should have an id of #{name} when prepend id is not included", () => {
        wrapper.setProps({ prepend: "" });
        expect(
            wrapper
                .find(FormGroup)
                .find(CheckboxLabel)
                .find(Input)
                .prop("id"),
        ).toEqual(props.name);
    });

    it("calls onChange prop when the input checkbox is changed", () => {
        wrapper
            .find(FormGroup)
            .find(CheckboxLabel)
            .find(Input)
            .simulate("change", { currentTarget: { checked: true } });
        expect(props.onChange.mock.calls.length).toBe(1);
    });
});
