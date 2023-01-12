import React, {useContext, useEffect, useState} from "react";
import sidebarCss from './SidebarOdontology.module.css'
import { useRouter } from "next/router";
import PatientManager from "../patientManager/PatientManager";
// import { authContext } from "../../../context/login/authContext";
const SidebarOdont = () => {
  const router = useRouter();

  return (
    <div className={sidebarCss["sidebar"]}>
          <div className={sidebarCss["sidebar__item"]} /*onClick={()=> router.push('/configuracion')}*/>
          <PatientManager/>
          
          </div>
          
          <div className={sidebarCss["sidebar__item"]} /*onClick={()=> router.push('/configuracion/empleados')}*/>
            <i className="fa-solid fa-user"></i>
          </div> 
          
    </div>
  );
};

export default SidebarOdont;