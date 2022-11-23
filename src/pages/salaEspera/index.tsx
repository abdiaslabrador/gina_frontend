import React, { useEffect, useContext } from "react";
import Head from "next/head";
import WithLayout from "../../components/layout/HocLayoutHeader";
import { NextPage, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import { authContext } from "../../context/login/authContext";


const Lista_usuarios: NextPage = () => {
  const { userAuthenticated, errorFromServer } = useContext(authContext);

  useEffect(() => {
    async function authCheck() {
      await userAuthenticated();
    }
    authCheck();
  }, []);

  return (
    <div>
      <Head>
        <title>Lista usuarios</title>
      </Head>

      <main>
        <h1>Desde Lista usuarios</h1>
      </main>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req, res } = ctx;
  const token = getCookie("token", { req, res });

  if (!token) {
    return { redirect: { destination: "/login", statusCode: 301 } };
  }

  return {
    props: {},
  };
}

export default WithLayout(Lista_usuarios);
