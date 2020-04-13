import React from "react";
import { Token } from "../aws-cognito-nextjs";

// When a user comes back from authenticating, the url looks like this:
//   /autosignin#id_token=....
// At this point, there will be no cookies yet. If we would render any page on
// the server now, it would seem as-if the user is not authenticated yet.
//
// We therefore wait until Amplify has set its cookies. It does this
// automatically because the id_token hash is present. Then we redirect the
// user back to the main page. That page can now use SSR as the user will have
// the necessary cookies ready.
export default function TokenSetter() {
  return (
    <Token>
      <p>loading..</p>
    </Token>
  );
}
