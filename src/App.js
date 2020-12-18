import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";

import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid className item xs={2}>
          <Paper className={classes.paper}>xs=2</Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>xs=10</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
