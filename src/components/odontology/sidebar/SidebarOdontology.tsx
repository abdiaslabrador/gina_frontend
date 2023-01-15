import React, {useContext, useEffect, useState} from "react";
import sidebarCss from './SidebarOdontology.module.css'
import { useRouter } from "next/router";
import PatientManager from "./patientManager/PatientManager";
import { patientContext } from "../../../context/odontology/patient/patientContext";
import PatientProfile from "./patientProfile/patientProfile";

const SidebarOdont = () => {
  const router = useRouter();
  const { patient } = useContext(patientContext);
  return (
    <div className={sidebarCss["sidebar"]}>
          <PatientManager/>
          <PatientProfile/>
          
    </div>
  );
};

export default SidebarOdont;