import { createContext } from "react";
import {PatientManagerInfContext} from "../../../interface/odontology/patientInf";
 
export const patientManagerContext = createContext<PatientManagerInfContext>({} as PatientManagerInfContext);
