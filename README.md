# Social Connection Integration template

This template is used to create Social Connections integrations.

## Documentation

- [Social Connection integration documentation](https://auth0.com/docs/customize/integrations/marketplace-partners/social-connections-for-partners)
- [Custom OAuth2 Connection documentation](https://auth0.com/docs/authenticate/identity-providers/social-identity-providers/oauth2s)

## Getting started

This repo contains all the files required to create an integration that our mutual customers can install. In the `integration` folder you'll find the following files:

### `recipe.json`

This file defines the template for the connection settings in Auth0. The following properties must be present:

* `authorizationURL` - this is the URL that Auth0 will use to redirect users. If this field needs to be dynamic, use `{{configuration_name}}` and a corresponding field `name` in the `configuration` property explained below.
* `tokenURL` - this is the URL that Auth0 will use to exchange the authorization code returned after login. This can also be dynamic, as explained above.
* `permissions` - this must contain an array of permission objects that the tenant admin can select when configuring this connection. Use the following properties to describe the permission(s):
    * `scope` - the value of the permission sent to the authorization URL via a `scope` parameter
    * `label` - the human-readable label for this permission shown to tenant admins
    * `required` - boolean to indicate whether this permission is always sent
    * `default` - boolean to indicate whether this checkbox should be checked by default (should be `true` if required)
* `configuration` - this must contain an array of form field objects that the tenant can use to configure their connection. This array must include a field with a name of `client_id` and `client_secret` to contain the credentials used for exchanging an authorization code. Use the following properties to describe the fields:
    * `name` - form field name used in the connection options object. If your authorization and/or token URL(s) are dynamic, this should match the value contained within the brackets. 
    * `label` - the human-readable label for this field shown to tenant admins
    * `description` - description text shown beneath the field
    * `required` - whether the field is required or not

### `fetchUserProfile.js`

This is the JavaScript that will run once an access token is returned. There are 2 `TODO` items here:

* Add the userinfo URL that should be called with the returned access token. Make sure that the authorization used against this endpoint is correct. 
* Add the logic to map the returned identity to the [Auth0 user profile](https://auth0.com/docs/manage-users/user-accounts/user-profiles/user-profile-structure#user-profile-attributes).

### `integration.action.spec.js`

This is the [Jest](https://jestjs.io/docs/using-matchers) unit test suite that will run against your completed fetch profile code. Add tests for success and failure paths.

### `installation_guide.md`

This is the Markdown-formatted instructions that tenant admins will use to install and configure your connection. This file has a number of `TODO` items that indicate what needs to be added. Your guide should retain the same format and general Auth0 installation steps.

## Build and test your Social Connection

We've included a few helpful scripts in a `Makefile` that should help you build, test, and submit a quality integration. You can develop your Action locally and use the commands below to lint, test, and deploy to a tenant.

The commands below require Docker to be installed and running on your local machine (though no direct Docker experience is necessary). Download and install Docker [using these steps for your operating system](https://docs.docker.com/get-docker/). 

* `make test` - this will run the Jest spec file explained above, along with a few other integrity checks.
* `make lint` - this will check and format your JS code according to our recommendations.
* `make deploy_init` - use this command to initialize deployments to a test tenant. You will need to [create a machine-to-machine application](https://auth0.com/docs/get-started/auth0-overview/create-applications/machine-to-machine-apps) authorized for the Management API with permissions `read:connections`, `update:connections`, `delete:connections`, and `create:connections`.
* `make deploy_get_token` - use this command after `deploy_init` to generate an access token
* `make deploy_create` - use this command to create a new connection based on the current integration files. If this successfully completes, you will see a URL in your terminal that will allow you to enable applications and try the connection.
* `make deploy_update` - use this command to update the created connection based on the current integration files.
* `make deploy_delete` - use this command to destoy the connection.

## Submit for review

When your integration has been written and tested, it's time to submit it for review.

1. Replace the `media/256x256-logo.png` file with an image of the same size and format (256 pixel square on a transparent background)
1. If you provided value-proposition columns and would like to include images, replace the `media/460x260-column-*.png` files with images of the same size and format; otherwise, delete these images before submitting
1. Run `make zip` in the root of the integration package and upload the resulting archive to the Jira ticket.

If you have any questions or problems with this, please reply back on the support ticket!

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://auth0.com/docs/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional [username/password databases](https://auth0.com/docs/connections/database/custom-db).
* Add support for [linking different user accounts](https://auth0.com/docs/link-accounts) with the same user.
* Support for generating signed [JSON Web Tokens](https://auth0.com/docs/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when, and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://auth0.com/docs/rules/current).

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file in this repo for more info.


