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
    productList: ProductInf[];
    msjSuccess : string;
    msjError : string;
    loadingForm: boolean;
    loadingProduct: boolean;
    // setSelectedProductFn(employee:ProductInf): void;
    // createProductFn(employee : any): void;
    // deleteProductFn(employeeId: number):void;
    // updateProductFn(employee:ProductInf):void;
    searchProductByCodeFn(code:string):void;
    searchProductByDescriptionFn(description:string):void;
    searchProductByCantFn(cant:number):void
    // searchProductByDescriptionFn(description:string):void;
    // searchProductByCantFn(cant:number):void;
  }
  