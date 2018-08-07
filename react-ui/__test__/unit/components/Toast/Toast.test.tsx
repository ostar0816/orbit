import * as React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import {
    setError,
    setInfo,
    setSuccess,
    clearToast,
} from "../../../../src/components/Toast/actions";
import { Toast, ToastType } from "../../../../src/components/Toast/Toast";
import { ToastContainer } from "../../../../src/components/Toast/ToastContainer";
import { StyledAlert } from "../../../../src/components/Toast/styledComponents";

jest.useFakeTimers();

describe("<Toast />", () => {
    describe("#render", () => {
        let wrapper;
        const props = {
            message: "Some toast message",
            type: ToastType.Error,
            handleClearToast: jest.fn(),
        };

        beforeEach(() => {
            wrapper = shallow(<Toast {...props} />);
        });

        it("should render the component", () => {
            expect(wrapper.length).toEqual(1);
        });

        it("should have a <StyledAlert /> component", () => {
            expect(wrapper.find(StyledAlert).length).toEqual(1);
        });

        it("<StyledAlert /> should have the correct content", () => {
            expect(wrapper.find(StyledAlert).get(0).props.children).toBe(props.message);
        });

        it("<StyledAlert /> `isOpen` is false when `visible` is false", () => {
            wrapper.setState({ visible: false });
            expect(wrapper.find(StyledAlert).prop("isOpen")).toBe(wrapper.state("visible"));
        });
    });

    describe("#componentDidUpdate", () => {
        let wrapper;

        it("set visible to true if there is message", () => {
            const spy = jest.spyOn(Toast.prototype, "setState");
            const props = {
                message: null,
                type: null,
                handleClearToast: jest.fn(),
            };
            wrapper = shallow(<Toast {...props} />);
            wrapper.setProps({ message: "Some message", type: ToastType.Error });
            expect(spy).toHaveBeenCalledWith({ visible: true });
        });

        it("set visible to false after 15 secs", () => {
            const spy = jest.spyOn(Toast.prototype, "setState");
            const props = {
                message: null,
                type: null,
                handleClearToast: jest.fn(),
            };
            wrapper = shallow(<Toast {...props} />);
            wrapper.setProps({ message: "Some message", type: ToastType.Error });
            expect(spy).not.toHaveBeenCalledWith({ visible: false });

            jest.runAllTimers();
            expect(spy).toBeCalled();
            expect(spy).toHaveBeenCalledWith({ visible: false });
        });
    });

    describe("#onDismiss", () => {
        let wrapper;
        it("set visible to false onDismiss()", () => {
            const spy = jest.spyOn(Toast.prototype, "setState");
            const props = {
                message: "Some message",
                type: ToastType.info,
                handleClearToast: jest.fn(),
            };
            wrapper = shallow(<Toast {...props} />);
            wrapper.instance().onDismiss();
            expect(spy).toHaveBeenCalledWith({ visible: false });
        });

        it("calls props handleClearToast onDismiss()", () => {
            const props = {
                message: "Some message",
                type: ToastType.info,
                handleClearToast: jest.fn(),
            };
            wrapper = shallow(<Toast {...props} />);
            wrapper.instance().onDismiss();
            expect(props.handleClearToast).toHaveBeenCalled();
        });
    });
});

describe("<ToastContainer />", () => {
    const initialState = {};
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(
            <Provider store={store}>
                <ToastContainer />
            </Provider>,
        );
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render the connected smart component", () => {
        expect(wrapper.find(ToastContainer).length).toEqual(1);
    });

    describe("#dispatch action", () => {
        it("should dispatch SET_ERROR_TOAST", () => {
            const persisted = true;
            store.dispatch(setError("Some message", persisted));
            const actions = store.getActions();
            const expectedPayload = {
                type: "SET_ERROR_TOAST",
                errorMessage: "Some message",
                persisted,
            };
            expect(actions[0]).toEqual(expectedPayload);
        });

        it("should dispatch SET_ERROR_TOAST with persisted defaulted as falsy", () => {
            store.dispatch(setError("Some message"));
            const actions = store.getActions();
            const expectedPayload = {
                type: "SET_ERROR_TOAST",
                errorMessage: "Some message",
                persisted: undefined,
            };
            expect(actions[0]).toEqual(expectedPayload);
        });

        it("should dispatch SET_INFO_TOAST", () => {
            store.dispatch(setInfo("Some message"));
            const actions = store.getActions();
            const expectedPayload = { type: "SET_INFO_TOAST", infoMessage: "Some message" };
            expect(actions[0]).toEqual(expectedPayload);
        });

        it("should dispatch SET_SUCCESS_TOAST", () => {
            store.dispatch(setSuccess("Some message"));
            const actions = store.getActions();
            const expectedPayload = { type: "SET_SUCCESS_TOAST", successMessage: "Some message" };
            expect(actions[0]).toEqual(expectedPayload);
        });

        it("should dispatch CLEAR_TOAST", () => {
            store.dispatch(clearToast());
            const actions = store.getActions();
            const expectedPayload = { type: "CLEAR_TOAST" };
            expect(actions[0]).toEqual(expectedPayload);
        });
    });
});
