import React from 'react'
import headerCss from './LayoutHeader.module.css'
import Router  from "next/router";

const WithLayout = (ExternalComponent : React.FunctionComponent) => {
  const NewComponent = (props : any) =>{
    return (
        <div>
          <div className={headerCss._header}>
            <div className={headerCss._header_link} onClick={() => {Router.push('/')}}>
                CAJA
            </div>
            <div className={headerCss._header_link} onClick={() => {Router.push('/odontologia')}}>
                ODONTOLOGÍA
            </div>
            <div className={headerCss._header_link} onClick={() => {Router.push('/salaEspera')}}>
                SALA DE ESPERA
            </div>
            <div className={headerCss._header_gear} onClick={() => {Router.push('/settings')}}>
            <i  className="fa-solid fa-gear"></i>
            </div>
          </div>
          <ExternalComponent {...props} />
        </div>
    )
  }

  return NewComponent
}

export default WithLayout
