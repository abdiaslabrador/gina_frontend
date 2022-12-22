import React, {Fragment, useState, useContext, useEffect} from "react";
import { Modal, Loading } from "@nextui-org/react";
import comunModalCss from "../../../styles/modal.module.css";
import customAxios from "../../../config/axios";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";
import { registerBoxContext } from '../../../context/register_box/register_box/registerBoxContext';
import cajaCss from "../register_box/Caja.module.css";

const EditProduct = () => {
  const [ subtotal, setSubtotal ] = useState<number>(0);
  const [ priceRef, setPriceRef ] = useState<number>();
  const [ productCant, setProductCant ] = useState<number>(0);
  const { loadingCurrency } = useContext( currencyContext );
  const [ visible, setVisible ] = React.useState(false);
  const { client, selectedProductRegisterBox, productApiRegisterBox, loadingProductRegisterBox, 
    addToRegisterBoxListFn, getProductRegisterBoxFn, setSelectedProductRegisterBoxFn } = useContext(registerBoxContext);

  useEffect(()=>{
    setProductCant(selectedProductRegisterBox.cant); //cant del modal que cambia
    setSubtotal(Number((Number(selectedProductRegisterBox.cant) * selectedProductRegisterBox.price).toFixed(2)));
    setPriceRef(Number((selectedProductRegisterBox.cant * selectedProductRegisterBox.price_ref).toFixed(2)));
  }, [visible])

  const handler = async () => {
    getProductRegisterBoxFn(selectedProductRegisterBox.code)
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const formHandler = async (e : any) => {
    e.preventDefault();
    const product = {
      ...selectedProductRegisterBox,
      cant: productCant,
      subtotal: subtotal
    }
    addToRegisterBoxListFn(product);
    setSelectedProductRegisterBoxFn(product);
    setVisible(false);
  };

  function cantOnChange(e : any){
      setProductCant(Number(e.target.value)) //el e.target.value es tipo string
      setSubtotal(Number((Number(e.target.value) * selectedProductRegisterBox.price).toFixed(2)))
      setPriceRef(Number((Number(e.target.value) * selectedProductRegisterBox.price_ref).toFixed(2)));
  }

   return (
    <Fragment>
      <button
        className={ `${cajaCss["options__items"]} ${ (!client) ? (cajaCss["options__items--disable"])  : (cajaCss["options__items--enable"]) } `}
        onClick={handler}
        disabled={!selectedProductRegisterBox.id ? true : false}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>
    

      <Modal
        animated={false}
        width="600px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton/*={!loadingForm}*/
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
                        <h5 style={{color:"white"}}>{selectedProductRegisterBox.description}</h5>
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Cantidad disponible:</label>
                      </div>
                        {(selectedProductRegisterBox.enable_cant)?
                            <Fragment>

                            {(productApiRegisterBox.id && !loadingProductRegisterBox)?
                              (<h5 style={{color:"white"}}>{productApiRegisterBox.cant}</h5>)
                               :
                              null
                            }
                            {(loadingProductRegisterBox)?
                             <Loading
                              type="spinner"
                              color="white"
                              size="sm"
                             /> 
                            :
                             null
                            }
                            </Fragment>
                        :
                        (<h5 style={{color:"white"}}>N/A</h5>)}
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Cantidad*:</label>
                      </div>
                        {(productApiRegisterBox.id && !loadingProductRegisterBox)?
                            <input 
                            type="number"  
                            name="cant"
                            max={(productApiRegisterBox.enable_cant)? productApiRegisterBox.cant : ""}
                            min="1"
                            step="1"
                            value={productCant}
                            onChange={cantOnChange}
                            disabled={ loadingProductRegisterBox || loadingCurrency }
                            />
                            :
                            null
                        }
                        {(loadingProductRegisterBox)?
                            <Loading
                            type="spinner"
                            color="white"
                            size="sm"
                            /> 
                            :
                            null
                        }
                    </div>
                    
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Precio:</label>
                      </div>
                      <h5 style={{color:"white"}}>{selectedProductRegisterBox.price}</h5>
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Precio de referencia:</label>
                      </div>
                      <h5 style={{color:"white"}}>
                        {selectedProductRegisterBox.price_ref}
                      </h5>
                    </div>
                   
                    <div className={comunModalCss["form_group"]}>
                      <div style={{color:"white"}}>Bs {subtotal}</div>
                      <div style={{color:"white"}}>$ {priceRef}</div>
                    </div>

                    <div className={comunModalCss["button_group"]}>
                        { (loadingProductRegisterBox || loadingCurrency) ? (
                        <div className="button_form__button">
                            <Loading
                            type="spinner"
                            color="white"
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
                    
                  </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
           {/* <div className={comunModalCss["footer_container"]}>
            {( msjSuccess )?(<div className={comunModalCss["msj_success"]}>{msjSuccess}</div>): null}
            {( msjError )?(<div className={comunModalCss["msj_error"]}>{msjError}</div>):null}
           </div> */}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditProduct;