import { createContext } from "react";
import { NationalPaymentContextInf } from "../../../../interface/checkOut/paymentInf";
 
export const natPaymentContext = createContext<NationalPaymentContextInf>({} as NationalPaymentContextInf);
