import React, {useContext, useEffect, useState} from "react";
import backgroundCss from './Background.module.css'
import { useRouter } from "next/router";
import { patientContext } from "../../../context/odontology/patient/patientContext";

const Background = () => {
  const {patient} = useContext(patientContext)
  const router = useRouter();

  return (
    <div className={backgroundCss["background"]}>
          <div className={backgroundCss["title"]}>Antecedentes</div>
          <div className={backgroundCss["content"]}>
            {(patient.background.ah)? <p><span>Hemorágicos:</span> {patient.background.ah}</p> : null}
            {(patient.background.apf)?<p><span>Patológicos familiares:</span> {patient.background.apf}</p> : null}
            {(patient.background.app)?<p><span>Patológicos personales:</span> {patient.background.app}</p> : null}
            {(patient.background.rm)?<p><span>Reacción medicamentosa:</span> {patient.background.rm}</p> : null}
            {(patient.background.habits)?<p><span>Hábitos:</span> {patient.background.habits}</p> : null}
          </div>
    </div>
  );
};

export default Background;