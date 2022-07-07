Login with Unstoppable allows an Unstoppable Domain owner to log in to your application using their Ethereum or Polygon wallet. After successful login, your application can obtain profile information about the Unstoppable Domain user such as email, domain name, wallet address and proof of humanity.

## Prerequisites

1. An Auth0 account and tenant. [Sign up for free here](https://auth0.com/signup).
2. An Unstoppable Domains client ID. [Create one for free here](https://dashboard.auth.unstoppabledomains.com/).

## Set up Login with Unstoppable

1. Create a client ID
1. Add a redirect URI for your tenant
   1. Format is `https://TENANT_ID.us.auth0.com/login/callback`. Make sure to use the exact format above.
   1. Click the `+` button
1. Click advanced configuration
   1. Change "Token Endpoint Authentication Method" value
   1. Select "Client Secret Post"
1. Go back to top of page
   1. Click "rotate secret"
   1. Make note of the new `clientSecret` value in the configuration
   1. It will only be displayed once
1. Add custom branding to your client
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

## Test connection

You're ready to [test this Connection](https://auth0.com/docs/authenticate/identity-providers/test-connections).

## Troubleshooting

1. Make sure the `redirect_uri` is in the correct format
