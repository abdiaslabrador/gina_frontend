import React, {useContext} from "react";
import { Modal, Loading } from "@nextui-org/react";
import createEmployeeCss from "./CreateEmployee.module.css";
import comunModalCss from "../../../styles/modal.module.css";
import customAxios from "../../../config/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { employeeContext } from "../../../context/configuration/employee/employeeContext";
import { EmployeeInf } from "../../../interface/EmployeeInf";


interface props {
  setEmployeeList: Function;
}
const CreateEmployee = () => {
  const { msjSuccess, msjError, loadingForm, createEmployeeFn } = useContext(employeeContext);
  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const formHandler = async (values: any, resetForm: any) => {
    
        const employee  = {
          email: values.email.toLowerCase().trim(),
          name: values.name.toLowerCase().trim(),
          last_name: values.last_name.toLowerCase().trim(),
          ci_rif: values.ci_rif.toLowerCase().trim(),
          phone_number: values.phone_number.toLowerCase().trim(),
          direction: values.direction.toLowerCase().trim(),
          birthday: values.birthday,
          active: values.active,
          secretary: values.secretary,
          superuser: values.superuser,
          password: values.password1
        };
        await createEmployeeFn(employee);
        resetForm({ values: "" });
  };

  const personalInfoInitialValues = {
    name: "",

    last_name: "",

    ci_rif: "",

    birthday: "",

    phone_number: "",

    direction: "",

    email: "",

    active: true,

    secretary: true,

    superuser: false,

    password1: "",

    password2: "",
  };

  async function validateEmail(value: any) {
    let error;

    if (!value.trim()) {
      error = "Campo requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Email mal escrito";
    }
    try {
      const resp = await customAxios.post("employee/getbyemail", {
        email: value.toLowerCase().trim(),
      });
      if (resp?.data) {
        error = "Correo ya existe";
      }
    } catch (errorPetition: any) {
      if (errorPetition.response?.status != "404") {
        error = errorPetition.response.data?.msg || errorPetition.message;
      }
    }

    return error;
  }

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
      const resp = await customAxios.post("employee/getbyci", {
        ci_rif: value.toLowerCase().trim(),
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

  function validatePassword1(value: any) {
    let error;
    if (!value) {
      error = "Campo requerido";
    } else if (value.length < 6) {
      error = "Contraseña debe contener más de 6 caracteres";
    }

    return error;
  }

  function validatePassword2(value: any, values: any) {
    let error;
    if (!value) {
      error = "Campo requerido";
    }
    if (value != values.password1) {
      error = "Las contraseñas tiene que ser iguales";
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
              Creando un empleado
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
                        <label>Email*:</label>
                      </div>

                      <Field
                        validate={validateEmail}
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        disabled={loadingForm}
                      />

                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="email"
                      />
                    </div>

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
                        <label>Fecha de nacimiento*:</label>
                      </div>

                      <Field
                        validate={validateBirthday}
                        type="date"
                        name="birthday"
                        placeholder="Escriba el teléfono"
                        disabled={loadingForm}
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

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Activo:</label>
                      </div>
                      <Field
                        type="checkbox"
                        name="active"
                        placeholder="Escriba el teléfono"
                        disabled={loadingForm}
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Secretario:</label>
                      </div>
                      <Field
                        type="checkbox"
                        name="secretary"
                        placeholder="Escriba el teléfono"
                        disabled={loadingForm}
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Superusuario:</label>
                      </div>
                      <Field
                        type="checkbox"
                        name="superuser"
                        placeholder="Escriba el teléfono"
                        disabled={loadingForm}
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Contraseña*:</label>
                      </div>

                      <Field
                        validate={validatePassword1}
                        type="password"
                        name="password1"
                        placeholder="Contraseña"
                        disabled={loadingForm}
                      />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="password1"
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Repita contraseña*:</label>
                      </div>
                      <Field
                        validate={(value: any) =>
                          validatePassword2(value, values)
                        }
                        type="password"
                        name="password2"
                        placeholder="Repita contraseña"
                        disabled={loadingForm}
                      />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="password2"
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
    </div>
  );
};

export default CreateEmployee;
