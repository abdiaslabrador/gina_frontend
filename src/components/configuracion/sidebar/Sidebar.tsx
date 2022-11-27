import React from "react";
import sidebarCss from './Sidebar.module.css'
import Logout from '../logout/Logout'
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();


  return (
    <div className={sidebarCss["sidebar"]}>
          <div className={sidebarCss["sidebar__item"]} onClick={()=> router.push('/configuracion')}>
            Datos personales
          </div> 
          <div className={sidebarCss["sidebar__item"]} onClick={()=> router.push('/configuracion/empleados')}>
            Sistema de empleados
          </div>
          <Logout />
    </div>
  );
};

export default Sidebar;