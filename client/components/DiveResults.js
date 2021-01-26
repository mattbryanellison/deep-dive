import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import ArtistCard from "./ArtistCard";
import Navbar from "./Navbar";
import { fetchDiveResults } from "../store/diveResults";

const DiveResults = (props) => {
  const [disabled, setDisabled] = useState(false);

  const styles = {
    button: {
      marginTop: "2em",
      // width: "5em",
    },
  };
  const diveAgain = async () => {
    setDisabled(true);
    await props.dive(
      props.diveResults.id,
      props.genre,
      props.discoveredArtists
    );
    setDisabled(false);
  };
  return (
    <div>
      <Navbar backTitle="Choose Genre" />
      {props.diveResults.id ? (
        <Grid
          justify="center"
          align="center"
          direction="column"
          spacing={0}
          container
        >
          <Grid item xs={12}>
            <ArtistCard artist={props.diveResults} />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={disabled}
              style={styles.button}
              size="large"
              variant="outlined"
              onClick={diveAgain}
            >
              Dive Again
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    diveResults: state.diveResults,
    genre: state.searchGenre,
    discoveredArtists: state.discoveredArtists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dive: async (artistId, genre, discoveredArtists) => {
      await dispatch(fetchDiveResults(artistId, genre, discoveredArtists));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DiveResults);
