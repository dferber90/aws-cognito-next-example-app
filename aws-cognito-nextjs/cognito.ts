import cookie from "cookie";

const unauthenticatedCookies = {
  lastUser: null,
  idToken: null,
  accessToken: null,
};

// returns all auth cookies
export function getCognitoCookieInfo(
  cookieString: string | undefined,
  userPoolClientId: string
): {
  lastUser: string | null;
  idToken: string | null;
  accessToken: string | null;
} {
  if (!cookieString) return unauthenticatedCookies;

  const cookieData: { [key: string]: string } = cookie.parse(cookieString);
  const prefix = `CognitoIdentityServiceProvider.${userPoolClientId}`;
  const lastUserKey = `${prefix}.LastAuthUser`;
  const lastUser = cookieData[lastUserKey] ? cookieData[lastUserKey] : null;

  const idTokenKey = lastUser
    ? `${prefix}.${encodeURIComponent(lastUser)}.idToken`
    : null;
  const idToken =
    idTokenKey && cookieData[idTokenKey] ? cookieData[idTokenKey] : null;
  const accessTokenKey = lastUser
    ? `${prefix}.${encodeURIComponent(lastUser)}.accessToken`
    : null;
  const accessToken =
    accessTokenKey && cookieData[accessTokenKey]
      ? cookieData[accessTokenKey]
      : null;

  return { lastUser, idToken, accessToken };
}

export function getOAuthConfig({
  redirectAfterSignIn = "/",
  redirectAfterSignOut = process.env.REDIRECT_SIGN_OUT,
}: {
  redirectAfterSignIn?: string;
  redirectAfterSignOut?: string;
} = {}) {
  return {
    domain: process.env.IDP_DOMAIN,
    scope: ["email", "openid"],
    // we need the /autologin step in between to set the cookies properly,
    // we don't need that when signing out though
    redirectSignIn: `${process.env.REDIRECT_SIGN_IN}?to=${encodeURIComponent(
      redirectAfterSignIn
    )}`,
    redirectSignOut: redirectAfterSignOut,
    responseType: "token",
  };
}
