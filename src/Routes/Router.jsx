import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/Errors/NotFound";
import Forbidden from "../Pages/Errors/Forbidden";
import Loading from "../Components/Loading";
import Coverage from "../Coverage/Coverage";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../Layouts/DashboardLayout";
import Librarians from "../Pages/Dashboard/Librarians/Librarians";
import Books from "../Pages/Home/Books/Books";
import BookDetails from "../Pages/Home/Books/BookDetails";
import PaymentsSuccess from "../Pages/Dashboard/Payments/PaymentsSuccess";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import ManageOrders from "../Pages/Dashboard/ManageOrders/ManageOrders";
import MyInventory from "../Pages/Dashboard/MyInventory/MyInventory";
import EditBook from "../Layouts/EditBook";

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
        path: "librarians",
        element: (
          <PrivateRoutes>
            <Librarians></Librarians>
          </PrivateRoutes>
        ),
      },
      {
        path: "all-books",
        element: <Books></Books>,
      },
      {
        path: "all-books/:id",
        element: <BookDetails></BookDetails>,
      },
      {
        path: "payment-success",
        element: <PaymentsSuccess></PaymentsSuccess>,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/data/warehouses.json").then((res) => res.json()),
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forget-password",
        Component: ForgetPassword,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "my-inventory",
        element: <MyInventory></MyInventory>,
      },
      {
        path: "edit-book/:id",
        element: <EditBook></EditBook>
      },
      {
        path: "manage-orders",
        element: <ManageOrders></ManageOrders>,
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
