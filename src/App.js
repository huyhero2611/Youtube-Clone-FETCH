import React, { useEffect, useState, Suspense } from "react";
import "./App.css";
import routes from "./router";
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";

function App(props) {
  const [showNavbar, setShowNavbar] = useState(true);

  const RoutesManagement = () => {
    if (routes.length > 0) {
      const route1 = routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ));
      return route1;
    } else {
      console.log("No component");
    }
  };
  return (
    <div>
      {/* <HashRouter> */}
      <Router>
        <Grid container spacing={0}>
          <Grid item xs={12} className="lg-12 md-12 sm-12 app__header">
            <Header setShowNavbar={setShowNavbar} />
          </Grid>
          <Grid item xs={12} className="lg-12 md-12 sm-12">
            <Suspense fallback={<p>Loading...</p>}>
              <Switch>{RoutesManagement()}</Switch>
            </Suspense>
          </Grid>
        </Grid>
      </Router>
      {/* </HashRouter> */}
    </div>
  );
}

export default App;
