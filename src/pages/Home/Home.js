import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import { TimePublishToNow, FormatNum, ViewNumberFormatter } from "../../utils";
import "./Home.css";

//test most popular
import VideoList from "../../components/VideoList/VideoList";

function Home() {
  return (
    <div className="home">
      <VideoList />
    </div>
  );
}

export default Home;
