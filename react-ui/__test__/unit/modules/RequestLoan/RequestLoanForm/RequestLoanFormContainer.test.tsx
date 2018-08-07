import * as React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { RequestLoanFormContainer } from "../../../../../src/modules/RequestLoan/RequestLoanForm/RequestLoanFormContainer";
import { BigNumber } from "bignumber.js";

describe("<RequestLoanFormContainer />", () => {
    const initialState = {};
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(
            <Provider store={store}>
                <RequestLoanFormContainer />
            </Provider>,
        );
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render the connected smart component", () => {
        expect(wrapper.find(RequestLoanFormContainer).length).toEqual(1);
    });
});
