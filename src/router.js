import Home from "./pages/Home/Home";
import Result from "./pages/Result/Result";
import Watch from "./pages/Watch/Watch";
import PlayVideo from "./components/PlayVideo/PlayVideo";
import Channel from "./pages/Channel/Channel";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/result/:inputSearch",
    exact: true,
    main: ({ match }) => <Result match={match} />,
  },
  {
    path: `/watch/:videoId`,
    exact: true,
    main: ({ match, location }) => <Watch match={match} location={location} />,
  },
  {
    path: `/channel/:channelId`,
    exact: true,
    main: ({ match, location }) => (
      <Channel match={match} location={location} />
    ),
  },
];

export default routes;
