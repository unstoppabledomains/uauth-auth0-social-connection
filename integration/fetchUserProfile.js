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
        return callback(new Error("Error retrieving callback"));
      }
      let bodyParsed;
      try {
        bodyParsed = JSON.parse(body);
      } catch (jsonError) {
        return callback(new Error("Error parsing user data"));
      }

      // create a default profile with data that will be present regardless
      // of the requested scopes
      const profile = {
        user_id: bodyParsed.sub,
        name: bodyParsed.sub,
        app_metadata: {},
        user_metadata: {
          social: {},
        },
      };

      // expand with wallet data if present
      if (bodyParsed.wallet_address) {
        profile.app_metadata.wallet_address = bodyParsed.wallet_address;
        profile.app_metadata.chain_id = 1;
      }
      if (bodyParsed.verified_addresses) {
        profile.app_metadata.verified_addresses = bodyParsed.verified_addresses;
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
      if (bodyParsed.location) {
        profile.user_metadata.location = bodyParsed.location;
      }
      if (bodyParsed.profile) {
        profile.user_metadata.profileURL = bodyParsed.profile;
      }
      if (bodyParsed.website) {
        profile.user_metadata.websiteURL = bodyParsed.website;
      }
      if (bodyParsed.humanity_check_id) {
        profile.user_metadata.humanityCheckId = bodyParsed.humanity_check_id;
      }
      if (bodyParsed.discord) {
        profile.user_metadata.social.discord = bodyParsed.discord;
      }
      if (bodyParsed.twitter) {
        profile.user_metadata.social.twitter = bodyParsed.twitter;
      }
      if (bodyParsed.youtube) {
        profile.user_metadata.social.youtube = bodyParsed.youtube;
      }
      if (bodyParsed.reddit) {
        profile.user_metadata.social.reddit = bodyParsed.reddit;
      }
      if (bodyParsed.telegram) {
        profile.user_metadata.social.telegram = bodyParsed.telegram;
      }

      // return the normalized profile
      return callback(null, profile);
    }
  );
};
