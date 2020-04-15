import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useAuth } from "../../auth";
import Nav from "../../components/nav";
import Corner from "../../components/corner";

export default function StaticRendering(props: { text: string }) {
  const auth = useAuth(null);

  return (
    <React.Fragment>
      <style>{`p { max-width: 400pt; }`}</style>
      <Head>
        <title>Static Rendering</title>
      </Head>
      <h1>aws-cognito-next</h1>
      <Nav />
      <Corner />
      <h2>Static Rendering</h2>
      <p>
        This site is rendered <b>statically</b> on the server (without auth).
        The served HTML will be the same for every client. After loading, the
        client will take over and add things like auth. The auth is then added
        client-side once the page loaded on the server.
      </p>
      <h3>State from server, statically</h3>
      <pre>{props.text}</pre>

      <h3>Static from server, with dynamic auth state from client</h3>
      <h4>IdTokenData</h4>
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
      <h4>AccessTokenData</h4>
      <div>{auth ? auth.accessTokenData.username : "no access token"}</div>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { text: "This text is rendered on the server, statically." },
  };
};
