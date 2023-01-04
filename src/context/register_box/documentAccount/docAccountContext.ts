import { createContext } from "react";
import {DocAccountInfContext} from "../../../interface/checkOut/docAccountInf";
 
export const docAccountContext = createContext<DocAccountInfContext>({} as DocAccountInfContext);
