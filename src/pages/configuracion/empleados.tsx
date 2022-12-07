import React, { useEffect, useContext, useState } from "react";
import Head from "next/head";
import WithLayout from "../../components/layout/HocLayoutHeader";
import { NextPage, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import { authContext } from "../../context/login/authContext";
import customAxios from "../../config/axios";
import employeesCss from "./Employees.module.css";
import Sidebar from "../../components/configuration/sidebar/Sidebar";
import EmployeeSystem from "../../components/configuration/employee_system/EmployeeSystem";
import { useRouter } from "next/router";
import ServerError from "../../components/error/500";
import { errorServerContext } from '../../context/error/errorServerContext';
import EmployeeSystemProvider    from "../../context/configuration/employee/employeeState";


const Employees: NextPage = () => {
  const { user, userAuthenticated } = useContext(authContext);
  const { errorFromServer } = useContext(errorServerContext);
  const router = useRouter();


  useEffect(()=>{
    async function checkAuth(){
        await userAuthenticated();
    }
    checkAuth();
  },[])
  
  useEffect(()=>{
    if(user){
      if(user.superuser == false){
        router.push("/configuracion")
      }
    }
  },[user])

  return (
    <div>
      <Head>
        <title>Sistema de empleados</title>
      </Head>
      {!errorFromServer ? (
      <div className={employeesCss["container"]}>
        <Sidebar/>
        <div className={employeesCss["main"]}>

        <EmployeeSystemProvider>
        <EmployeeSystem/>
        </EmployeeSystemProvider>
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

export default WithLayout(Employees);
