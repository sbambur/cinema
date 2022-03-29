import { createContext } from "react";

type IContext = any;

export const AuthContext = createContext<IContext>({auth: false, setAuth: () => {}});
