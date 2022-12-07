import { createContext } from "react";
import {ClientContextInf} from "../../../interface/clientInf";
 
export const clientContext = createContext<ClientContextInf>({} as ClientContextInf);
