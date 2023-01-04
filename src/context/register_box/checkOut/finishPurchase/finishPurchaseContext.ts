import { createContext } from "react";
import { FinishPurchaseContext } from "../../../../interface/checkOut/finishPurchaseInf";
 
export const finishPurchaseContext = createContext<FinishPurchaseContext>({} as FinishPurchaseContext);
