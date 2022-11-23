import { createContext } from "react";
import {employeeContextInf} from "../../interface/EmployeeInf";
 
export const employeeContext = createContext<employeeContextInf>({} as employeeContextInf);
