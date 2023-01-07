export interface BillInf {
    id:number,
    docu: any,
    created?: Date,
    updateAt?: Date,
    deleteAt?: Date,
}

export interface BillContextInf {
    billList: BillInf[],
    selectedBill: BillInf,
    selectOption: string,
    searchFormValue: string,
    loadingFormBill: boolean,
    loadingBillList: boolean,
    cleanBillFn():void,
    setSelectedBillFn(bill: BillInf): void,
    setSelectOptionFn(optionSelected : string):void,
    searchBillByIdFn(id: string):void,
    searchBillByDateFn(date_since : string, date_until : string):void,
}