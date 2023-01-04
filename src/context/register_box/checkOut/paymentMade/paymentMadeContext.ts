import { createContext } from "react";
import { PaymentMadeContextInf } from "../../../../interface/checkOut/paymentMadeInf";
 
export const paymentMadeContext = createContext<PaymentMadeContextInf>({} as PaymentMadeContextInf);
