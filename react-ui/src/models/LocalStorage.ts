// import { DebtEntity, OpenCollateralizedDebtEntity } from "../models";
// import { debtOrderFromJSON } from "../utils";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(
            process.env.REACT_APP_LOCAL_STORAGE_KEY_PREPEND + "state",
        );
        if (serializedState === null) {
            return undefined;
        }

        const state = JSON.parse(serializedState);

        // `saveState` saves Maps as flattened arrays of format [[key, value], [key, value]]
        // const debtEntitiesArray = state.debtEntityReducer.debtEntities;
        //
        // // We assume that all DebtEntities saved to localStorage are OpenCollateralizedDebtEntities.
        // const pendingDebtEntities = new Map<string, DebtEntity>();
        //
        // for (let [issuanceHash, debtEntry] of debtEntitiesArray) {
        //     pendingDebtEntities.set(
        //         issuanceHash,
        //         new OpenCollateralizedDebtEntity(debtOrderFromJSON(JSON.stringify(debtEntry))),
        //     );
        // }
        //
        // state.debtEntityReducer.debtEntities = pendingDebtEntities;
        //
        // // TODO(kayvon): set default values for those properties of `state` that are not saved to
        // // local storage.
        // if (!state.debtEntityReducer.pendingDebtEntityIssuanceHashes) {
        //     state.debtEntityReducer.pendingDebtEntityIssuanceHashes = [];
        // }
        //
        // if (!state.debtEntityReducer.filledDebtEntityIssuanceHashes) {
        //     state.debtEntityReducer.filledDebtEntityIssuanceHashes = [];
        // }

        return state;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(
            process.env.REACT_APP_LOCAL_STORAGE_KEY_PREPEND + "state",
            serializedState,
        );
    } catch (err) {
        // console.log(err);
    }
};
