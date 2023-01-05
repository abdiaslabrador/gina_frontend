import { createContext } from "react";
import { BillContextInf } from "../../../interface/billInf";
 
export const billContext = createContext<BillContextInf>({} as BillContextInf);