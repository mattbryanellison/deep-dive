const router = require("express").Router({ mergeParams: true });
const buildRecommendations = require("../spotify/buildRecommendations");

module.exports = router;

// query params: genre, exclusionList "id1,id2,id3", discoveredList= "id1,id2"
router.get("/:artistId/recommendations", async (req, res, next) => {
  try {
    const exclusionList = req.query.exclusionList
      ? req.query.exclusionList.split(",")
      : [];
    const discoveredList = req.query.discoveredList
      ? req.query.discoveredList.split(",")
      : [];
    const response = await buildRecommendations(
      req.params.artistId,
      req.query.genre,
      exclusionList,
      discoveredList
    );
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});
