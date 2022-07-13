Login with Unstoppable allows an Unstoppable Domains user to access your application using their crypto wallet. After successful login, your application can receive profile information about the Unstoppable Domains user such as domain name, wallet address, email address and proof of humanity.

## Prerequisites

1. An Auth0 account and tenant. [Sign up for free here](https://auth0.com/signup).
2. A Login with Unstoppable client ID. [Create one for free here](https://dashboard.auth.unstoppabledomains.com/).

## Set up Login with Unstoppable

You will need two pieces of information from the Unstoppable Domains client dashboard: `client_id` and `client_secret`. These values will be used when you configure the Auth0 social connection.

1. Login to the Unstoppable Domains Client Dashboard
   1. Connect a crypto wallet such as Metamask
   1. Your client ID will be associated with the connected wallet
   1. Keep the keys to your wallet in a safe place256
1. Create a new client ID
   1. Make note of the `client_id` value at the top of the page
   1. **Use this value in the `Client ID` field on the Unstoppable Domains social connection**
1. Add a redirect URI for your tenant
   1. Login with Unstoppable expects the redirect URI to be `https://TENANT_ID.us.auth0.com/login/callback`
   1. Make sure to use the exact format above
   1. Click the `+` button to verify the URI
1. Click advanced configuration
   1. Find *Token Endpoint Authentication Method* option
   1. Select *Client Secret Post*
1. Go back to top of page
   1. Click the *Rotate Secret* button
   1. Make note of the new `clientSecret` value in the configuration (it will only be displayed once)
   1. **Use this value in the `Client Secret` field on the Unstoppable Domains social connection**
1. Add custom branding to your client (Recommended)
   1. Client name
   1. Client URI
   1. Logo URI
1. Click the save button to store your configuration

## Add the Connection

1. Select **Add Integration** (at the top of this page).
1. Read the necessary access requirements and click **Continue**.
1. Configure the integration using the following fields:
   * `client_id` - Use the client ID created at Unstoppable Domains
   * `client_secret` - Use the client secret when you created your client ID
1. Select the **Permissions** needed for your applications
1. Turn on or off syncing user profile attributes at each login
1. Select **Create**
1. Select the **Applications** tab and choose the Applications that should use this Connection to login

## Add custom claims (optional)

Some of the claims offered by Unstoppable Domains are outside the standard OAuth2 specification. Specifically, the `wallet_address` claim may be useful to
the dApp but is not included in the default profile. Adding a custom claim is very easy, and just requires a few one-time steps in your Auth0 dashboard.

See the Auth0's example to [Add custom claims to a token](https://auth0.com/docs/get-started/apis/scopes/sample-use-cases-scopes-and-claims#add-custom-claims-to-a-token). The
code to paste into the dashboard for the custom claim is below.

```js
/**
 * Handler that will be called during the execution of a PostLogin flow.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
  const { strategy, name: connection } = event.connection;
  const { configuration, secrets } = event;

  if (strategy !== "oauth2" || connection !== "social-connection-integration-test") {
    //This action only works for the unstoppable domains connection
    return;
  }

  const claim = "https://unstoppabledomains.com/wallet_address";
  const value = event.user.app_metadata.wallet_address;

  api.idToken.setCustomClaim(claim, value);
  api.accessToken.setCustomClaim(claim, value);
};
```

## Test connection

You're ready to [test this Connection](https://auth0.com/docs/authenticate/identity-providers/test-connections).

## Troubleshooting

1. Make sure the `redirect_uri` is in the correct format, as it must match exactly
   1. Check your tenant ID in the URI
   1. Check `http` vs `https`
   1. Remove the trailing slash if present
1. The `email` and `wallet` scopes are required, but all the other scopes are optional
