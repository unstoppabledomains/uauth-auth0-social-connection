Login with Unstoppable allows an Unstoppable Domains user to access your application using their crypto wallet. After successful login, your application can receive profile information about the Unstoppable Domains user such as domain name, wallet address, email address and proof of humanity.

## Prerequisites

1. An Auth0 account and tenant. [Sign up for free here](https://auth0.com/signup).
2. A Login with Unstoppable client ID. [Create one for free here](https://dashboard.auth.unstoppabledomains.com/).

## Set up Login with Unstoppable

Connecting Auth0 to Unstoppable Domains requires the simple one-time creation of a client ID for your application. In the end, you need two pieces of information from the Unstoppable Domains client dashboard: `client_id` and `client_secret`. These values will be pasted directly into text fields in your new Auth0 social connection.

### Demo video

Detailed instructions are provided below, but sometimes it helps to watch a video. https://www.loom.com/share/f1655c8e94cc464188472eea80d0f921

### Detailed instructions

1. Login to the Unstoppable Domains [Client Dashboard](https://dashboard.auth.unstoppabledomains.com/)
   1. Connect a crypto wallet such as Metamask
   1. Your client ID will be associated with the connected wallet
   1. Keep the keys to your wallet in a safe place
1. Create a new client ID
   1. Click the "New Client" button on your dashboard landing page
   1. Make note of the `client_id` value at the top of the page
   1. **Use this value in the `Client ID` field on the Unstoppable Domains social connection**
1. Add a redirect URI for your tenant
   1. Login with Unstoppable expects the redirect URI to be `https://TENANT_ID.us.auth0.com/login/callback`
   1. Enter your Auth0 tenant's redirect URI into the "Add Redirect URI" text field
   1. Click the `+` button to verify the URI
1. Click "Advanced" tab in the Configure menu
   1. Scroll to bottom of the page
   1. Find *Token Endpoint Authentication Method* option
   1. Select *Client Secret Post*
1. Click the "Save changes" button
1. Click "Basic" tab in the Configure menu
   1. Make note of the new `clientSecret` value in the configuration (it will only be displayed once)
   1. **Use this value in the `Client Secret` field on the Unstoppable Domains social connection**
   1. You can create a new secret at any time using the "Rotate Secret" button
1. Add custom branding to your client (optional)
   1. Click the "Branding" tab in the Configure menu
   1. Enter any application specific values to be displated on your Login with Unstoppable login page
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
the dApp but is not included in the default profile. Adding a custom claim is very easy, and just requires a few one-time steps in your Auth0 tenant.

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

  if (strategy !== "oauth2" || connection !== "unstoppable-domains") {
    //This action only works for the unstoppable domains connection
    return;
  }

  const claim = "https://unstoppabledomains.com/wallet_address";
  const value = event.user.app_metadata.wallet_address;

  api.idToken.setCustomClaim(claim, value);
  api.accessToken.setCustomClaim(claim, value);
};
```

The same approach can be used to access any of the `app_metadata` or `user_metadata` stored
in the Auth0 user created after a successful login.

### Example user object

As an example of available user data, consider the following sample user created by Auth0 through the Unstoppable Domains integration.

```json
{
    "app_metadata": {
        "wallet_address": "0xCD0DAdAb45bAF9a06ce1279D1342EcC3F44845af",
        "chain_id": 1
    },
    "created_at": "2022-08-25T20:33:06.469Z",
    "email": "aaronquirk.x@ud.me",
    "email_verified": true,
    "identities": [
        {
            "provider": "oauth2",
            "user_id": "unstoppable-domains|aaronquirk.x",
            "connection": "unstoppable-domains",
            "isSocial": true
        }
    ],
    "name": "Aaron Quirk",
    "nickname": "aaronquirk.x",
    "picture": "https://storage.googleapis.com/unstoppable-client-assets/images/user/5919054/3cd1b52b-686d-416d-9444-374581d38184.jpeg",
    "updated_at": "2022-09-13T12:55:30.500Z",
    "user_id": "oauth2|unstoppable-domains|aaronquirk.x",
    "user_metadata": {
        "social": {
            "twitter": "5quirks"
        },
        "location": "Raleigh, NC",
        "profileURL": "https://ud.me/aaronquirk.x"
    },
    "last_ip": "71.69.169.160",
    "last_login": "2022-09-13T12:55:30.500Z",
    "logins_count": 12,
    "blocked_for": [],
    "guardian_authenticators": []
}
```

## Test connection

You're ready to [test this Connection](https://auth0.com/docs/authenticate/identity-providers/test-connections).

## Troubleshooting

1. Make sure the `redirect_uri` is in the correct format, as it must match exactly
   1. Check your tenant ID in the URI
   1. Check `http` vs `https`
   1. Remove the trailing slash if present
1. The `email` and `wallet` scopes are required, but all the other scopes can be specified as optional
1. Only configure your app to use the `:optional` or standard scope for each scope pair
   1. For example, use either `social` or `social:optional`
   1. Each `:optional` flavor allows user to opt-out of the scope at the login prompt
