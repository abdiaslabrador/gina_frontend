import React, { useEffect, useContext, useState } from "react";
import Head from "next/head";
import WithLayout from "../../components/layout/HocLayoutHeader";
import { NextPage, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import { authContext } from "../../context/login/authContext";
import customAxios from "../../config/axios";
import settingsCss from "./Settings.module.css";
import EmployeeInf from "../../interface/EmployeeInf";
import DeleteEmployee from "../../components/employee/DeleteEmployee";
import CreateEmployee from "../../components/employee/CreateEmployee";
import UpdateEmployee from "../../components/employee/UpdateEmployee";
import Logout from "../../components/employee/Logout";
import ServerError from "../../components/error/500";
import { employeeContext } from "../../context/employee/employeeContext";
import { errorServerContext } from '../../context/error/errorServerContext';


const Settings: NextPage = () => {
  const { userAuthenticated } = useContext(authContext);
  const { errorFromServer } = useContext(errorServerContext);

  const { selectedEmployee, employeeList, getEmployeesFn, setSelectedEmployeeFn } = useContext(employeeContext);
  const [loadingDataSentence, setLoadingDataSentence] = useState<string>("Cargando datos...");


  useEffect(()=>{
    async function init(){
        await userAuthenticated();
        await getEmployeesFn();
    }
    init()
  },[])

  

  function objectSelection(employee: EmployeeInf): void {
    setSelectedEmployeeFn(employee);
  }

  return (
    <div>
      <Head>
        <title>Settings</title>
      </Head>
      {!errorFromServer ? (
      <div className={settingsCss["container"]}>
        <div className={settingsCss["sidebar"]}>
          <div className={settingsCss["sidebar__item"]}>
            Sistema de empleados
          </div>          
          <Logout />
        </div>
        <div className={settingsCss["main"]}>
          {employeeList?.length > 0 ? (
            <div>
              <div className={settingsCss["create_modify_bottom"]}>
                <CreateEmployee/>
                <UpdateEmployee/>
              </div>

              <div className={settingsCss["product_list"]}>
                <div className={settingsCss["product_list__titles"]}>
                  <div>Cédula</div>
                  <div>Nombre</div>
                  <div>Apellido</div>
                  <div>Activo</div>
                  <div>Secretario</div>
                  <div>Superusuario</div>
                </div>
                <div className={settingsCss["product_list__products"]}>
                  {employeeList.map((employee, index) => (
                    <div
                      key={index}
                      style={
                        employee.id === selectedEmployee?.id
                          ? { backgroundColor: "#313030" }
                          : {}
                      }
                      className={settingsCss["product_list__item"]}
                      onClick={() => objectSelection(employee)}
                    >
                      <div className={settingsCss["ci"]}>{employee.ci_rif}</div>
                      <div className={settingsCss["name"]}>{employee.name}</div>
                      <div className={settingsCss["last_name"]}>
                        {employee.last_name}
                      </div>
                      <div className={settingsCss["active"]}>
                        {employee.active ? "SI" : "NO"}
                      </div>
                      <div className={settingsCss["secretary"]}>
                        {employee.secretary ? "SI" : "NO"}
                      </div>
                      <div className={settingsCss["superuser"]}>
                        {employee.superuser ? "SI" : "NO"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={settingsCss["delete_bottom"]}>
              <DeleteEmployee/>
              </div>
            </div>
          ) : (
            <h1>Cargando datos...</h1>
          )}
        </div>
      </div>
      ) : (
        <div>
          <ServerError />
        </div>
      )}
    </div>
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

export default WithLayout(Settings);
