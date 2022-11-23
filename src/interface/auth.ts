import EmployeeInf from "./EmployeeInf";

export interface authContextInf {
  user: EmployeeInf;
  message: string;
  singIn(email: string, password: string): void;
  userAuthenticated(): void;
  logOut(): void;
}
