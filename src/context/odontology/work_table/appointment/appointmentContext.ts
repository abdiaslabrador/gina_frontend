import { createContext } from "react";
import {AppointmentInfContext} from "../../../../interface/odontology/appointmentInf";

export const appointmentContext = createContext<AppointmentInfContext>({} as AppointmentInfContext);
