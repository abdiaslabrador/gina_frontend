export interface DocAccountInfContext {
    subtotal: number;
    discount: number;
    dolares: number;
    total: number;
    updateDocAccountFn():void;
    setDiscountFn(discount : number):void;
    cleanDocumentAccountFn():void
  }