const axios = require("axios");

const getToken = require("./getToken");

//"Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer "
module.exports = async (searchTerm, limit = 1) => {
  try {
    const token = await getToken();
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const {
      data,
    } = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist&limit=${limit}`,
      { headers }
    );
    return data;
  } catch (err) {
    console.log(err.response.data);
    throw new Error("Get Search call failed: " + err.response.data);
  }
};
