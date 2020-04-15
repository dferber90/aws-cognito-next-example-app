import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useAuth, AuthTokens, getServerSideAuth } from "../../auth";
import Nav from "../../components/nav";
import Corner from "../../components/corner";
export default function ServerSideRendering(props: {
  text: string;
  initialAuth: AuthTokens;
}) {
  const auth = useAuth(props.initialAuth);

  return (
    <React.Fragment>
      <style>{`p { max-width: 400pt; }`}</style>
      <Head>
        <title>Server-Side Rendering</title>
      </Head>
      <h1>aws-cognito-next</h1>
      <Nav />
      <Corner />
      <h2>Server-Side Rendering</h2>
      <p>
        This site is rendered <b>dynamically</b> on the server (with auth). The
        served HTML will be specific to each client and their auth state. After
        loading, the client will take over. Open "View source" to see the
        server-rendered HTML.
      </p>
      <h3>State from server, dynamically</h3>
      <pre>{props.text}</pre>
      <h3>Dynamic from server, with takeover on client</h3>
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

export const getServerSideProps: GetServerSideProps<{
  initialAuth: AuthTokens;
  text: string;
}> = async (context) => {
  const initialAuth = getServerSideAuth(context.req);
  const text = `Today is ${new Date().toDateString()}. This text is rendered on the server, dynamically.`;
  return { props: { text, initialAuth } };
};
