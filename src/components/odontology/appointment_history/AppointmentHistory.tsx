import React, {useContext, useEffect, useState} from "react";
import appointmentHistoryCss from './AppointmentHistory.module.css'
import { useRouter } from "next/router";
import PatientManager from "../sidebar/patientManager/PatientManager";
// import { authContext } from "../../../context/login/authContext";

const AppointmentHistory = () => {
  const router = useRouter();

  return (
    <div className={appointmentHistoryCss["appointmentHistory"]}>
          desde Appointment History
    </div>
  );
};

export default AppointmentHistory;