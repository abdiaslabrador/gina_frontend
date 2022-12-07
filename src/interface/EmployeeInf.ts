export interface EmployeeInf {
  id: number;
  name: string;
  last_name: string;
  ci_rif: string;
  birthday: Date;
  email: string;
  phone_number?: string;
  direction?: string;
  password?: string;
  active?: boolean;
  secretary?: boolean;
  superuser?: boolean;
  createdAt?: Date;
  updateA?: Date;
}

export interface EmployeeContextInf {
  selectedEmployee: EmployeeInf;
  employeeList: EmployeeInf[];
  msjSuccess : string;
  msjError : string;
  loadingForm: boolean;
  loadingPasswordForm : boolean;
  loadingEmployee: boolean;
  getEmployeesFn(): void;
  setSelectedEmployeeFn(employee:EmployeeInf): void;
  createEmployeeFn(employee : any): void;
  deleteEmployeeFn(employeeId: number):void;
  updateEmployeeFn(employee:EmployeeInf):void;
  updateEmployeeFn(employee:EmployeeInf):void;
  updateEmployeePasswordFn(employeeId : number, password: string):void;
}
