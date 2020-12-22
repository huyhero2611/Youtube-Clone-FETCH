import Home from "./pages/Home/Home";
import Watch from "./pages/Watch/Watch";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  //   {
  //     path: "/result",
  //     exact: true,
  //     main: <Result />,
  //   },
  {
    path: "/watch",
    exact: true,
    main: () => <Watch />,
  },
];

export default routes;

// export default {
//   routers,
// };
