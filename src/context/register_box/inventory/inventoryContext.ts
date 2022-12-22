import { createContext } from "react";
import { InventoryContextInf } from "../../../interface/productInf";
 
export const inventoryContext = createContext<InventoryContextInf>({} as InventoryContextInf);