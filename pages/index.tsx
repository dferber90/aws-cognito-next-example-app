import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Nav from "../components/nav";
import {
  AuthTokens,
  useAuth,
  useAuthFunctions,
  getServerSideAuth,
} from "../auth";

const Home = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth);
  const { login, logout } = useAuthFunctions();

  return (
    <React.Fragment>
      <div className="container">
        <Head>
          <title>aws-cognito-next</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Nav />

        {auth ? (
          <button type="button" onClick={() => logout()}>
            sign out
          </button>
        ) : (
          <button type="button" onClick={() => login()}>
            sign in
          </button>
        )}

        <h2>IdTokenData</h2>
        <div>
          {auth ? (
            <React.Fragment>
              <p>{auth.idTokenData.email}</p>
              <p>{auth.idTokenData["cognito:username"]}</p>
            </React.Fragment>
          ) : (
            "no id token"
          )}
        </div>
        <h2>AccessTokenData</h2>
        <div>{auth ? auth.accessTokenData.username : "no access token"}</div>
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<{
  initialAuth: AuthTokens;
}> = async (context) => {
  const initialAuth = getServerSideAuth(context.req);

  return { props: { initialAuth } };
};

export default Home;
