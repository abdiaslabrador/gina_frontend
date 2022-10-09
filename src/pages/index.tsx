import React, {useContext, useEffect} from 'react'
import Head from 'next/head'
import  {authContext}    from "./login/authState";

// ['success' => false, 'code' => '821', 'message' => 'Campos requeridos']

const Caja = () => {
  const {userAuthenticated, logOut} = useContext(authContext)
  useEffect(() => {
    const loadAuth = async ()=>{
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

export default Caja
