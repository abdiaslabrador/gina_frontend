import { ClientInf } from "./clientInf";
import {ProductInf} from "./productInf";

export interface ProductRegisterBoxInf {
  id: number; //* los que se usan en la base de datos
  cant: number; //*
  price: number; //*
  price_ref: number; //*
  subtotal: number; //*
  description: string;
  code: string;
  // admit_update_currency: boolean;
  // enable_cant: boolean;
  createdAt?: Date;
  updateAt?: Date;
}

export interface RegisterBoxContextInf {
    selectedProductRegisterBox : ProductRegisterBoxInf;
    productListRegisterBox : ProductRegisterBoxInf[];

    client :  ClientInf | null;
    loadingProductRegisterBox: boolean;
    productApiRegisterBox: ProductInf;
    loadingClient : boolean;

    setSelectedProductRegisterBoxFn(employee:ProductRegisterBoxInf): void;
    searchClientByCiRegisterBoxFn(ci_rif:string):void;
    takeOutProductRegisterBoxFn(productId : number):void;
    addToRegisterBoxListFn(product : any):void;
    cleanRegisterBoxFn():void;
    getProductRegisterBoxFn(code : string):void;

    // msjSuccess : string;
    // msjError : string;
    // loadingForm : boolean;
    // loadingProduct : boolean;
  }