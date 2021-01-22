const axios = require("axios");

const getToken = require("./getToken");

//"Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer "
module.exports = async (artistId, token) => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log(
      "CALLING: ",
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`
    );
    const {
      data,
    } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      { headers }
    );

    return data.artists;
  } catch (err) {
    console.log(err.response.data);
    throw new Error("Get Related Call Failed: " + err.response.data);
  }
};
