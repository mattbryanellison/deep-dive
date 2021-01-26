import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@material-ui/core";
import history from "../history";
import { ArrowBack, Home } from "@material-ui/icons";

const Navbar = (props) => {
  const goHome = () => {
    history.push("/");
  };
  const goBack = () => {
    history.goBack();
  };
  const styles = {
    appBar: {
      backgroundColor: "#181616",
    },
    title: {
      flexGrow: 1,
    },
  };
  return (
    <AppBar style={styles.appBar} position="static">
      <Toolbar>
        <Tooltip title={props.backTitle}>
          <IconButton onClick={goBack} edge="start" color="inherit">
            <ArrowBack color="primary" />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" style={styles.title}></Typography>
        <Tooltip title="Start Over">
          <IconButton onClick={goHome} edge="start" color="inherit">
            <Home color="primary" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
