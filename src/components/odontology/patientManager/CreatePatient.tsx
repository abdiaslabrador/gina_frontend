import React, {useContext} from "react";
import { Modal, Loading } from "@nextui-org/react";
import comunModalCss from "../../../styles/modal.module.css";
import customAxios from "../../../config/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { patientContext } from "../../../context/odontology/patientManager/patientContext";
// import { PatientInf } from "../../../interface/PatientInf";


interface props {
  setPatientList: Function;
}
const CreatePatient = () => {
  const { msjSuccessPatient, msjErrorPatient, loadingFormPatient, createPatientFn } = useContext(patientContext);
  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const formHandler = async (values: any, resetForm: any) => {

        const background = {
          rm: values.rm.toLowerCase().trim(),
          app: values.app.toLowerCase().trim(),
          ah: values.ah.toLowerCase().trim(),
          apf: values.apf.toLowerCase().trim(),
          habits:values.habits.toLowerCase().trim(),  
        };

        const patient  = {
          name: values.name.toLowerCase().trim(),
          last_name: values.last_name.toLowerCase().trim(),
          ci_rif: values.ci_rif.toLowerCase().trim(),
          phone_number: values.phone_number.toLowerCase().trim(),
          sex: values.sex,
          direction: values.direction.toLowerCase().trim(),
          birthday: values.birthday,
          background: background,
        };
        await createPatientFn(patient);
        resetForm({ values: "" });
  };

  const personalInfoInitialValues = {
    name: "",
    last_name: "",
    ci_rif: "",
    sex: "",
    birthday: "",
    phone_number: "",
    direction: "",
    rm: "",
    app: "",
    ah: "",
    apf: "",
    habits: "",
  };

  function validateName(value: any) {
    let error;

    if (!value.trim()) {
      error = "Campo requerido";
    }
    return error;
  }

  function validateLastName(value: any) {
    let error;

    if (!value.trim()) {
      error = "Campo requerido";
    }
    return error;
  }

  async function validateCi(value: any) {
    let error;

    if (!value.trim()) {
      error = "Campo requerido";
    }
    try {
      const resp = await customAxios.post("patient/getbyci", {
        ci_rif: value.toLowerCase().trim(),
      });
      if (resp?.data) {
        error = "Paciente ya existe";
      }
    } catch (errorPetition: any) {
      if (errorPetition.response?.status != "404") {
        error = errorPetition.response.data?.msg || errorPetition.message;
      }
    }

    return error;
  }

  function validateBirthday(value: any) {
    let error;
    if (!value) {
      error = "Campo requerido";
    }

    return error;
  }

  function validateSex(value: any){
    let error;
    if (!value) {
      error = "Campo requerido";
    }

    return error;
  }
  

  return (
    <div>
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
        closeButton
        // ={!loadingFormPatient}
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
              Creando un paciente
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
                        disabled={loadingFormPatient}
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
                          disabled={loadingFormPatient}
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
                        placeholder="Escriba ci"
                        disabled={loadingFormPatient}
                      />

                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="ci_rif"
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Sexo*:</label>
                      </div>
                      <Field name="sex" as="select" validate={validateSex}>
                        <option value="">Seleccione una opción</option>
                        <option value="F">F</option>
                        <option value="M">M</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="sex"
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Fecha de nacimiento*:</label>
                      </div>

                      <Field
                        validate={validateBirthday}
                        type="date"
                        name="birthday"
                        placeholder="Escriba el teléfono"
                        disabled={loadingFormPatient}
                      />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="birthday"
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Tlf:</label>
                      </div>
                      <Field
                        type="text"
                        name="phone_number"
                        placeholder="Escriba el teléfono"
                        disabled={loadingFormPatient}
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
                          disabled={loadingFormPatient}
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <div>Reacción medicamentosa:</div>
                      </div>
                        <Field
                          as="textarea"
                          type="text"
                          name="rm"
                          placeholder="Escriba el antecedente"
                          style={{ resize: "none" }}
                          rows={3}
                          cols={23}
                          disabled={loadingFormPatient}
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <div>Antecedentes patológicos personales:</div>
                      </div>
                        <Field
                          as="textarea"
                          type="text"
                          name="app"
                          placeholder="Escriba el antecedente"
                          style={{ resize: "none" }}
                          rows={3}
                          cols={23}
                          disabled={loadingFormPatient}
                        />
                    </div>
                    
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <div>Antecedentes hemorágicos:</div>
                      </div>
                        <Field
                          as="textarea"
                          type="text"
                          name="ah"
                          placeholder="Escriba el antecedente"
                          style={{ resize: "none" }}
                          rows={3}
                          cols={23}
                          disabled={loadingFormPatient}
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <div>Antecedentes patológicos familiares:</div>
                      </div>
                        <Field
                          as="textarea"
                          type="text"
                          name="apf"
                          placeholder="Escriba el antecedente"
                          style={{ resize: "none" }}
                          rows={3}
                          cols={23}
                          disabled={loadingFormPatient}
                        />
                    </div>
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <div>Hábitos:</div>
                      </div>
                        <Field
                          as="textarea"
                          type="text"
                          name="habits"
                          placeholder="Escriba el antecedente"
                          style={{ resize: "none" }}
                          rows={3}
                          cols={23}
                          disabled={loadingFormPatient}
                        />
                    </div>
                    
                    <div className={comunModalCss["button_group"]}>
                    {loadingFormPatient ? (
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
            {( msjSuccessPatient )?(<div className={comunModalCss["msj_success"]}>{msjSuccessPatient}</div>): null}
            {( msjErrorPatient )?(<div className={comunModalCss["msj_error"]}>{msjErrorPatient}</div>):null}
           </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePatient;
