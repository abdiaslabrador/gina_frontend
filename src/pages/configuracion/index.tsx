import {  Loading, } from "@nextui-org/react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useContext, useState, Fragment } from "react";
import Head from "next/head";
import WithLayout from "../../components/layout/HocLayoutHeader";
import { NextPage, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import { authContext } from "../../context/login/authContext";
import customAxios from "../../config/axios";
import employeProfileCss from "./EmployeeProfile.module.css";
import {EmployeeInf} from "../../interface/EmployeeInf";
import Sidebar from "../../components/configuration/sidebar/Sidebar";
import ServerError from "../../components/error/500";
import { employeeContext } from "../../context/configuration/employee/employeeContext";
import { errorServerContext } from '../../context/error/errorServerContext';
import comunModalCss from "../../styles/modal.module.css";

const EmployeeProfile: NextPage = () => {
  const { user, message, loadingForm, loadingPasswordForm, userAuthenticated, updateEmployeeFn, updateEmployeePasswordFn } = useContext(authContext);
  const { errorFromServer } = useContext(errorServerContext);
  const [ showForm, setShowForm ] = useState(false);


  useEffect(()=>{
    async function checkAuth(){
        await userAuthenticated();
    }
    checkAuth();
  },[])

  useEffect(()=>{
    if(user){
        setShowForm(true);
    }
  },[user])

  const personalPasswordInitialValues = {
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
      const resp = await customAxios.post("employee/getbyemailupdate", {
        look_email: value.toLowerCase().trim(),
        email: user.email,
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
      const resp = await customAxios.post("employee/getbyciupdate", {
        look_ci_rif: value.toLowerCase().trim(),
        ci_rif: user.ci_rif,
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

  const pesonalInfoHandler = async (values: any) => {
      
      const employee : EmployeeInf = {
          id: user.id,
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
        };
      await updateEmployeeFn(employee);

  };

  const passwordHandler = async (values: any, resetForm: any) => {
    
      await updateEmployeePasswordFn(user.id, values.password1);
      resetForm({ values: "" });
      
  };



  return (
    <Fragment>
      {!errorFromServer ? (
        <div className={employeProfileCss["container"]}>
        <Sidebar/>
        <div className={employeProfileCss["main"]}>
          {(showForm && user)?
          (
            <Fragment>
              <h1 className={employeProfileCss["title"]}>Datos personales</h1>
              
              {(message)? <div className={employeProfileCss["msj_success"]}>{message}</div> : null}
              <div className={employeProfileCss["personalInfo_container"]}>
                {<Formik
                    initialValues={user}
                    onSubmit={pesonalInfoHandler}
                    validateOnChange={false}
                    validateOnBlur={false}
                  >
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

                      { (user.superuser) ? 
                      (<Fragment>
                        <div className={comunModalCss["form_group"]}>
                        <div className={comunModalCss["form_group__label"]}>
                          <label>Activo:</label>
                        </div>
                        <Field
                          type="checkbox"
                          name="active"
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
                          disabled={loadingForm}
                        />
                      </div>
                    </Fragment>) :
                       null
                      }

                      <div className={employeProfileCss["button_group"]}>
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
                            Actualizar
                          </button>
                        )}
                      </div>
                    </Form>
                  </Formik>}
              </div>
              <div className={employeProfileCss["password_container"]}>
            {<Formik
                initialValues={personalPasswordInitialValues}
                onSubmit={(values, { resetForm }) =>
                passwordHandler(values, resetForm)
                }
              >
                {({ values }) => (
                  <Form>
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Contraseña*:</label>
                      </div>

                      <Field
                        validate={validatePassword1}
                        type="password"
                        name="password1"
                        placeholder="Contraseña"
                        disabled={loadingPasswordForm}
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
                        disabled={loadingPasswordForm}
                      />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="password2"
                      />
                    </div>

                    <div className={employeProfileCss["button_group"]}>
                      {loadingPasswordForm ? (
                        <div
                          className="button_form__button"
                        >
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
                          Cambiar contraseña
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>}
              </div>
            </Fragment>
          )
          :
          (
            <Loading
                type="spinner"
                color="white"
                size="xl"
              />
          )}

        </div>
        </div>
      ):(
      <div>
        <ServerError />
      </div>) 
      }
    </Fragment>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext){
    const {req, res} = ctx
    const token  = getCookie("token", {req, res})

    if (!token) {return {redirect: {destination: '/login',statusCode: 301,},}}

    return {
      props: {},
    }
  }

export default WithLayout(EmployeeProfile);
