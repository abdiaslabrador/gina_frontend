import {EmployeeInf} from "./EmployeeInf";

export interface AuthContextInf {
  user: EmployeeInf;
  message: string;
  loadingForm: string,
  loadingPasswordForm: string,
  singIn(email: string, password: string): void;
  userAuthenticated(): void;
  logOut(): void;
  updateEmployeeFn(cuerrentUser : EmployeeInf):void;
  updateEmployeePasswordFn(userId : number, password: string):void;
}
