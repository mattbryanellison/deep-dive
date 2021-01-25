const SET_GENRE = `SET_GENRE`;

const defaultGenre = ``;

export const setGenre = (genre) => ({ type: SET_GENRE, genre });

export default function (state = defaultGenre, action) {
  switch (action.type) {
    case SET_GENRE:
      return action.genre;
    default:
      return state;
  }
}
