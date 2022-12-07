import { createContext } from "react";
import {EmployeeContextInf} from "../../../interface/EmployeeInf";
 
export const employeeContext = createContext<EmployeeContextInf>({} as EmployeeContextInf);
