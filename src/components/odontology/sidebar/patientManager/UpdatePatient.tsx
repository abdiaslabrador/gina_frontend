import React, {useContext, useState} from "react";
import { Modal, Loading, } from "@nextui-org/react";
import customAxios from "../../../../config/axios";
import comunModalCss from "../../../../styles/modal.module.css";
import {PatientInf, BackgroundInf} from "../../../../interface/odontology/patientInf";
import { Formik, Form, Field, ErrorMessage } from "formik";
import updatePatientCss from "./UpdatePatient.module.css";
import moment from "moment";
import { patientManagerContext } from "../../../../context/odontology/patientManager/patientManagerContext";


const UpdatePatient = () => {

  const { msjSuccessPatientList, msjErrorPatientList, loadingFormPatientList, selectedPatient, updatePatientFn } = useContext(patientManagerContext);
  const [visible, setVisible] = useState(false);
  const [mensajeSuccess, setMensajeSuccess] = useState("");

  const handler = () => setVisible(true);
  
  const closeHandler = () => {
    setVisible(false);
  };

  const personalInfoInitialValues = {
    name: selectedPatient.name,
    last_name: selectedPatient.last_name,
    ci_rif: selectedPatient.ci_rif,
    sex: selectedPatient.sex,
    birthday: moment(selectedPatient.birthday).format("YYYY-MM-DD"),
    phone_number: selectedPatient.phone_number,
    direction: selectedPatient.direction,

    rm: selectedPatient.background?.rm,
    app: selectedPatient.background?.app,
    ah: selectedPatient.background?.ah,
    apf: selectedPatient.background?.apf,
    habits: selectedPatient.background?.habits,
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
      error = "Campo requerido";
    }
    try {
      const resp = await customAxios.post("patient/getbyciupdate", {
        look_ci_rif: value.toLowerCase().trim(),
        ci_rif: selectedPatient.ci_rif,
      });
      if (resp?.data) {
        error = "Usuario ya existe";
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
  }

  const pesonalInfoHandler = async (values: any) => {
      
      const background : BackgroundInf = {
        id: selectedPatient.background.id,
        rm: values.rm.toLowerCase().trim(),
        app: values.app.toLowerCase().trim(),
        ah: values.ah.toLowerCase().trim(),
        apf: values.apf.toLowerCase().trim(),
        habits:values.habits.toLowerCase().trim(),  
      };

      const patient : PatientInf = {
          id: selectedPatient.id,
          name: values.name.toLowerCase().trim(),
          last_name: values.last_name.toLowerCase().trim(),
          sex: values.sex,
          ci_rif: values.ci_rif.toLowerCase().trim(),
          phone_number: values.phone_number.toLowerCase().trim(),
          direction: values.direction.toLowerCase().trim(),
          birthday: values.birthday,
          background: background,
        };
      await updatePatientFn(patient);

  };

  return (
    <div>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={selectedPatient.id ? false : true}
      >
        Editar
      </button>

      <Modal
        animated={false}
        width="600px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton={!loadingFormPatientList}
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
              Actualizando un paciente
            </div>
            <div className={comunModalCss["header_subtitle"]}>
              (*) Atributos requeridos
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
            {
              <Formik
                initialValues={personalInfoInitialValues}
                onSubmit={pesonalInfoHandler}
                validateOnChange={false}
                validateOnBlur={false}
              >
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
                      disabled={loadingFormPatientList}
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
                        disabled={loadingFormPatientList}
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
                      disabled={loadingFormPatientList}
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
                      disabled={loadingFormPatientList}
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
                      disabled={loadingFormPatientList}
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
                        disabled={loadingFormPatientList}
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
                          disabled={loadingFormPatientList}
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
                          disabled={loadingFormPatientList}
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
                          disabled={loadingFormPatientList}
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
                          disabled={loadingFormPatientList}
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
                          disabled={loadingFormPatientList}
                        />
                    </div>

                  <div className={comunModalCss["button_group"]}>
                    {loadingFormPatientList ? (
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
                        Actualizar
                      </button>
                    )}
                  </div>
                </Form>
              </Formik>
            }
        </Modal.Body>
        <Modal.Footer>
           <div className={comunModalCss["footer_container"]}>
            {( msjSuccessPatientList )?(<div className={comunModalCss["msj_success"]}>{msjSuccessPatientList}</div>): null}
            {( msjErrorPatientList )?(<div className={comunModalCss["msj_error"]}>{msjErrorPatientList}</div>):null}
           </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdatePatient;
