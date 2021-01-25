import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Grid, TextField, Card } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import history from "../history";

import { setArtist } from "../store/searchArtist";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
      artistOptions: [],
    };
    this.onTyping = this.onTyping.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.onOptionSelected = this.onOptionSelected.bind(this);
  }

  async onTyping(e, val, reason) {
    if (reason === "reset") return;
    if (val === "") {
      this.setState({ artistOptions: [], searchValue: val });
    } else {
      const { data } = await axios.get(`/api/search?name=${val}&count=5`);
      this.setState({ artistOptions: data, searchValue: val });
    }
  }

  onOptionSelected(option, value) {
    return true;
  }

  onSelected(e, val, reason) {
    this.props.selectArtist(val);
    history.push("/selectGenre");
  }

  render() {
    return (
      <Grid item xs={12}>
        <Autocomplete
          id="size-small-standard"
          size="small"
          options={this.state.artistOptions}
          noOptionsText="Enter Artist Name"
          onInputChange={this.onTyping}
          getOptionLabel={(option) => (option.name ? option.name : "")}
          getOptionSelected={this.onOptionSelected}
          onChange={this.onSelected}
          value={this.searchValue}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Deep Dive Artist"
              placeholder=""
              fullWidth
            />
          )}
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectArtist: (artist) => {
      dispatch(setArtist(artist));
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
