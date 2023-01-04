// import React, {Fragment, useContext, } from "react";
// import searchFormBillManagerCss from './SearchFormBillManagerRegisterBox.module.css'
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import  customAxios  from "../../../config/axios";
// import { ProductInf } from "../../../interface/productInf";

// const SearchFormBillManager = () => {
// //   const { selectOption, searchBillByFn, setSelectOptionFn, setSelectedProductFn } = useContext(productContext);

//   const initialValues={
//       bill_date: '',
//       code: '',
//   }


// //   const formHandler = async  (values: any) => {
// //     setSelectedProductFn({} as ProductInf); //limpia la selección
// //     let selectValue : string;
// //     if(selectOption == "code"){
// //       selectValue = (values[selectOption]).toLowerCase().trim();
// //     }else{
// //       selectValue = values.bill_date;
// //     }
// //     // await searchBillByFn(selectValue);
// //     console.log("Buscando factura...")
    
// //   }



//   async function validateCode(value: any) {
//     let error;

//     if (!value.trim()) {
//       return error = "Campo requerido";
//     }
//     try {
//       const resp = await customAxios.post("product/searchby", {
//         selectValue: value.trim(),
//         selectOption: "code"
//       });
//       (resp.data.length == 0) ? error = "No se encuentra el producto" : null;

//     } catch (errorPetition: any) {
//         error = errorPetition.response.data?.msg || errorPetition.message;
//     }

//     return error;
//   }

//   const busquedaHandler = (e: any, resetForm : any) => {
//     setSelectOptionFn( e.target.value );
//     resetForm({values: ''})
//   };

// return (
//     <div className={searchFormBillManagerCss["container"]}>
//       <div className={searchFormBillManagerCss["search"]}>
//         {<Formik
//             initialValues={initialValues}
//             validateOnChange={false}
//             validateOnBlur={false}
//             // onSubmit={formHandler}
//           >
//           {({ values , resetForm}) => (
//           <Form>
//             <Fragment>
//                 <div className={searchFormBillManagerCss["form_select"]}>
//                     <select 
//                       name="searchOptions"
//                       value={selectOption}
//                       onChange={(e)=>busquedaHandler(e, resetForm)}
//                     >
//                         <option value=""> -- Seleccione un opción -- </option>
//                         <option value="bill_date">Fecha</option>
//                         <option value="code">Código</option>
//                     </select>
//                 </div>
//                  <div className={searchFormBillManagerCss["form_group"]}>
//                   {(selectOption == "bill_date")?
//                     (<Fragment>
//                       <Field
//                         // validate={validateDescription}
//                         className={searchFormBillManagerCss["square__form"]}
//                         type="text"
//                         name="bill_date"
//                         placeholder="Decripción"
//                       />
//                       <ErrorMessage
//                         className={searchFormBillManagerCss["square__form-error"]}
//                         component="div"
//                         name="description"
//                       />
//                     </Fragment>)
//                     :
//                       (null)
//                   }

//                   {(selectOption == "code")?
//                   (<Fragment>
//                     <Field
//                     //   validate={validateCode}
//                       className={searchFormBillManagerCss["square__form"]}
//                       type="text"
//                       name="code"
//                       placeholder="Escriba el código"
//                     />
//                     <ErrorMessage
//                       className={searchFormBillManagerCss["square__form-error"]}
//                       component="div"
//                       name="code"
//                     />
//                   </Fragment>)
//                   :
//                     null
//                   }

//                   {(selectOption)?
//                     <button
//                         type="submit"
//                         className="button_form__button button_form__button--efect"
//                     >
//                         <i className="fa-solid fa-magnifying-glass"></i>
//                     </button>
//                   :
//                     null
//                   }  
//                   </div>        
//                 </Fragment>
//           </Form>
//         )}
//         </Formik> 
//         }
//         </div>
//     </div>
//   );
// };

// export default SearchFormBillManager;