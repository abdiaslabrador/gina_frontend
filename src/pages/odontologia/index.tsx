import React, { useEffect, useContext } from "react";
import Head from "next/head";
import WithLayout from "../../components/layout/HocLayoutHeader";
import { NextPage, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import { authContext } from "../../context/login/authContext";
("../interface/user");

const Odontologia: NextPage = () => {
  const { userAuthenticated } = useContext(authContext);

  useEffect(() => {
    async function authCheck() {
      await userAuthenticated();
    }
    authCheck();
  }, []);

  return (
    <div>
      <Head>
        <title>Odontologia</title>
      </Head>

      <main>
        <h1>Desde Odontologia</h1>
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

export default WithLayout(Odontologia);
