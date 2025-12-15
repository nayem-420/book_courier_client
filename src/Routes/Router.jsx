import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/Errors/NotFound";
import Forbidden from "../Pages/Errors/Forbidden";
import Loading from "../Components/Loading";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/forbidden",
    Component: Forbidden,
  },
  {
    path: "/loading",
    Component: Loading,
  },
]);
