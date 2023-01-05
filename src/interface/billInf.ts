export interface BillContextInf{
    selectOption: string,
    searchFormValue: string,
    loadingFormBill: boolean,
    loadingBillList: boolean,
    setSelectOptionFn(optionSelected : string): void,
}