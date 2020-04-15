import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Nav from "../components/nav";
import Corner from "../components/corner";
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
      <style>{`p { max-width: 400pt; }`}</style>
      <div className="container">
        <Head>
          <title>aws-cognito-next</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>aws-cognito-next</h1>
        <p>
          This is an example showing how to use{" "}
          <a href="https://github.com/dferber90/aws-cognito-next">
            aws-cognito-next
          </a>
          .
        </p>
        <p>
          The source code of this website is at{" "}
          <a href="https://github.com/dferber90/aws-cognito-next-example-app">
            @dferber90/aws-cognito-next-example-app
          </a>
          .
        </p>
        <p>
          The special feature of this setup is that even authenticated pages can
          be rendered server-side. This is made possibly by setting Amplify (and
          Cognito) to use cookies instead of localStorage. Notice also how the
          login state is synced seamlessly across multiple tabs.
        </p>
        <p>
          A complete guide of how to set everything up can be found{" "}
          <a href="https://medium.com/p/f30efed6a24f">in this article</a>.
        </p>
        <h3>Navigation</h3>
        <Nav />
        <Corner />

        <h3>Example sign in</h3>
        {auth ? (
          <button type="button" onClick={() => logout()}>
            sign out
          </button>
        ) : (
          <React.Fragment>
            <button type="button" onClick={() => login()}>
              sign in
            </button>
          </React.Fragment>
        )}

        {auth ? (
          <React.Fragment>
            <h4>IdTokenData</h4>
            <div>
              <React.Fragment>
                <p>{auth.idTokenData.email}</p>
                <p>{auth.idTokenData["cognito:username"]}</p>
              </React.Fragment>
            </div>
            <h4>AccessTokenData</h4>
            <div>{auth.accessTokenData.username}</div>
          </React.Fragment>
        ) : (
          <p>
            <small>
              Your email address will not be shared. You will not get any spam.
              It is only needed for the example.
            </small>
          </p>
        )}
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
