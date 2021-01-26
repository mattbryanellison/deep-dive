
const SET_ARTIST = `SET_ARTIST`;

const defaultArtist = {};

export const setArtist = (artist) => ({ type: SET_ARTIST, artist });

export default function (state = defaultArtist, action) {
  switch (action.type) {
    case SET_ARTIST:
      return action.artist;
    default:
      return state;
  }
}