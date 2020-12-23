import React from "react";
import "./App.css";
import routes from "./router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const RoutesManagement = () => {
    if (routes.length > 0) {
      const route = routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ));
      return route;
    } else {
      console.log("No component");
    }
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid className="" item xs={2}>
          <NavBar />
        </Grid>
        <Grid item xs={10}>
          <Router>
            <Switch>{RoutesManagement()}</Switch>
          </Router>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
