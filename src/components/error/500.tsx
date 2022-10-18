import React from 'react'
import errorServe from './ErrorServer500.module.css'

const ServerError = () => {
  return (
      <main className={errorServe.main}>
        <div className={errorServe.server_error_message}>
          <h1 className={errorServe.error_code}>500</h1> No se pudo conectar con el servidor.
        </div>
      </main>
  )
}

export default ServerError
