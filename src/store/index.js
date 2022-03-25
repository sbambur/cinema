import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
  key: 'root',
  storage: storage,
  StatereConciler: autoMergeLevel2
};

const myPersistReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(myPersistReducer, applyMiddleware(thunk))

export const persistor = persistStore(store)
export default store