import { createContext } from "react";
import {ProductContextInf} from "../../../interface/productInf";
 
export const productContext = createContext<ProductContextInf>({} as ProductContextInf);
