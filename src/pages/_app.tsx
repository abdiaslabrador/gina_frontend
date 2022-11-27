import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import AuthProvider    from "../context/login/authState";
import ErrorServerProvider  from "../context/error/errorServerState";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider> 
      <ErrorServerProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      </ErrorServerProvider>
    </NextUIProvider> 

  )
}

export default MyApp