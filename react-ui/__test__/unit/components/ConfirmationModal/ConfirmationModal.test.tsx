import * as React from "react";
import { shallow } from "enzyme";
import { ConfirmationModal } from "../../../../src/components/ConfirmationModal";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

describe("<ConfirmationModal />", () => {
    let wrapper;
    const props = {
        modal: true,
        title: "Confirmation Modal Title",
        content: <div>Confirmation Modal Content</div>,
        closeButtonText: "Close",
        submitButtonText: "Submit",
        onToggle: jest.fn(),
        onSubmit: jest.fn(),
    };

    beforeAll(() => {
        wrapper = shallow(<ConfirmationModal {...props} />);
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render a <ModalHeader /> component", () => {
        expect(wrapper.find(ModalHeader).length).toEqual(1);
    });

    it("should render the correct title in <ModalHeader />", () => {
        expect(wrapper.find(ModalHeader).get(0).props.children).toBe(props.title);
    });

    it("should render a <ModalBody /> component", () => {
        expect(wrapper.find(ModalBody).length).toEqual(1);
    });

    it("should render the correct content in <ModalBody />", () => {
        expect(wrapper.find(ModalBody).get(0).props.children[0]).toBe(props.content);
    });

    it("should render a <ModalFooter /> component", () => {
        expect(wrapper.find(ModalFooter).length).toEqual(1);
    });

    it("should have 2 <Button /> components in <ModalFooter />", () => {
        expect(wrapper.find(ModalFooter).find(Button).length).toEqual(2);
    });

    it("should have the correct close button text", () => {
        expect(
            wrapper
                .find(ModalFooter)
                .find(Button)
                .get(0).props.children,
        ).toBe(props.closeButtonText);
    });

    it("should have the correct submit button text", () => {
        expect(
            wrapper
                .find(ModalFooter)
                .find(Button)
                .get(1).props.children[0],
        ).toBe(props.submitButtonText);
    });

    it("calls onToggle prop when the close button is clicked", () => {
        wrapper
            .find(ModalFooter)
            .find(Button)
            .at(0)
            .simulate("click");
        expect(props.onToggle.mock.calls.length).toBe(1);
    });

    it("calls onSubmit prop when the submit button is clicked", () => {
        wrapper
            .find(ModalFooter)
            .find(Button)
            .at(1)
            .simulate("click");
        expect(props.onSubmit.mock.calls.length).toBe(1);
    });
});
