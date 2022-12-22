import React, {Fragment, useContext} from "react";
import { ProductRegisterBoxInf } from "../../../interface/registerBoxInf";
import customAxios from "../../../config/axios";
import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
import cajaCss from "./Caja.module.css";

const RegisterBoxTable = () => {
  const { productListRegisterBox, selectedProductRegisterBox, setSelectedProductRegisterBoxFn } = useContext( registerBoxContext );
  
  function objectSelection(product: ProductRegisterBoxInf): void {
    setSelectedProductRegisterBoxFn(product);
  }


  return (
    <Fragment>
        <div className={cajaCss["product_list"]}>
            <div className={cajaCss["product_list__titles"]}>
              <div>Código</div>
              <div>Descripción</div>
              <div>Cant</div>
              <div>Precio</div>
              <div>Ref</div>
              <div>Sub-Total</div>
            </div>
            <Fragment>
                <div className={cajaCss["product_list__products"]}>
                    {(productListRegisterBox?.length > 0)? ( 
                        <Fragment>
                        {productListRegisterBox.map((product, index) => (
                              <div
                                key={index}
                                style={
                                  product.id === selectedProductRegisterBox?.id
                                    ? { backgroundColor: "#313030" }
                                    : {}
                                }
                                className={cajaCss["product_list__item"]}
                                onClick={() => objectSelection(product)}
                              >
                                <div className={cajaCss["code"]}>{product.code}</div>
                                <div className={cajaCss["description"]}>{product.description}</div>
                                <div className={cajaCss["cant"]}>{product.cant}</div>
                                <div className={cajaCss["price"]}>{product.price}</div>
                                <div className={cajaCss["ref"]}>{product.price_ref}$</div>
                                <div className={cajaCss["subtotal"]}>{product.subtotal}</div>
                            </div>
                        ))}
                        </Fragment>
                    ) :
                    (null)
                    }
                </div>
            </Fragment>
          </div>
    </Fragment>
  );
};

export default RegisterBoxTable;
