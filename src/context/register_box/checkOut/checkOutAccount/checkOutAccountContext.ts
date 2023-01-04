import { createContext } from "react";
import { CheckOutAccountInfContext } from "../../../../interface/checkOut/checkOutAccountInf";
 
export const checkOutAccountContext = createContext<CheckOutAccountInfContext>({} as CheckOutAccountInfContext);
