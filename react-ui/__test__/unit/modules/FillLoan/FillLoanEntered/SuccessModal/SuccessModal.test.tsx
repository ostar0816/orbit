import * as React from "react";
import { shallow } from "enzyme";
import { SuccessModal } from "src/modules/FillLoan/FillLoanEntered/SuccessModal";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { DoneButton } from "src/modules/FillLoan/FillLoanEntered/SuccessModal/styledComponents";

describe("<SuccessModal />", () => {
    let wrapper;
    let props;
    beforeEach(() => {
        props = {
            modal: true,
            issuanceHash: "somestring",
            onToggle: jest.fn(),
            onRedirect: jest.fn(),
        };
        wrapper = shallow(<SuccessModal {...props} />);
    });

    describe("#render", () => {
        it("should render successfully", () => {
            expect(wrapper.length).toEqual(1);
        });

        it("should render a <Modal />", () => {
            expect(wrapper.find(Modal).length).toEqual(1);
        });

        it("should render a <ModalHeader />", () => {
            expect(wrapper.find(Modal).find(ModalHeader).length).toEqual(1);
        });

        it("should render a <ModalBody />", () => {
            expect(wrapper.find(Modal).find(ModalBody).length).toEqual(1);
        });

        it("should render a <ModalFooter />", () => {
            expect(wrapper.find(Modal).find(ModalFooter).length).toEqual(1);
        });

        it("should render a <DoneButton />", () => {
            expect(
                wrapper
                    .find(Modal)
                    .find(ModalFooter)
                    .find(DoneButton).length,
            ).toEqual(1);
        });
    });

    describe("#handleToggle", () => {
        it("should call props onToggle", () => {
            wrapper.instance().handleToggle();
            expect(props.onToggle).toHaveBeenCalled();
        });
    });

    describe("#handleRedirect", () => {
        it("should call handleRedirect when the button is clicked", () => {
            const spy = jest.spyOn(SuccessModal.prototype, "handleRedirect");
            const _wrapper = shallow(<SuccessModal {...props} />);
            _wrapper
                .find(Modal)
                .find(ModalFooter)
                .find(DoneButton)
                .simulate("click");
            expect(spy).toHaveBeenCalled();
        });

        it("should call props onRedirect", () => {
            wrapper.instance().handleRedirect();
            expect(props.onRedirect).toHaveBeenCalled();
        });
    });
});
