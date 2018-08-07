import * as Web3 from "web3";
import * as React from "react";
import * as _ from "lodash";
import { BigNumber } from "bignumber.js";
import { shallow, ShallowWrapper } from "enzyme";
import { Dharma } from "@dharmaprotocol/dharma.js";

import { TOKEN_REGISTRY_TRACKED_TOKENS } from "@dharmaprotocol/dharma.js/dist/lib/utils/constants";

import MockWeb3 from "../../../../__mocks__/web3";
import MockDharma from "../../../../__mocks__/dharma.js";

import { TokenEntity } from "../../../../src/models/TokenEntity";

import {
    TokenSearch,
    Props,
    DEFAULT_RESULTS,
    MAX_RESULTS,
} from "../../../../src/components/TradingPermissions/TokenSearch";
import {
    TokenSearchResults,
    NoTokenResults,
} from "../../../../src/components/TradingPermissions/styledComponents";

interface Scenario {
    query: string;
    resultSet: string[];
}

describe("TokenSearch (Unit)", () => {
    const mockWeb3 = new MockWeb3() as Web3;
    const mockDharma = new MockDharma() as Dharma;

    const BALANCES = {
        ZRX: new BigNumber(100),
        MKR: new BigNumber(15),
        REP: new BigNumber(10),
        WETH: new BigNumber(3),
        EOS: new BigNumber(200),
        BNT: new BigNumber(150),
        OMG: new BigNumber(25),
    };

    const TOKENS: TokenEntity[] = TOKEN_REGISTRY_TRACKED_TOKENS.map((token) => {
        return {
            ...token,
            tradingPermitted: true,
            awaitingTransaction: false,
            balance: BALANCES[token.symbol] || new BigNumber(0),
        };
    });

    const DEFAULT_TOKENS = TOKENS.filter((token) => _.includes(DEFAULT_RESULTS, token.symbol));

    const DEFAULT_PROPS: Props = {
        agreeToTerms: true,
        networkId: 1,
        clearToast: jest.fn(),
        dharma: mockDharma,
        handleFaucetRequest: jest.fn(),
        setError: jest.fn(),
        tokens: [],
        updateProxyAllowanceAsync: jest.fn(),
        web3: mockWeb3,
    };

    function generateComponent(props: Props = DEFAULT_PROPS): ShallowWrapper {
        return shallow(
            <TokenSearch
                agreeToTerms={props.agreeToTerms}
                networkId={props.networkId}
                clearToast={props.clearToast}
                dharma={props.dharma}
                handleFaucetRequest={props.handleFaucetRequest}
                setError={props.setError}
                tokens={props.tokens}
                updateProxyAllowanceAsync={props.updateProxyAllowanceAsync}
                web3={props.web3}
            />,
        );
    }

    describe("#render", () => {
        const tokenSearchWrapper = generateComponent();

        test("should render", () => {
            expect(tokenSearchWrapper.length).toEqual(1);
        });

        test("should render <NoTokenResults /> if there are no tokens", () => {
            expect(tokenSearchWrapper.find(NoTokenResults).length).toEqual(1);
        });
    });

    describe("#tokensToDisplay", () => {
        const tokenSearchWrapper = generateComponent({
            ...DEFAULT_PROPS,
            tokens: TOKENS,
        });
        const tokenSearchInstance = tokenSearchWrapper.instance() as TokenSearch;

        const SCENARIOS: Scenario[] = [
            {
                query: "E",
                resultSet: ["EOS", "OMG", "MKR", "REP"],
            },
            {
                query: "RE",
                resultSet: ["REP", "R", "REQ"],
            },
            {
                query: "N",
                resultSet: ["BNT", "WETH", "AE", "AION"],
            },
            {
                query: "BN",
                resultSet: ["BNT", "BNB"],
            },
            {
                query: "Z",
                resultSet: ["ZRX", "CENNZ", "ZIL"],
            },
        ];

        test("should display the default set of tokens if no query is specified", () => {
            const expectedOrdering = ["ZRX", "MKR", "REP", "WETH"];
            const resultSet = tokenSearchInstance.tokensToDisplay();
            const resultOrdering = _.map(resultSet, "symbol");
            expect(resultOrdering).toEqual(expectedOrdering);
        });

        SCENARIOS.forEach((scenario) => {
            test(`should display tokens given query: ${scenario.query}`, () => {
                tokenSearchWrapper.setState({ query: scenario.query });
                const resultSet = tokenSearchInstance.tokensToDisplay();
                const resultOrdering = _.map(resultSet, "symbol");
                expect(resultOrdering).toEqual(scenario.resultSet);
            });
        });
    });
});
