import { combineReducers } from "redux";
import { hallReducer } from "./hallReducer";

export const rootReducer = combineReducers({
  hallReducer
})

export type RootState = ReturnType<typeof rootReducer>