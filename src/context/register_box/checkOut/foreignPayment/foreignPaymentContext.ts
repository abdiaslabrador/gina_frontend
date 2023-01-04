import { createContext } from "react";
import { ForeignPaymentContextInf } from "../../../../interface/checkOut/paymentInf";
 
export const foreignPaymentContext = createContext<ForeignPaymentContextInf>({} as ForeignPaymentContextInf);
