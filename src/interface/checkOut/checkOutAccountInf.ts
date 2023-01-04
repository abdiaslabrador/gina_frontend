export interface CheckOutAccountInfContext {
    checkout_payed: number,
    checkout_dolares: number,
    checkout_balance: number,
    checkout_change: number,
    updateCheckOutAccountFn():void,
    cleanCheckOutAccountFn():void,
}