import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/Errors/NotFound";
import Forbidden from "../Pages/Errors/Forbidden";
import Loading from "../Components/Loading";
import Coverage from "../Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/data/warehouses.json").then((res) => res.json()),
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
