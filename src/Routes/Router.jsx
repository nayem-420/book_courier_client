import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

import Home from "../Pages/Home/Home";
import Books from "../Pages/Home/Books/Books";
import BookDetails from "../Pages/Home/Books/BookDetails";
import PaymentsSuccess from "../Pages/Dashboard/Payments/PaymentsSuccess";
import Coverage from "../Coverage/Coverage";
import MyProfile from "../Pages/Profile/MyProfile";

import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgetPassword from "../Pages/Auth/ForgetPassword";

import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyInventory from "../Pages/Dashboard/MyInventory/MyInventory";
import EditBook from "../Layouts/EditBook";
import MyBooks from "../Pages/Dashboard/MyBooks/MyBooks";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageOrders from "../Pages/Dashboard/ManageUsers/ManageOrders";
import Librarians from "../Pages/Dashboard/Librarians/Librarians";

import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import { SellerRoute } from "./SellerRoute";
import NotFound from "../Pages/Errors/NotFound";
import Forbidden from "../Pages/Errors/Forbidden";
import Loading from "../Components/Loading";
import BecomeSeller from "../Pages/Dashboard/SellerOrderDataRow/BecomeSeller";
import SellerRequests from "../Pages/Dashboard/SellerOrderDataRow/SellerRequests";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-books", element: <Books /> },
      { path: "all-books/:id", element: <BookDetails /> },
      { path: "payment-success", element: <PaymentsSuccess /> },
      {
        path: "coverage",
        element: <Coverage />,
        loader: () => fetch("/data/warehouses.json").then((res) => res.json()),
      },
      { path: "my-profile", element: <MyProfile /> },
    ],
  },

  // Auth routes
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
    ],
  },

  // Dashboard routes (Protected)
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <MyOrders /> },

      // USER
      { path: "my-orders", element: <MyOrders /> },
      { path: "become-seller", element: <BecomeSeller /> },

      // SELLER
      {
        path: "add-book",
        element: (
          <SellerRoute>
            <Librarians />
          </SellerRoute>
        ),
      },
      { path: "my-books", element: <MyBooks /> },
      { path: "my-inventory", element: <MyInventory /> },
      { path: "manage-orders", element: <ManageOrders /> },

      // COMMON
      { path: "edit-book/:id", element: <EditBook /> },

      // ADMIN
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "seller-requests",
        element: (
          <AdminRoute>
            <SellerRequests />
          </AdminRoute>
        ),
      },
    ],
  },

  // Fallback routes
  { path: "*", element: <NotFound /> },
  { path: "/forbidden", element: <Forbidden /> },
  { path: "/loading", element: <Loading /> },
]);
