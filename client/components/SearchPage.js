import React from "react";
import { Grid } from "@material-ui/core";

import SearchHeader from "./SearchHeader";
import SearchBar from "./SearchBar";

const SearchPage = () => {
  return (
    <div>
      <Grid container justify="center">
        <SearchHeader/>
        <SearchBar />
      </Grid>
    </div>
  );
};

export default SearchPage;
