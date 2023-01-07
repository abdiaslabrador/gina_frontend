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
  createdAt?: Date;
  updateAt?: Date;
  // admit_update_currency y  enable_cant  no estan
}

export interface RegisterBoxContextInf {
    selectedProductRegisterBox : ProductRegisterBoxInf;
    productListRegisterBox : ProductRegisterBoxInf[];
    productBadCantList: any[],

    client :  ClientInf | null;
    loadingProductRegisterBox: boolean;
    productApiRegisterBox: ProductInf;
    loadingClient : boolean;

    setProductBadCantListRegisterBoxFn(productBadCantList : any[]):void;
    setSelectedProductRegisterBoxFn(employee:ProductRegisterBoxInf): void;
    searchClientByCiRegisterBoxFn(ci_rif:string):void;
    takeOutProductRegisterBoxFn(productId : number):void;
    addToRegisterBoxListFn(product : any):void;
    cleanRegisterBoxFn():void;
    getProductRegisterBoxFn(code : string):void;
  }