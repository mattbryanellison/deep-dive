const router = require("express").Router({ mergeParams: true });

module.exports = router;

const searchSpotify = require("../spotify/search");

// query strings = name (search term), count (num of artists to return)
// "/search"
router.get("/", async (req, res, next) => {
  const searchTerm = req.query.name;
  const response = await searchSpotify(searchTerm, req.query.count);
  const artistOptions = response.artists.items;
  res.json(artistOptions);
});
