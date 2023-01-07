import { ProductInf } from "../productInf";

export interface FinishPurchaseContext {
    loadingDocumentInfo: boolean, 
    finishPurchaseFn() : void,
  }