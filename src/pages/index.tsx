import React, { useEffect, useContext }  from "react";
import Head from "next/head";
import Router  from "next/router";
import { NextPage, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
// import customAxios from "../config/axios";
import ServerError from '../components/error/500'
// import UserInf from "../interface/user";
import {authContext} from '../components/login/authState'
 '../interface/user'
import WithLayout from '../components/layout/HocLayoutHeader'


const Caja: NextPage = ( ) => {
const {userAuthenticated, errorFromServer} = useContext(authContext)

  useEffect(()=>{
    async function authCheck(){
     await userAuthenticated()
    }
    authCheck()
  },[])

  return (
    <div>
      <Head>
        <title>Caja</title>
      </Head>
    {(!errorFromServer)?
    <div>
      <h1 style={{color: "white"}}>Desde caja</h1>
      {/* <button onClick={() => {}}>
        LogOut
      </button>
      <br />
      <br />
       <br /> */}
      <button onClick={() => {Router.push("/login");}}>
        Login
      </button>  
      </div> :
      <div>
      <ServerError/>
      </div>
      }
      
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

export default WithLayout(Caja);
