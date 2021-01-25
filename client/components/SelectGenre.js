import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Card, CardContent, Button } from "@material-ui/core";

import history from "../history";
import { setGenre } from "../store/searchGenre";
import { fetchDiveResults } from "../store/diveResults";

const SelectGenre = (props) => {
  if (!props.genres) {
    history.push("/");
  }

  const onGenreSelect = (e) => {
    props.selectGenre(e.currentTarget.value);
    props.dive(props.searchArtistId, e.currentTarget.value);
    history.push("/dive");
  };
  return (
    <div>
      {props.genres ? (
        <Grid item xs={12}>
          <Typography variant="h4">Select a genre for diving!</Typography>
          {props.genres.map((genre) => {
            return (
              <Button
                variant="outlined"
                color="primary"
                key={genre}
                value={genre}
                onClick={onGenreSelect}
              >
                {genre}
              </Button>
            );
          })}
        </Grid>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    genres: state.searchArtist.genres,
    searchArtistId: state.searchArtist.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectGenre: (genre) => {
      dispatch(setGenre(genre));
    },
    dive: (artistId, genre) => {
      dispatch(fetchDiveResults(artistId, genre));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectGenre);
