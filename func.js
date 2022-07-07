function(accessToken, context, callback) {
  request.get(
  {
    url: 'https://auth.unstoppabledomains.com/userinfo',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
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
    const profile = {
      user_id: bodyParsed.sub,
      name: bodyParsed.sub,
      nickname: bodyParsed.sub,
      email: bodyParsed.email,
      email_verified: bodyParsed.email_verified,
      app_metadata: {
        wallet_address: bodyParsed.wallet_address
      }
    };
    callback(null, profile);
  }
);
}