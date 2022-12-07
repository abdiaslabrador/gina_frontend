export interface CurrencyInf{
    id:number;
    name:string;
    today_currency: number;
    createdAt?: Date;
    updateA?: Date;
}

export interface CurrencyContextInf{
    currency: CurrencyInf
    msjSuccess : "",
    msjError : "",
    loadingForm: boolean,
    loadingCurrency: boolean,
    updateCurrencyFn(client : any):void;
    getCurrencyFn():void;
}