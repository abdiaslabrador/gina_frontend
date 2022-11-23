export default interface EmployeeInf {
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

export interface employeeContextInf {
  selectedEmployee: EmployeeInf,
  employeeList: EmployeeInf[];
  getEmployeesFn(): void;
  setSelectedEmployeeFn(employee:EmployeeInf): void;
  createEmployeeFn(employee : any): void;
  deleteEmployeeFn(employeeId: number):void;
  updateEmployeeFn(employee:EmployeeInf):void;
  updateEmployeeFn(employee:EmployeeInf):void;
  updateEmployeePasswordFn(employeeId : number, password: string):void;
}
