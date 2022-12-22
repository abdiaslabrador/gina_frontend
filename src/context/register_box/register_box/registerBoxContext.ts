import { createContext } from "react";
import {RegisterBoxContextInf} from "../../../interface/registerBoxInf";
 
export const registerBoxContext = createContext<RegisterBoxContextInf>({} as RegisterBoxContextInf);
