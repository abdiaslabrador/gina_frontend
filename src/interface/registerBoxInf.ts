import { ClientInf } from "./clientInf";

export interface ProductRegisterBoxInf {
  id: number;
  code: string;
  cant: number;
  description: string;
  price: number;
  price_ref: number;
  admit_update_currency: boolean;
  enable_cant: boolean;
  subtotal: number;
  createdAt?: Date;
  updateAt?: Date;
}

export interface RegisterBoxContextInf {
    selectedProductRegisterBox : ProductRegisterBoxInf;
    productListRegisterBox : ProductRegisterBoxInf[];

    subtotal: 0;
    discount: 0;
    dolares: 0;
    total: 0;
    
    client :  ClientInf | null;
    loadingProductRegisterBox: boolean;
    productApiRegisterBox: ProductRegisterBoxInf;
    loadingClient : boolean;

    // msjSuccess : string;
    // msjError : string;
    // loadingForm : boolean;
    // loadingProduct : boolean;

    setSelectedProductRegisterBoxFn(employee:ProductRegisterBoxInf): void;
    searchClientByCiRegisterBoxFn(ci_rif:string):void;
    takeOutProductRegisterBoxFn(productId : number):void;
    addToRegisterBoxListFn(product : any):void;
    cancelThePurchaseFn():void;
    getProductRegisterBoxFn(code : string):void;
    updateAccountFn():void;
  }