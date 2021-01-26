import axios from "axios";

const GET_DIVE_RESULTS = `GET_DIVE_RESULTS`;
const CLEAR_RESULTS = `CLEAR_RESULTS`;

const defaultDiveResults = {
  images: [],
};

export const setDiveResults = (diveResults) => ({
  type: GET_DIVE_RESULTS,
  diveResults,
});

export const clearResults = () => ({
  type: CLEAR_RESULTS,
});

export const fetchDiveResults = (artistId, genre, discoveredArtists) => async (
  dispatch
) => {
  try {
    let endpoint = `/api/artist/${artistId}/recommendations?genre=${genre}`;
    if (discoveredArtists) {
      endpoint += `&discoveredList=${discoveredArtists.join(",")}`;
    }
    console.log(endpoint);
    const { data } = await axios.get(endpoint);
    dispatch(setDiveResults(data));
  } catch (err) {
    console.error(err);
  }
};

export default function (state = defaultDiveResults, action) {
  switch (action.type) {
    case GET_DIVE_RESULTS:
      return action.diveResults;
    case CLEAR_RESULTS:
      return defaultDiveResults;
    default:
      return state;
  }
}
