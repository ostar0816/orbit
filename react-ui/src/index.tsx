import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppRouter } from "./router/router";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";

import configureStore from "./configureStore";

const store = configureStore();

const env = process.env.NODE_ENV || "unknown";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./assets/css/index.css";
import "font-awesome/css/font-awesome.css";

ReactDOM.render(
    <Provider store={store}>
        <AppRouter store={store} env={env} />
    </Provider>,
    document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
