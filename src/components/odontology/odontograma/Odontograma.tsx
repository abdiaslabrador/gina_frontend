import React, {useContext, useEffect, useState} from "react";
import ondontoCss from './Odontograma.module.css'
import { useRouter } from "next/router";
import PatientManager from "../sidebar/patientManager/PatientManager";
// import { authContext } from "../../../context/login/authContext";

const Odontograma = () => {
  const router = useRouter();

  return (
    <div className={ondontoCss["odontograma"]}>
          desde odonto
    </div>
  );
};

export default Odontograma;