import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@material-ui/core";

import Navbar from "./Navbar";
import history from "../history";
import { setGenre } from "../store/searchGenre";
import { fetchDiveResults, clearResults } from "../store/diveResults";

const SelectGenre = (props) => {
  const styles = {
    colorGrid: {
      // background: "linear-gradient(217deg,#2fa6e2,#b5bcff)",
      background: "linear-gradient(#bce1ff, #060b42, #181616)",
    },
    genreContainer: {
      paddingTop: "2em",
      paddingLeft: "1em",
      paddingRight: "1em",
    },
    button: {
      width: "100%",
    },
    text: {
      wordWrap: "break-word",
    },
    avatarContainer: {
      paddingTop: "1em",
      paddingBottom: "1em",
    },
  };
  if (!props.genres) {
    history.push("/");
  }

  const getGenreText = (artistName) => {
    const firstHalf = "Select one of ";
    let middle;
    if (artistName[artistName.length - 1] === "s") middle = `${artistName}'`;
    else middle = `${artistName}'s`;
    return firstHalf + middle + " genres";
  };

  const onGenreSelect = (e) => {
    props.clear();
    props.selectGenre(e.currentTarget.value);
    props.dive(
      props.searchArtistId,
      e.currentTarget.value,
      props.discoveredArtists
    );

    history.push("/dive");
  };
  return (
    <div>
      <Navbar backTitle="Choose Artist" />
      <Grid
        align="center"
        container
        direction="column"
        justify="center"
        spacing={0}
      >
        {props.genres ? (
          <div>
            <div style={styles.colorGrid}>
              <Grid item xs={12} style={styles.avatarContainer}>
                <Avatar
                  style={{ width: "50%", height: "50%" }}
                  src={
                    props.searchArtist.images[0]
                      ? props.searchArtist.images[0].url
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">
                  {getGenreText(props.searchArtist.name)}
                </Typography>
              </Grid>
            </div>

            <Grid style={styles.genreContainer} item xs={12}>
              <Grid container spacing={4} justify="space-around">
                {props.genres.map((genre) => {
                  return (
                    <Grid key={genre} xs={4} item>
                      <Grid alignContent="flex-start" container>
                        <Button
                          style={styles.button}
                          size="large"
                          variant="outlined"
                          color="primary"
                          value={genre}
                          // wordWrap="break-word"
                          onClick={onGenreSelect}
                        >
                          <Typography style={styles.text}>{genre}</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </div>
        ) : null}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    genres: state.searchArtist.genres,
    searchArtistId: state.searchArtist.id,
    searchArtist: state.searchArtist,
    discoveredArtists: state.discoveredArtists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectGenre: (genre) => {
      dispatch(setGenre(genre));
    },
    dive: (artistId, genre, discoveredArtists) => {
      dispatch(fetchDiveResults(artistId, genre, discoveredArtists));
    },
    clear: () => dispatch(clearResults()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectGenre);
