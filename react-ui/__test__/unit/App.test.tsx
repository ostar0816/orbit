import * as React from "react";
import { App } from "../../src/App";
import MockWeb3 from "../../__mocks__/web3";
import { shallow } from "enzyme";
jest.mock("react-ga");

describe("<App />", () => {
    it("renders without crashing", () => {
        const props = {
            web3: new MockWeb3(),
            accounts: ["account1"],
            showWeb3BrowserModal: true,
            detectMobileBrowser: (isMobileBrowser: boolean) => {},
        };
        shallow(<App {...props} />);
    });
});
