import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Grid, TextField, Card, Fragment, Avatar } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import history from "../history";

import { setArtist } from "../store/searchArtist";

const styles = {
  avatar: {
    marginRight: "5px",
  },
};

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
      <Grid item xs={10}>
        <Autocomplete
          id="size-small-standard"
          size="small"
          options={this.state.artistOptions}
          noOptionsText="We couldn't find anything!"
          autoHighlight={true}
          onInputChange={this.onTyping}
          getOptionLabel={(option) => (option.name ? option.name : "")}
          renderOption={(option) => {
            return (
              <React.Fragment>
                {option.images[0] ? (
                  <Avatar style={styles.avatar} src={option.images[0].url} />
                ) : null}
                {option.name}
              </React.Fragment>
            );
          }}
          getOptionSelected={this.onOptionSelected}
          onChange={this.onSelected}
          value={this.searchValue}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Start with one of your favorite artists!"
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
