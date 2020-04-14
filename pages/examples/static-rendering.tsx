import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useAuth } from "../_auth";

export default function StaticRendering(props: { text: string }) {
  const auth = useAuth(null);

  return (
    <React.Fragment>
      <Head>
        <title>Static Rendering</title>
      </Head>
      <h1>Static Rendering</h1>
      <p>
        This site is rendered <b>statically</b> on the server (without auth).
      </p>
      <p>
        The served HTML will be the same for every client. After loading, the
        client will take over and add things like auth.
      </p>
      <p>
        The auth is then added client-side once the page loaded on the server.
      </p>
      <h3>State from server, statically</h3>
      <pre>{props.text}</pre>
      <hr />
      <h3>Static from server, with dynamic auth state from client</h3>
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

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { text: "This text is rendered on the server, statically." },
  };
};
