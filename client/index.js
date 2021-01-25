import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core/";
import { green, blue } from "@material-ui/core/colors/";
import history from "./history";
import store from "./store";
import App from "./app";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: blue["100"],
    },
    background: {
      default: "#181616",
    },
  },
});

theme.typography.h1 = {
  fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
  fontWeight: 300,
  fontSize: "4rem",
  "@media (min-width:600px)": {
    fontSize: "6rem",
  },
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
);
