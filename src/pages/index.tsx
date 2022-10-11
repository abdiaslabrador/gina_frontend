import React, {useContext, useEffect} from 'react'
import Head from 'next/head'
import  {authContext}    from "./login/authState";
import Router ,{ useRouter } from "next/router";
import authToken from "../config/authToken";


// ['success' => false, 'code' => '821', 'message' => 'Campos requeridos']

const Caja = () => {
  const router = useRouter()
  const {user, userAuthenticated, logOut} = useContext(authContext)

  useEffect(() => {
    
    const loadAuth = async ()=>{
      if(typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if(!token){
          await router.push('/login')
          return null;   
        }
      }
      await userAuthenticated()
    }
    loadAuth()
  }, []);

  return (
   <div>

      <Head>
        <title>Caja</title>
      </Head>
      
        <h1>Desde caja</h1>
        <button onClick={()=>{logOut()}} 
        >LogOut</button>
   </div>
  )
}

// Caja.getInitialProps=async (ctx) =>{
// const objeto = {
//   nombre : "abdias",
//   apellido: "labrador"
// }

// if (ctx.res) { // server
//   ctx.res.writeHead(302, {
//     Location: '/login'
//   });

//   ctx.res.end();
// } 

// return {objeto}
// }

export default Caja
