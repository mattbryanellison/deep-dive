import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { indigo, blue } from "@material-ui/core/colors/";

const SearchHeader = () => {
  const styles = {
    headerGrid: {
      // background: "linear-gradient(217deg,#2fa6e2,#b5bcff)",
      background: "linear-gradient(#bce1ff, #060b42, #181616)",
    },
    headerText: {
      marginTop: "20px",
      marginBottom: "15px",
    },
  };
  return (
    <Grid style={styles.headerGrid} item xs={12}>
      <Typography style={styles.headerText} variant="h1">
        DeepDive
      </Typography>
    </Grid>
  );
};

export default SearchHeader;
