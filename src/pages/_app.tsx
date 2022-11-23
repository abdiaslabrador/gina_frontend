import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import AuthProvider    from "../context/login/authState";
import ErrorServerProvider  from "../context/error/errorServerState";
import EmployeeSettingsProvider    from "../context/employee/employeeState";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider> 
      <ErrorServerProvider>
      <AuthProvider>
      <EmployeeSettingsProvider>
        <Component {...pageProps} />
      </EmployeeSettingsProvider>
      </AuthProvider>
      </ErrorServerProvider>
    </NextUIProvider> 

  )
}

export default MyApp