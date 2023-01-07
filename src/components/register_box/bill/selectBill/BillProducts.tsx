import React, {Fragment, useState, useContext, useEffect} from "react";
import billProductsCss from "./BillProducts.module.css";
import { billContext } from "../../../../context/register_box/bill/billContext";

const BillProducts = () => {
  const { 
    selectedBill,
   } = useContext(billContext);

   return (
    <Fragment>
        <div className={billProductsCss["product_list"]}>
            <div className={billProductsCss["product_list__titles"]}>
              <div>Código</div>
              <div>Descripción</div>
              <div>Cant</div>
              <div>Precio</div>
              <div>Ref</div>
              <div>Sub-Total</div>
            </div>
            <div className={billProductsCss["product_list__products"]}>
                {(selectedBill.docu?.docu_dets?.length > 0)? ( 
                    <Fragment>
                    {selectedBill.docu.docu_dets.map((product : any) => (
                        <div
                            key={product.id}
                            className={billProductsCss["product_list__item"]}
                        >
                            <div className={billProductsCss["code"]}>{product.product.code}</div>
                            <div className={billProductsCss["description"]}>{product.product.description}</div>
                            <div className={billProductsCss["cant"]}>{product.cant}</div>
                            <div className={billProductsCss["price"]}>{product.price_sold}</div>
                            <div className={billProductsCss["ref"]}>{product.price_ref}$</div>
                            <div className={billProductsCss["subtotal"]}>{product.subtotal}</div>
                        </div>
                    ))}
                    </Fragment>
                ) :
                <h4 style={{color: "white"}}>No hay productos</h4>
                }
            </div>
        </div>
    </Fragment>
  );
};

export default BillProducts;