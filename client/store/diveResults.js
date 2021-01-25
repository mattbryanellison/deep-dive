import axios from "axios";

const GET_DIVE_RESULTS = `GET_DIVE_RESULTS`;

const defaultDiveResults = {
  images: [],
};

export const setDiveResults = (diveResults) => ({
  type: GET_DIVE_RESULTS,
  diveResults,
});

export const fetchDiveResults = (artistId, genre) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/artist/${artistId}/recommendations?genre=${genre}`
    );
    dispatch(setDiveResults(data));
  } catch (err) {
    console.error(err);
  }
};

export default function (state = defaultDiveResults, action) {
  switch (action.type) {
    case GET_DIVE_RESULTS:
      return action.diveResults;
    default:
      return state;
  }
}
