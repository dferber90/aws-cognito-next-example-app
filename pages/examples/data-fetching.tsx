import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import fetch from "isomorphic-fetch";
import { getServerSideAuth, AuthTokens, useAuth } from "../_auth";
import useSWR from "swr";

const textEndpoint = "http://localhost:3000/api/text";

type TextResponse = { text: string } | null;

function getTextResponse(url: string, token: string): Promise<TextResponse> {
  return fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
}

export default function Home(props: {
  initialAuth: AuthTokens;
  textResponse: TextResponse;
}) {
  const auth = useAuth(props.initialAuth);

  const { data, error } = useSWR(auth ? [textEndpoint, auth.idToken] : null, {
    fetcher: getTextResponse,
    initialData: props.textResponse,
  });

  return (
    <React.Fragment>
      <Head>
        <title>aws-cognito-next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {auth ? (
        <p>Welcome {auth.idTokenData["cognito:username"]}</p>
      ) : (
        <p>Welcome anonymous</p>
      )}

      <pre>{data ? data.text : JSON.stringify(error, null, 2)}</pre>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initialAuth: AuthTokens;
  textResponse: TextResponse;
}> = async (context) => {
  const initialAuth = getServerSideAuth(context.req);

  const textResponse: TextResponse = initialAuth
    ? await getTextResponse(textEndpoint, initialAuth.idToken)
    : null;

  return { props: { textResponse, initialAuth } };
};
