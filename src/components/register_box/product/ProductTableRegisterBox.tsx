import {  Loading, } from "@nextui-org/react";
import React, { Fragment, useEffect, useContext, useState } from "react";
import productTableCss from "./ProductTableRegisterBox.module.css";
import { ProductInf } from "../../../interface/productInf";
import { productContext } from "../../../context/register_box/product/productContext";
import SelectProduct from "./SelectProduct";

const ProductTable = () => {
    const {  selectedProduct, productList, loadingProduct, setSelectedProductFn } = useContext(productContext);

    function objectSelection(product: ProductInf): void {
      setSelectedProductFn(product);
    }

  return (
    <Fragment>
            <div className={productTableCss["pickup_botton"]}>
              <SelectProduct/>
            </div>
              <div className={productTableCss["product_list"]}>
                <div className={productTableCss["product_list__titles"]}>
                  <div>Código</div>
                  <div>Descripción</div>
                  <div>Cant</div>
                  <div>Precio</div>
                  <div>Ref</div>
                </div>
                <Fragment>
                  {(!loadingProduct)?
                    (
                    <div className={productTableCss["product_list__products"]}> 
                      {(productList?.length > 0) ? 
                        (<Fragment>
                          {productList.map((product, index) => (
                            <div
                              key={index}
                              style={
                                product.id === selectedProduct?.id
                                  ? { backgroundColor: "#313030" }
                                  : {}
                              }
                              className={productTableCss["product_list__item"]}
                              onClick={() => objectSelection(product)}
                            >
                              <div className={productTableCss["code"]}>{product.code}</div>
                              <div className={productTableCss["description"]}>{product.description}</div>
                              <Fragment>
                                {
                                  (product.enable_cant)?
                                  (<div className={productTableCss["cant"]}>{product.cant}</div>):
                                  (<div className={productTableCss["cant"]}>N/A</div>)
                                }
                              </Fragment>
                              <div className={productTableCss["price"]}>{product.price}</div>
                              <div className={productTableCss["price_ref"]}>{product.price_ref}</div>
                            </div>
                          ))}
                        </Fragment>):
                        (null)
                      }
                    </div>
                    ) :
                    (<div className={productTableCss["center_loading"]}>
                      <Loading
                      type="spinner"
                      color="white"
                      size="xl"
                      /> 
                    </div>)
                  }
                </Fragment>
                
              </div>
    </Fragment>
  );
};

export default ProductTable;