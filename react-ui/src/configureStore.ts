import { applyMiddleware, compose, createStore, Middleware } from "redux";
import reduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";
// import * as Raven from "raven-js";
// import * as createRavenMiddleware from "raven-for-redux";

const throttle = require("lodash/throttle");

// import { DebtEntity, loadState, saveState } from "./models";
import { loadState, saveState } from "./models";

import { reducers } from "./reducers";

const loggerMiddleware = createLogger();

function setUpMiddleware(): Middleware[] {
    let middlewareArray = [reduxThunk] as Middleware[];

    if (process.env.NODE_ENV === "development") {
        middlewareArray = [...middlewareArray, loggerMiddleware] as Middleware[];
    }

    // const sentryDsn = process.env.REACT_APP_SENTRY_DSN;

    // if (process.env.NODE_ENV !== "production" || !sentryDsn) {
    //     return middlewareArray;
    // }

    // Raven.config(sentryDsn).install();
    //
    // const ravenMiddleware = createRavenMiddleware(Raven);

    // return [...middlewareArray, ravenMiddleware];
    return middlewareArray;
}

const devToolsKey: string = "devToolsExtension";

const persistedState = loadState();

const middlewares: Middleware[] = setUpMiddleware();

export default function configureStore() {
    const store = createStore(
        reducers,
        persistedState,
        compose(
            applyMiddleware(...middlewares),
            window[devToolsKey] ? window[devToolsKey]() : (f: any) => f,
        ),
    );

    store.subscribe(
        throttle(() => {
            // const {
            //     debtEntities,
            //     pendingDebtEntityIssuanceHashes,
            // } = store.getState().debtEntityReducer;
            //
            // const pendingDebtEntities = new Map<string, DebtEntity>();
            //
            // for (const issuanceHash of pendingDebtEntityIssuanceHashes) {
            //     pendingDebtEntities.set(issuanceHash, debtEntities.get(issuanceHash) as DebtEntity);
            // }

            // We only save the DebtEntities that are pending; all other DebtEntities should be retrieved through dharma.js.
            saveState({
                // debtEntityReducer: {
                //     debtEntities: pendingDebtEntities,
                //     filledDebtEntityIssuanceHashes: [],
                //     pendingDebtEntityIssuanceHashes,
                // },
                plexReducer: store.getState().plexReducer,
            });
        }, 1000),
    );

    return store;
}
