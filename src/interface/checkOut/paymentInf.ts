import {CurrencyInf} from "../currencyInf";

export interface PaymentInf{
    id:number;
    name:string;
    active: boolean;
    type: string;
    currency: CurrencyInf;
    createdAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
}

export interface NationalPaymentContextInf{
    nationalPaymentList: PaymentInf[],
    selectedNatPayment : PaymentInf,
    loadingNatPayments: boolean,
    getNatPaymentsFn():void;
    setSelectedNatMethodFn(paymentType : any):void;
}

export interface ForeignPaymentContextInf{
    foreignPaymentList: PaymentInf[],
    selectedForeignPayment : PaymentInf,
    loadingForeignPayments: boolean,
    getForeignPaymentsFn():void;
    setSelectedForeignMethodFn(paymentType : any):void;
}