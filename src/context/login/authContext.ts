import { createContext, useReducer } from "react";
import { AuthContextInf } from "../../interface/auth";

export const authContext = createContext<AuthContextInf>({} as AuthContextInf);
