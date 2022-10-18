import React, {useState} from "react";
import { createContext } from "react";

interface errorServerInf{
  errorFromServer : boolean,
  saveErrorFromServer(errorFromServer: boolean) : void
}

export const errorServerContext = createContext<errorServerInf>({} as errorServerInf);


interface props{
  children : JSX.Element |  JSX.Element[]
}

const ErrorServerProvider = ({children}: props) => {
  
  const [errorFromServer, saveErrorFromServer] = useState<boolean>(false)
  
  
  return (
    <errorServerContext.Provider
      value={{
        errorFromServer,
        saveErrorFromServer 
      }}
    >
      {children}
    </errorServerContext.Provider>
  );
};

export default ErrorServerProvider;
