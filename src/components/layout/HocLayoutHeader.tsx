import React from "react";
import headerCss from "./LayoutHeader.module.css";
import Router from "next/router";

const WithLayout = (ExternalComponent: React.FunctionComponent) => {
  const NewComponent = (props: any) => {
    return (
      <div>
        <header className={headerCss["nav"]}>
          <nav>
            <ul className={headerCss["nav__list"]}>
              <li
                className={headerCss["nav__list-item"]}
                onClick={() => {
                  Router.push("/");
                }}
              >
                caja
              </li>
              <li
                className={headerCss["nav__list-item"]}
                onClick={() => {
                  Router.push("/odontologia");
                }}
              >
                odontología
              </li>
              <li
                className={headerCss["nav__list-item"]}
                onClick={() => {
                  Router.push("/salaEspera");
                }}
              >
                sala de espera
              </li>
              <li
                className={headerCss["nav__list-gear"]}
                onClick={() => {
                  Router.push("/configuracion");
                }}
              >
                <i className="fa-solid fa-gear"></i>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <ExternalComponent {...props} />
        </main>
      </div>
    );
  };

  return NewComponent;
};

export default WithLayout;
