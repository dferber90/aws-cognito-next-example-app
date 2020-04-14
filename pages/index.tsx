import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Auth from "@aws-amplify/auth";
import {
  AuthTokens,
  useAuth,
  useAuthFunctions,
  getServerSideAuth,
} from "./_auth";

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
              logout("/?hi=ok");
            }}
          >
            sign out
          </button>
        ) : (
          <React.Fragment>
            <button
              type="button"
              onClick={() => {
                // Reconfigure oauth to add the uri of the page which should open
                // after the sign in
                const redirectAfterSignIn =
                  window.location.pathname +
                  window.location.search +
                  window.location.hash;
                login("/?test=ok");
              }}
            >
              sign in
            </button>

            <button
              type="button"
              onClick={() => {
                const config = Auth.configure(null);
                Auth.configure({
                  oauth: {
                    ...config.oauth,
                    redirectSignIn:
                      "http://localhost:3000/examples/data-fetching",
                  },
                });
                Auth.federatedSignIn();
              }}
            >
              sign in and open data-fetching
            </button>
          </React.Fragment>
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
