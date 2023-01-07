import React, {Fragment, useContext} from "react";
import { Modal, Loading } from "@nextui-org/react";
import comunModalCss from "../../../styles/modal.module.css";
import customAxios from "../../../config/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { clientContext } from "../../../context/register_box/client/clientContext";

const CreateClient = () => {
  const { msjSuccess, msjError, loadingForm, createClientFn } = useContext(clientContext);
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const formHandler = async (values: any, resetForm: any) => {
    
        const client  = {
          name: values.name.toLowerCase().trim(),
          last_name: values.last_name.toLowerCase().trim(),
          ci_rif: values.ci_rif.toLowerCase().trim(),
          phone_number: values.phone_number.toLowerCase().trim(),
          direction: values.direction.toLowerCase().trim(),
        };
        await createClientFn(client);
        resetForm({ values: "" });
  };

  const personalInfoInitialValues = {
    name: "",

    last_name: "",

    ci_rif: "",

    phone_number: "",

    direction: "",
  };

  
  async function validateName(value: any) {
    let error;

    if (!value.trim()) {
      error = "Campo requerido";
    }
    return error;
  }

  async function validateLastName(value: any) {
    let error;

    if (!value.trim()) {
      error = "Campo requerido";
    }
    return error;
  }

  async function validateCi(value: any) {
    let error;
  
    if (!value.trim()) {
      return error = "Campo requerido";
    }
    try {
      const resp = await customAxios.post("client/getbyci", {
        ci_rif: value.toLowerCase().trim(),
      });
      if (resp?.data) {
        error = "Cliente ya existe";
      }
    } catch (errorPetition: any) {
      if (errorPetition.response?.status != "404") {
        error = errorPetition.response.data?.msg || errorPetition.message;
      }
    }
  
    return error;
  }

  return (
    <Fragment>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
      >
        Crear
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
              Creando un cliente
            </div>
            <div className={comunModalCss["header_subtitle"]}>
              (*) Atributos requeridos
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={comunModalCss["body_container"]}>
            {
              <Formik
                initialValues={personalInfoInitialValues}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { resetForm }) =>
                  formHandler(values, resetForm)
                }
              >
                {({ values }) => (
                  <Form>
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Nombre*:</label>
                      </div>
                      <Field
                        validate={validateName}
                        type="text"
                        name="name"
                        placeholder="Escriba el nombre"
                        disabled={loadingForm}
                      />

                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="name"
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Apellido*:</label>
                      </div>
                        <Field
                          validate={validateLastName}
                          type="text"
                          name="last_name"
                          placeholder="Escriba el apellido"
                          disabled={loadingForm}
                        />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="last_name"
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>CI*:</label>
                      </div>

                      <Field
                        validate={validateCi}
                        type="text"
                        name="ci_rif"
                        placeholder="Escriba la cédula"
                        disabled={loadingForm}
                      />

                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="ci_rif"
                      />
                    </div>


                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Tlf:</label>
                      </div>
                      <Field
                        type="text"
                        name="phone_number"
                        placeholder="Escriba el telefono"
                        disabled={loadingForm}
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <div>Dirección:</div>
                      </div>
                        <Field
                          as="textarea"
                          type="text"
                          name="direction"
                          placeholder="Escriba la dirección"
                          style={{ resize: "none" }}
                          rows={5}
                          cols={23}
                          disabled={loadingForm}
                        />
                    </div>

                   
                    <div className={comunModalCss["button_group"]}>
                    {loadingForm ? (
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
                        Crear
                      </button>
                    )}
                  </div>
                  </Form>
                )}
              </Formik>
            }
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

export default CreateClient;
