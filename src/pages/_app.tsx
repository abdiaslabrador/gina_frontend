import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthProvider    from "./login/authState";
import authToken from '../config/authToken';

function MyApp({ Component, pageProps }: AppProps) {
  if(typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    authToken(token)
  }

  return ( 
    <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
