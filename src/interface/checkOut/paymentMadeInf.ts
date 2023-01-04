export interface PaymentMadeInf{
    payment_date : Date,
    currency_name : string, //no se pasa a la base de datos
    currency_amount : number | null,
    currency_day_value : number | null,
    amount : number,
    detail : string,
    paymentType_id: number,
    paymentType_name : string, //no se pasa a la base de datos
}

export interface PaymentMadeContextInf{
    paymentMadeList: PaymentMadeInf[],
    selectedPaymentMade: PaymentMadeInf,
    addNationalPayment(amount : number, detail : string):void,
    addForeignPayment(currency_amount : number, detail : string):void,
    setSelectedPaymentMadeFn(payment : PaymentMadeInf):void,
    deletePaymentMadeFn(payment_date : Date):void,
    cleanPaymentMadeFn():void,
}