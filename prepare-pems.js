// TODO read these from the env
const USER_POOL_ID = "eu-central-1_nfOfx47Q6";
const COGNITO_REGION = "eu-central-1";

// A script which creates pems.json depending on the env-vars by fetching them
// from the URL shown in the docs below and writing the result to pems.json.
//  https://aws.amazon.com/de/premiumsupport/knowledge-center/decode-verify-cognito-json-token/
//  https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt
// Different types of tokens
//  https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html
const fs = require("fs");
const path = require("path");
const fetch = require("isomorphic-fetch");
const jwkToPem = require("jwk-to-pem");

const region = COGNITO_REGION;
const userPoolId = USER_POOL_ID;
const url = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    if (res.message) {
      console.error(res.message);
      return process.exit(1);
    }

    if (!Array.isArray(res.keys) || res.keys.length === 0) {
      console.error("No keys present in response");
      console.log(res);
      return process.exit(1);
    }

    // map public-keys to pems, so the client/server don't need to do it
    // on every request
    const pems = res.keys.map((key) => ({ kid: key.kid, pem: jwkToPem(key) }));

    fs.writeFileSync(
      path.join(__dirname, "pems.json"),
      JSON.stringify(pems, null, 2)
    );
  });
