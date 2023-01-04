import React, {Fragment, useState, useContext, useEffect} from "react";
import { Modal, Loading } from "@nextui-org/react";
import comunModalCss from "../../../styles/modal.module.css";
import customAxios from "../../../config/axios";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";
import { productContext } from "../../../context/register_box/product/productContext";
import { registerBoxContext } from '../../../context/register_box/register_box/registerBoxContext';

const SelectProduct = () => {
  const [ subtotal, setSubtotal ] = useState<number>(0);
  const [ priceRef, setPriceRef ] = useState<number>(0);
  const [ productCant, setProductCant ] = useState<number>(0);
  const [ visible, setVisible ] = useState(false);
  const { loadingCurrency } = useContext( currencyContext );
  const { msjSuccess, msjError, loadingForm, selectedProduct } = useContext(productContext);
  const { productListRegisterBox, addToRegisterBoxListFn } = useContext(registerBoxContext);

  useEffect(()=>{
    if(selectedProduct.id){
        let productFound  = productListRegisterBox.find((product) => {   
              return product.id == selectedProduct.id;
          })
        if(productFound){
          setProductCant(productFound.cant); //cant del modal que cambia
          setSubtotal(Number((Number(productFound.cant) * selectedProduct.price).toFixed(2)));
          setPriceRef(Number((productFound.cant * selectedProduct.price_ref).toFixed(2)));

        }else{
          setProductCant(1);
          setSubtotal(selectedProduct.price);
          setPriceRef(selectedProduct.price_ref);

        }
      }
  }, [visible])

  const handler = async () => { 
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const formHandler = async (e : any) => {
    e.preventDefault();
    const product : any = {
      ...selectedProduct,
      cant: productCant,
      subtotal: subtotal,
    }
    
    delete product.admit_update_currency
    delete product.enable_cant
    
    addToRegisterBoxListFn(product);
    setVisible(false);
  };

  function cantOnChange(e : any){
    setProductCant(Number(e.target.value)); //el e.target.value es tipo string
    setSubtotal(Number((Number(e.target.value) * selectedProduct.price).toFixed(2)));
    setPriceRef(Number((Number(e.target.value) * selectedProduct.price_ref).toFixed(2)));
  }

   return (
    <Fragment>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={selectedProduct.id ? false : true}
      >
        Seleccionar
      </button>

      <Modal
        animated={false}
        width="600px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton={!loadingForm}
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header
          css={{
            flexDirection: "column",
          }}
        >
          <div className={comunModalCss["header_container"]}>
            <div className={comunModalCss["header_title"]}>
              Seleccione cantidad
            </div>
            <div className={comunModalCss["header_subtitle"]}>
              (*) Atributos requeridos
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={comunModalCss["body_container"]}>
          
                  <form onSubmit={(e : any)=>formHandler(e)}> 
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Descripción:</label>
                      </div>
                        <h5 style={{color:"white"}}>{selectedProduct.description}</h5>
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Cantidad disponible:</label>
                      </div>
                        {(selectedProduct.enable_cant)?
                        (<h5 style={{color:"white"}}>{selectedProduct.cant}</h5>):
                        (<h5 style={{color:"white"}}>N/A</h5>)}
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Cantidad*:</label>
                      </div>
                      {(selectedProduct.enable_cant && selectedProduct.cant == 0) ? 
                        <h5 style={{color:"white"}}>No hay productos</h5> :
                        <input 
                          type="number"  
                          name="cant"
                          max={(selectedProduct.enable_cant)? selectedProduct.cant : ""}
                          min="1"
                          step="1"
                          value={productCant}
                          onChange={cantOnChange}
                          // disabled={ loadingForm || loadingCurrency }
                        />
                      }
                      </div>
                      

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Precio:</label>
                      </div>
                      <h5 style={{color:"white"}}>{selectedProduct.price}</h5>
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Precio de referencia:</label>
                      </div>
                      <h5 style={{color:"white"}}>
                        {selectedProduct.price_ref}
                      </h5>
                    </div>
                   
                    <div className={comunModalCss["form_group"]}>
                      <div style={{color:"white"}}>Bs {subtotal}</div>
                      <div style={{color:"white"}}>$ {priceRef}</div>
                    </div>

                    {(selectedProduct.enable_cant && selectedProduct.cant == 0) ? 
                        null :
                        <div className={comunModalCss["button_group"]}>
                        { (loadingForm || loadingCurrency) ? (
                        <div className="button_form__button">
                            <Loading
                            type="spinner"
                            color="currentColor"
                            size="sm"
                            />
                        </div>
                        ) : (
                        <button
                            type="submit"
                            className="button_form__button button_form__button--efect"
                        >
                            Guardar
                        </button>
                        )}
                    </div>
                      }
                    
                  </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
           <div className={comunModalCss["footer_container"]}>
            {( msjSuccess )?(<div className={comunModalCss["msj_success"]}>{msjSuccess}</div>): null}
            {( msjError )?(<div className={comunModalCss["msj_error"]}>{msjError}</div>):null}
           </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SelectProduct;