import { createContext } from "react";
import {CurrencyContextInf} from "../../../interface/currencyInf";
 
export const currencyContext = createContext<CurrencyContextInf>({} as CurrencyContextInf);
