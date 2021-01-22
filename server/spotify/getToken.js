const axios = require("axios");
const qs = require("qs");

module.exports = async (
  clientId = process.env.SPOTIFY_CLIENT_ID,
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET
) => {
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: "client_credentials",
  };

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
    );
    console.log("GOT A TOKEN: ", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.log(err.response.data);
    throw new Error("Get Token call failed: " + err.response.data);
  }
};
