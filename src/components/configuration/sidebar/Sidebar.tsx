import React, {useContext, useEffect, useState} from "react";
import sidebarCss from './Sidebar.module.css'
import Logout from '../logout/Logout'
import { useRouter } from "next/router";
import { authContext } from "../../../context/login/authContext";

const Sidebar = () => {
  const { user } = useContext(authContext);
  const router = useRouter();
  const [ showEmployeeSystem, setshowEmployeeSystem ] = useState(false);

  useEffect(()=>{
    if(user ){
      if(user.superuser == true){
        setshowEmployeeSystem(true);
      }
    }
  },[user])

  return (
    <div className={sidebarCss["sidebar"]}>
          <div className={sidebarCss["sidebar__item"]} onClick={()=> router.push('/configuracion')}>
            Datos personales
          </div>
          {(showEmployeeSystem) ?
          <div className={sidebarCss["sidebar__item"]} onClick={()=> router.push('/configuracion/empleados')}>Sistema de empleados</div> :
           null}
          
          <Logout />
    </div>
  );
};

export default Sidebar;