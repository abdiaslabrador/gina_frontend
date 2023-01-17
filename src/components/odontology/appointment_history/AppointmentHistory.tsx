import React, {Fragment, useContext, useEffect, useState} from "react";
import appointmentHistoryCss from './AppointmentHistory.module.css'
import { Modal, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import PatientManager from "../sidebar/patientManager/PatientManager";
import { appointmentContext } from "../../../context/odontology/work_table/appointment/appointmentContext";
import { patientContext } from "../../../context/odontology/patient/patientContext";
import moment from "moment";
import UpdateAppointment from "./updateAppointment/UpdateAppointment";


// import { authContext } from "../../../context/login/authContext";

const AppointmentHistory = () => {
  const { appointmentList, loadingAppointmentList, updateAppointmentListFn, setVisibleAppointmentEditFn, setSelectedAppointmentFn} = useContext(appointmentContext);
  const { patient } = useContext(patientContext);
  const router = useRouter();
  useEffect(()=>{
    async function patientLoading(){
      if(patient){
        await updateAppointmentListFn()
      }
    }
    patientLoading()
  },[patient])

  return (
    <div className={appointmentHistoryCss["appointmentHistory"]}>
          <div className={appointmentHistoryCss["title"]}>Historia</div>
          <div className={appointmentHistoryCss["content"]}>
          <UpdateAppointment/>
          {(!loadingAppointmentList)?
            <Fragment>

              {(appointmentList)?
                (<Fragment>
                  {appointmentList.map((appointment, index) => (
                    <div
                      key={index}
                      // style={
                      //   appointment.id === selectedPatient?.id
                      //     ? { backgroundColor: "#313030" }
                      //     : {}
                      // }
                      className={appointmentHistoryCss["appoiment"]}
                      onClick={() => {  
                                        setSelectedAppointmentFn(appointment)
                                        setVisibleAppointmentEditFn(true);
                                      }
                              }
                    >
                      
                      <p ><span>Fecha: </span> {moment(appointment.appointment_date).format("DD-MM-YYYY")}</p>
                      <p ><span>Motivo: </span> {appointment.reason}</p>
                      <p ><span>Descripción: </span> {appointment.description}</p>
                    </div>
                  ))}
                </Fragment>
                )
               :
               null
               }
            </Fragment>
            :
            (<Loading
              type="spinner"
              color="currentColor"
              size="sm"
            />)
          }
          </div>
    </div>
  );
};

export default AppointmentHistory;