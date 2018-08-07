import { combineReducers } from "redux";
import { debtEntityReducer } from "./debtEntityReducer";
import { dharmaReducer } from "./dharmaReducer";
import { investmentReducer } from "./investmentReducer";
import { plexReducer } from "./plexReducer";
import { routerReducer } from "react-router-redux";
import { toastReducer } from "./toastReducer";
import { tokenReducer } from "./tokenReducer";
import { web3Reducer } from "./web3Reducer";
import { gasPriceReducer } from "./gasPriceReducer";
import { debtsReducer } from "./debtsReducer";

export const reducers = combineReducers({
    debtEntityReducer,
    dharmaReducer,
    investmentReducer,
    plexReducer,
    routing: routerReducer,
    toastReducer,
    tokenReducer,
    web3Reducer,
    gasPriceReducer,
    debtsReducer,
});
