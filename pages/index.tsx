import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  getServerSideAuth,
  AuthTokens,
  useAuth,
  useAuthFunctions,
} from "../aws-cognito-nextjs/auth";

const Home = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth);
  const { login, logout } = useAuthFunctions();

  return (
    <React.Fragment>
      <div className="container">
        <Head>
          <title>CSS 2.0</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ul>
          <li>
            Examples
            <ul>
              <li>
                <Link href="/examples/static-rendering">
                  <a>Static Rendering</a>
                </Link>
              </li>
              <li>
                <Link href="/examples/server-side-rendering">
                  <a>Server-Side Rendering</a>
                </Link>
              </li>
              <li>
                <Link href="/examples/data-fetching">
                  <a>Data Fetching</a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        {auth ? (
          <button
            type="button"
            onClick={() => {
              logout();
            }}
          >
            sign out
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              // Reconfigure oauth to add the uri of the page which should open
              // after the sign in
              const redirectAfterSignIn =
                window.location.pathname +
                window.location.search +
                window.location.hash;
              login(redirectAfterSignIn);
            }}
          >
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
