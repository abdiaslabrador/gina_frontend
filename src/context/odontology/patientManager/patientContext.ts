import { createContext } from "react";
import {PatientInfContext} from "../../../interface/odontology/patientInf";
 
export const patientContext = createContext<PatientInfContext>({} as PatientInfContext);
