import React, {Fragment, useContext} from "react";
import { Modal, Loading, } from "@nextui-org/react";
import toothOptionCss from './ToothOption.module.css'
import { odontogramaContext } from "../../../../context/odontology/work_table/odontograma/odontogramaContext";
import {ToothInf} from "../../../../interface/odontology/odontogramaInf";
import { Formik, Form, Field, ErrorMessage } from "formik";
import comunModalCss from "../../../../styles/modal.module.css";

const ToothOption = () => {
  const {tooth, visibleToothOptions, createOrToothFn, setVisibleToothOptionsModalFn, setSelectedToothFn} = useContext(odontogramaContext);

  const closeHandler = () => {
    // setSelectedToothFn({} as ToothInf);
    setVisibleToothOptionsModalFn(false);
  };

  const initialValues = {
    e:tooth?.e?.toLowerCase(),
    m:tooth?.m?.toLowerCase(),
    question: tooth?.question,
    line: tooth?.line?.toLowerCase(),
    circle: tooth?.circle?.toLowerCase(),
    ring: tooth?.ring?.toLowerCase(),
    x: tooth?.x?.toLowerCase(),
    one: tooth?.toothParts?.one?.toLowerCase(),
    two: tooth?.toothParts?.two?.toLowerCase(),
    three: tooth?.toothParts?.three?.toLowerCase(),
    four: tooth?.toothParts?.four?.toLowerCase(),
    five: tooth?.toothParts?.five?.toLowerCase()
    }
  

  async function formHandler(values : any){
    const new_tooth = {
      number: tooth.number,
      e:values.e,
      m:values.m,
      question: values.question,
      line: values.line,
      circle: values.circle,
      ring: values.ring,
      x: values.x,
      toothParts:{
                one: values.one,
                two: values.two,
                three: values.three,
                four: values.four,
                five: values.five
            }
    }
    await createOrToothFn(new_tooth);
  }


  return (
    <Fragment>
        
        <Modal
        animated={false}
        width="800px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visibleToothOptions}
        onClose={closeHandler}
        >
          <Modal.Header>
          
            <h3 className={toothOptionCss["title"]}>
                Diente {tooth.number}
            </h3>
          
        </Modal.Header>
            <Modal.Body>
            <Formik
                initialValues={initialValues}
                onSubmit={formHandler}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ values , resetForm}) => (
                <Form>
                    <div className={toothOptionCss["subtitle"]}>
                        Arriba
                    </div> 
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>E:</label>
                      </div>
                      <Field name="e" as="select" className={`${(values.e == "b")?toothOptionCss["tooth__letter--blue"]: ((values.e == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" className={toothOptionCss["tooth__letter--blue"]}>E</option>
                        <option value="r" className={toothOptionCss["tooth__letter--red"]}>E</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="e"
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>M:</label>
                      </div>
                      <Field name="m" as="select" className={`${(values.m)?toothOptionCss["tooth__letter--red"]:null}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="m1" className={toothOptionCss["tooth__letter--red"]}>M1</option>
                        <option value="m2" className={toothOptionCss["tooth__letter--red"]}>M2</option>
                        <option value="m3" className={toothOptionCss["tooth__letter--red"]}>M3</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="m"
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>---:</label>
                      </div>
                      <Field name="line" as="select"  className={`${(values.line == "b")?toothOptionCss["tooth__letter--blue"]: ((values.line == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" className={toothOptionCss["tooth__letter--blue"]}>------------</option>
                        <option value="r" className={toothOptionCss["tooth__letter--red"]}>------------</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="line"
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                    <div className={comunModalCss["form_group__label"]}>
                      <label>?:</label>
                    </div>
                    <Field
                      type="checkbox"
                      name="question"
                    />
                  </div>

                  <div className={toothOptionCss["subtitle"]}>
                    Sobre el diente
                  </div> 
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>X:</label>
                      </div>
                      <Field name="x" as="select" className={`${(values.x == "b")?toothOptionCss["tooth__letter--blue"]: ((values.x == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" className={toothOptionCss["tooth__letter--blue"]}>X</option>
                        <option value="r" className={toothOptionCss["tooth__letter--red"]}>X</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="x"
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>O:</label>
                      </div>
                      <Field name="ring" as="select" className={`${(values.ring == "b")?toothOptionCss["tooth__letter--blue"]: ((values.ring == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" className={toothOptionCss["tooth__letter--blue"]}>O</option>
                        <option value="r" className={toothOptionCss["tooth__letter--red"]}>O</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="ring"
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label><i className="fa-solid fa-circle"></i>:</label>
                      </div>
                      <Field name="circle" as="select" className={`${(values.circle == "b")?toothOptionCss["tooth__letter--blue"]: ((values.circle == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" style={{fontSize: "32px"}} className={toothOptionCss["tooth__letter--blue"]}>&bull;</option>
                        <option value="r" style={{fontSize: "32px"}} className={toothOptionCss["tooth__letter--red"]}>&bull;</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="circle"
                        />
                    </div>

                  <div className={toothOptionCss["subtitle"]}>
                    Dentro del los cuadritos
                  </div>
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>1:</label>
                      </div>
                      <Field name="one" as="select" className={`${(values.one == "b")?toothOptionCss["tooth__letter--blue"]: ((values.one == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" className={toothOptionCss["tooth__letter--blue"]}>punto azul</option>
                        <option value="r" className={toothOptionCss["tooth__letter--red"]}>punto rojo</option>
                        <option value="br" className={toothOptionCss["tooth__bckgd_letter_br"]}>combinado</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="one"
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>2:</label>
                      </div>
                      <Field name="two" as="select" className={`${(values.two == "b")?toothOptionCss["tooth__letter--blue"]: ((values.two == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" className={toothOptionCss["tooth__letter--blue"]}>punto azul</option>
                        <option value="r" className={toothOptionCss["tooth__letter--red"]}>punto rojo</option>
                        <option value="br" className={toothOptionCss["tooth__bckgd_letter_br"]}>combinado</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="two"
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>3:</label>
                      </div>
                      <Field name="three" as="select" className={`${(values.three == "b")?toothOptionCss["tooth__letter--blue"]: ((values.three == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" className={toothOptionCss["tooth__letter--blue"]}>punto azul</option>
                        <option value="r" className={toothOptionCss["tooth__letter--red"]}>punto rojo</option>
                        <option value="br" className={toothOptionCss["tooth__bckgd_letter_br"]}>combinado</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="three"
                        />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>4:</label>
                      </div>
                      <Field name="four" as="select" className={`${(values.four == "b")?toothOptionCss["tooth__letter--blue"]: ((values.four == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" className={toothOptionCss["tooth__letter--blue"]}>punto azul</option>
                        <option value="r" className={toothOptionCss["tooth__letter--red"]}>punto rojo</option>
                        <option value="br" className={toothOptionCss["tooth__bckgd_letter_br"]}>combinado</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="four"
                        />
                    </div>

                    {( (tooth.number >=44 && tooth.number <=48) || (tooth.number >=34 && tooth.number <=38) ||
                       (tooth.number >=24 && tooth.number <=28) || (tooth.number >=14 && tooth.number <=18)
                      )?
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>5:</label>
                      </div>
                      <Field name="five" as="select" className={`${(values.five == "b")?toothOptionCss["tooth__letter--blue"]: ((values.five == "r")?toothOptionCss["tooth__letter--red"]: null)}`}>
                        <option value="" style={{color: "black"}}>nada</option>
                        <option value="b" className={toothOptionCss["tooth__letter--blue"]}>punto azul</option>
                        <option value="r" className={toothOptionCss["tooth__letter--red"]}>punto rojo</option>
                        <option value="br" className={toothOptionCss["tooth__bckgd_letter_br"]}>combinado</option>
                      </Field>
                      <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="five"
                        />
                    </div>
                    :
                    null
                    } 

                    <div className={comunModalCss["button_group"]}>
                    {/* {loadingFormPatient ? (
                      <div className="button_form__button">
                        <Loading
                          type="spinner"
                          color="currentColor"
                          size="sm"
                        />
                      </div>
                    ) : ( */}
                      <button
                        type="submit"
                        className="button_form__button button_form__button--efect"
                      >
                        Actualizar
                      </button>
                    {/* )} */}
                  </div>
                </Form>
                )}
                </Formik>
                 
            </Modal.Body>
        </Modal>
    </Fragment>
  );
};

export default ToothOption;