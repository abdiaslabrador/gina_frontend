import React, { Fragment, useEffect, useContext } from "react";
import Head from "next/head";
import { NextPage, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import ServerError from "../components/error/500";
import { authContext } from "../context/login/authContext";
import WithLayout from "../components/layout/HocLayoutHeader";
import {errorServerContext} from '../context/error/errorServerContext';
import CurrencyProvider from '../context/register_box/currency/currencyState';
import RegisterBoxProvider from '../context/register_box/register_box/registerBoxState';
import RegisterBox from "../components/register_box/register_box/RegisterBox";

const Caja: NextPage = () => {
  const { userAuthenticated } = useContext(authContext);
  const { errorFromServer } = useContext(errorServerContext);

  useEffect(()=>{
    async function authCheck(){
     await userAuthenticated()
    }
    authCheck()
  },[])

  return (
    <Fragment>
      <Head>
        <title>Caja</title>
      </Head>
      {!errorFromServer ? (
        <CurrencyProvider>
          <RegisterBoxProvider>
            <RegisterBox/>
          </RegisterBoxProvider>
        </CurrencyProvider>
      ) : (
        <div>
          <ServerError />
        </div>
      )}
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

export default WithLayout(Caja);
