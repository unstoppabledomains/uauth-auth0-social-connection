/* globals request */
module.exports = function fetchUserProfile(accessToken, context, callback) {
  request.get(
    {
      url: "https://auth.unstoppabledomains.com/userinfo",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    (err, resp, body) => {
      if (err) {
        return callback(err);
      }
      if (resp.statusCode !== 200) {
        return callback(new Error(body));
      }
      let bodyParsed;
      try {
        bodyParsed = JSON.parse(body);
      } catch (jsonError) {
        return callback(new Error(body));
      }

      // create a default profile with data that will be present regardless
      // of the requested scopes
      const profile = {
        user_id: bodyParsed.sub,
        app_metadata: {
          userInfo: bodyParsed,
        },
      };

      // expand with wallet data if present
      if (bodyParsed.wallet_address) {
        profile.app_metadata.wallet_address = bodyParsed.wallet_address;
      }

      // expand with email data if present
      if (bodyParsed.email) {
        profile.email = bodyParsed.email;
        profile.email_verified = bodyParsed.email_verified;
      }

      // expand with profile data if present
      if (bodyParsed.name) {
        profile.name = bodyParsed.name; 
      }
      if (bodyParsed.picture) {
        profile.picture = bodyParsed.picture;
      }

      // return the normalized profile
      return callback(null, profile);
    }
  );
};
