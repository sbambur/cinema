import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducer";
import { schemeReducer } from "./schemeReducer";

export const rootReducer = combineReducers({
  sessionReducer,
  schemeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
