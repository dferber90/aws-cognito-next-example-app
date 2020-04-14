import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useAuth, AuthTokens, getServerSideAuth } from "../_auth";
import Nav from "../../components/nav";
export default function ServerSideRendering(props: {
  text: string;
  initialAuth: AuthTokens;
}) {
  const auth = useAuth(props.initialAuth);

  return (
    <React.Fragment>
      <Head>
        <title>Server-Side Rendering</title>
      </Head>
      <Nav />
      <h1>Server-Side Rendering</h1>
      <p>
        This site is rendered <b>dynamically</b> on the server (with auth).
      </p>
      <p>
        The served HTML will be specific to each client and their auth state.
        After loading, the client will take over.
      </p>
      <h3>State from server, dynamically</h3>
      <pre>{props.text}</pre>
      <hr />
      <h3>Dynamic from server, with takeover on client</h3>
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
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initialAuth: AuthTokens;
  text: string;
}> = async (context) => {
  const initialAuth = getServerSideAuth(context.req);
  const text = `Today is ${new Date().toDateString()}. This text is rendered on the server, dynamically.`;
  return { props: { text, initialAuth } };
};
