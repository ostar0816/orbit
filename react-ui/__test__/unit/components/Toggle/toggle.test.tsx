import * as React from "react";
import { shallow, mount } from "enzyme";
import { Toggle } from "../../../../src/components/Toggle";
import { ToggleLabel, ToggleName } from "../../../../src/components/Toggle/styledComponents";
import ReactToggle from "react-toggle";

describe("Toggle Component (Unit)", () => {
    let wrapper: JSX.Element;

    const props = {
        disabled: false,
        name: "some-name",
        checked: false,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        wrapper = shallow(<Toggle {...props}>Some Toggle</Toggle>);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <ReactToggle /> component", () => {
        expect(wrapper.find(ReactToggle).length).toEqual(1);
    });

    it("should render a <ToggleLabel /> component", () => {
        expect(wrapper.find(ToggleLabel).length).toEqual(1);
    });

    it("should render a <ToggleName /> component inside <ToggleLabel />", () => {
        expect(wrapper.find(ToggleLabel).find(ToggleName).length).toEqual(1);
    });

    it("<ToggleName /> should have the correct content", () => {
        expect(
            wrapper
                .find(ToggleLabel)
                .find(ToggleName)
                .get(0).props.children,
        ).toBe("Some Toggle");
    });

    it("should have the correct id", () => {
        props.prepend = "prepend";
        wrapper = shallow(<Toggle {...props} />);
        expect(wrapper.find(ReactToggle).prop("id")).toEqual(props.prepend + "-" + props.name);
    });

    describe("#handleChange", () => {
        it("calls onChange prop on click", () => {
            const event = {
                currentTarget: {
                    checked: true,
                },
            };
            wrapper.instance().handleChange(event);
            expect(props.onChange.mock.calls.length).toBe(1);
        });

        it("should setState twice", () => {
            const spy = jest.spyOn(Toggle.prototype, "setState");
            const event = {
                currentTarget: {
                    checked: true,
                },
            };
            wrapper.instance().handleChange(event);
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenLastCalledWith({ transactionUnderway: false });
        });
    });
});
