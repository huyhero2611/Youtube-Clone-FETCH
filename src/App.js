import React, { useState } from "react";
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

  const [viewport, setViewport] = useState(window.innerWidth > 1000);

  return (
    <div className={classes.root}>
      <Router>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            className="lg-12 md-12 sm-12 app__header"
            // style={{
            //   position: "fixed",
            //   top: 0,
            //   right: 0,
            //   left: 0,
            //   height: "50px",
            //   zIndex: 1,
            // }}
          >
            <Header />
          </Grid>
          {/* viewport of navbar > 739px */}
          <Grid
            item
            className="lg-2 md-2 sm-2 app__navbar"
            xs={2}
            className="app__navbar"
            // style={{
            //   position: "fixed",
            //   top: "50px",
            //   left: 0,
            //   zIndex: 1,
            //   paddingTop: "20px",
            // }}
          >
            <NavBar />
          </Grid>
          <Grid
            item
            className="lg-10 md-10 sm-10 app__content"
            xs={10}
            justify="space-around"
            // style={{
            //   position: "relative",
            //   left: "300px",
            //   top: "50px",
            //   paddingTop: "20px",
            //   zIndex: 0,
            // }}
          >
            <Switch>{RoutesManagement()}</Switch>
          </Grid>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
