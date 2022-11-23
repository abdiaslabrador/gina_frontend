import { createContext, useReducer } from "react";
import { authContextInf } from "../../interface/auth";

export const authContext = createContext<authContextInf>({} as authContextInf);
