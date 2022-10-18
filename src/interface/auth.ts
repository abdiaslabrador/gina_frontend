import UserInf  from './user'

export interface authContextInf{
  user: UserInf,
  message: string,
  errorFromServer:boolean,
  singIn(email: string, password: string) : void,
  userAuthenticated() : void,
  logOut():void,
}