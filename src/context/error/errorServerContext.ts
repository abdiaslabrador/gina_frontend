import { createContext } from "react";
import {ErrorServerInf} from "../../interface/errorInf";

export const errorServerContext = createContext<ErrorServerInf>({} as ErrorServerInf);