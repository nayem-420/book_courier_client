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
import MyInventory from "../Pages/Dashboard/MyInventory/MyInventory";
import EditBook from "../Layouts/EditBook";
import MyProfile from "../Pages/Profile/MyProfile";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import MyBooks from "../Pages/Dashboard/MyBooks/MyBooks";
import ManageOrders from "../Pages/Dashboard/ManageUsers/ManageOrders";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

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
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
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
        index: true,
        element: <DashboardHome></DashboardHome>
      },
      // USER
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },

      // LIBRARIAN
      {
        path: "add-book",
        element: <Librarians></Librarians>,
      },
      {
        path: "my-books",
        element: <MyBooks></MyBooks>,
      },
      {
        path: "manage-orders",
        element: <ManageOrders></ManageOrders>,
      },
      {
        path: "my-inventory",
        element: <MyInventory></MyInventory>,
      },

      // COMMON
      {
        path: "edit-book/:id",
        element: <EditBook></EditBook>,
      },

      // ADMIN
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
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
