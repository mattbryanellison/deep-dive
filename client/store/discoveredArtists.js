const GET_DIVE_RESULTS = `GET_DIVE_RESULTS`;

const defaultDiscoveredArtists = [];

export default function (state = defaultDiscoveredArtists, action) {
  switch (action.type) {
    case GET_DIVE_RESULTS:
      return updateArtists(state, action.diveResults.id);
    default:
      return state;
  }
}

function updateArtists(artists, artistId) {
  if (artists.includes(artistId)) return artists;
  else return [...artists, artistId];
}
