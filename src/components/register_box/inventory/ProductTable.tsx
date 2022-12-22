import {  Loading, } from "@nextui-org/react";
import React, { Fragment, useEffect, useContext, useState } from "react";
import prodcutTableCss from "./ProductTable.module.css";
import { ProductInf } from "../../../interface/productInf";
import DeleteProduct from "./DeleteProduct";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import { inventoryContext } from "../../../context/register_box/inventory/inventoryContext";

const ProductTable = () => {
    const {  selectedProduct, productList, loadingForm, loadingProduct, setSelectedProductFn } = useContext(inventoryContext);
    // const [loadingDataSentence, setLoadingDataSentence] = useState<string>("Cargando datos...");

    function objectSelection(product: ProductInf): void {
      setSelectedProductFn(product);
    }


  return (
    <Fragment>
              <div className={prodcutTableCss["create_modify_bottom"]}>
                <CreateProduct/>
                <UpdateProduct/>
              </div> 
              <div className={prodcutTableCss["product_list"]}>
                <div className={prodcutTableCss["product_list__titles"]}>
                  <div>Código</div>
                  <div>Descripción</div>
                  <div>Cant</div>
                  <div>Precio</div>
                  <div>Ref</div>
                </div>
                <Fragment>
                  {
                    (!loadingProduct)?(
                    <div className={prodcutTableCss["product_list__products"]}> 
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
                            className={prodcutTableCss["product_list__item"]}
                            onClick={() => objectSelection(product)}
                          >
                            <div className={prodcutTableCss["code"]}>{product.code}</div>
                            <div className={prodcutTableCss["description"]}>{product.description}</div>
                            <Fragment>
                              {
                                (product.enable_cant)?
                                (<div className={prodcutTableCss["cant"]}>{product.cant}</div>):
                                (<div className={prodcutTableCss["cant"]}>N/A</div>)
                              }
                            </Fragment>
                            <div className={prodcutTableCss["price"]}>{product.price}</div>
                            <div className={prodcutTableCss["price_ref"]}>{product.price_ref}</div>
                          </div>
                        ))}
                      </Fragment>
                      ):
                      (null)
                    }
                          </div>
                    ) :
                    (<div className={prodcutTableCss["center_loading"]}>
                      <Loading
                      type="spinner"
                      color="white"
                      size="xl"
                      /> 
                    </div>)
                }
                </Fragment>
              </div>

              <div className={prodcutTableCss["delete_bottom"]}>
                <DeleteProduct/>
              </div> 
    </Fragment>
  );
};

export default ProductTable;