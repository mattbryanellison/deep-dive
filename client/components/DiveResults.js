import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { connect } from "react-redux";

import ArtistCard from "./ArtistCard";

const DiveResults = (props) => {
  console.log(props.diveResults);
  return (
    <div>
      <Grid justify="center" container>
        <ArtistCard diveResults={props.diveResults} />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    diveResults: state.diveResults,
  };
};
export default connect(mapStateToProps, null)(DiveResults);
