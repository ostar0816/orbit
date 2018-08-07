import * as React from "react";
import { shallow } from "enzyme";
import { TradingPermissionsContainer } from "../../../../src/components/TradingPermissions/TradingPermissionsContainer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import {
    setAllTokensTradingPermission,
    toggleTokenTradingPermission,
} from "../../../../src/components/TradingPermissions/actions";
import { BigNumber } from "bignumber.js";

describe("<TradingPermissionsContainer />", () => {
    const initialState = {};
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(
            <Provider store={store}>
                <TradingPermissionsContainer />
            </Provider>,
        );
    });

    it("should render the component", () => {
        expect(wrapper.length).toEqual(1);
    });

    it("should render the connected smart component", () => {
        expect(wrapper.find(TradingPermissionsContainer).length).toEqual(1);
    });

    it("should dispatch set all tokens trading permission action", () => {
        const tokens = [
            {
                address: "someaddress",
                tokenSymbol: "REP",
                tradingPermitted: true,
                balance: new BigNumber(0),
            },
        ];
        store.dispatch(setAllTokensTradingPermission(tokens));
        const actions = store.getActions();
        const expectedPayload = { type: "SET_ALL_TOKENS_TRADING_PERMISSION", tokens: tokens };
        expect(actions[0]).toEqual(expectedPayload);
    });

    it("should dispatch toggle token trading permission action", () => {
        const tokenAddress = "someaddress";
        const permission = true;
        store.dispatch(toggleTokenTradingPermission(tokenAddress, permission));
        const actions = store.getActions();
        const expectedPayload = {
            type: "TOGGLE_TOKEN_TRADING_PERMISSION",
            tokenAddress: tokenAddress,
            permission: permission,
        };
        expect(actions[0]).toEqual(expectedPayload);
    });
});
