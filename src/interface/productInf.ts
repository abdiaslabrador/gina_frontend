export interface ProductInf {
    id: number;
    code:string;
    cant: number;
    description: string;
    price: number;
    price_ref: number;
    admit_update_currency:boolean;
    enable_cant:boolean;
    createdAt?: Date;
    updateA?: Date;
  }
  
  export interface ProductContextInf {
    selectedProduct: ProductInf;
    selectOption: string;
    productList: ProductInf[];
    searchFormValue : string | number;
    msjSuccess : string;
    msjError : string;
    loadingForm: boolean;
    loadingProduct: boolean;
    loadingProductPrices: boolean;
    setSelectedProductFn(employee:ProductInf): void;
    createProductFn(employee : any): void;
    deleteProductFn(employeeId: number):void;
    setSelectOptionFn(optionSelected : string):void;
    updateProductFn(employee: any):void;
    searchProductByFn(searchValue : string | number):void;
    cleanProductsFn():void;
    updateProductPricesFn():void;
  }
  