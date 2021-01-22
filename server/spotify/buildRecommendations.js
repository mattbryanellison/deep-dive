const getRelated = require("./getRelated");
const getToken = require("./getToken");

module.exports = async (
  startingArtistId,
  genre,
  exclusionList = [],
  discoveredList = []
) => {
  try {
    // get API token to reuse
    const token = await getToken();
    // tracks the number of cycles we get similar artists
    let count = 0;
    // represents the artist to be returned to user
    let artist;
    // represents the current artist used to find similar artists
    let searchArtistId = startingArtistId;
    // tracks the ids of all the artists used to find similar artists
    let searchArtists = [searchArtistId];
    // track info about the path leading to the artist
    let connectionPath = [];
    // tracks all the options that fit genre criteria, regardless of popularity
    let allOptions = [];
    discoveredList.push(startingArtistId);

    // find similar artists
    // keep looking if genre does not match with popularity under 55
    // do this 10 times max
    while (!artist && count < 10) {
      // gets a list of artists sorted by popularity with genre matching input criteria
      const options = await getSortedOptions(
        token,
        searchArtistId,
        genre,
        exclusionList
      );
      if (!options.length) break;
      // add these options to the list of all options
      allOptions = allOptions.concat(options);
      // if popularity criteria is met, assign the artist to return to user
      if (options[0].popularity < 55 && !discoveredList.includes(options[0].id))
        artist = options[0];
      else {
        // increment the number of cycles
        count++;
        // start an index to look for next available search artist
        let artistIdx = 0;
        // if the next artist has been used, increment the index
        // also break, if the index is longer than the options
        while (
          searchArtists.includes(options[artistIdx].id) &&
          artistIdx < options.length - 1
        ) {
          artistIdx++;
        }
        if (artistIdx === options.length) {
          break;
        }
        // reassign the search artist
        searchArtistId = options[artistIdx].id;
        // add search artist to list of search artists
        searchArtists.push(searchArtistId);
        connectionPath.push(JSON.parse(JSON.stringify(options[artistIdx])));
        console.log("Searching for artist :", options[artistIdx].name);
      }
      console.log("Searching : ", count);
    }
    // if no artist is found, try to get the least popular of all possible options, not including an artist on the discovered list
    if (!artist) {
      // if the next artist is on discovered list, increment the index
      // also break, if the index is longer than the options
      let artistIdx = 0;
      sortOptions(allOptions);
      while (
        discoveredList.includes(allOptions[artistIdx].id) &&
        artistIdx < allOptions.length - 1
      ) {
        artistIdx++;
      }
      if (artistIdx === allOptions.length) {
        throw new Error("Could not find a match");
      }
      console.log(connectionPath);
      artist = allOptions[artistIdx];
    }
    // if nothing is found at all, throw an error
    if (!artist) throw new Error("Could not find a match");
    artist.connectionPath = connectionPath;
    cleanConnectionPath(artist);
    return artist;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to build recommendations");
  }
};

const getSortedOptions = async (token, artistId, genre, exclusionList) => {
  try {
    // fetch related artists
    const options = await getRelated(artistId, token);
    if (!options) {
      console.log("Options is empty ", options);
      return options;
    }
    // filter out artists without matching genre
    let filteredOptions = options.filter((artist) => {
      return (
        artist.genres.includes(genre) && !exclusionList.includes(artist.id)
      );
    });
    // sort from least to most popular
    filteredOptions = sortOptions(filteredOptions);
    return filteredOptions;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get sorted options");
  }
};

const sortOptions = (options) => {
  return options.sort((a, b) => {
    return a.popularity - b.popularity;
  });
};

const cleanConnectionPath = (artist) => {
  let cutPoint;
  for (let i = 0; i < artist.connectionPath.length; i++) {
    if (artist.connectionPath[i].id === artist.id) {
      cutPoint = i;
      break;
    }
  }
  artist.connectionPath = artist.connectionPath.slice(0, cutPoint);
};
