import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Rider from "../pages/Rider/Rider";
import PrivateRoutes from "./PrivateRoutes";
import SendParcel from "../pages/send-percel/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import Payment from "../pages/Dashboard/payment/Payment";
import PaymentSuccess from "../pages/Dashboard/payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Unauthorized from "../pages/Errors/Unauthorized";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import MyProfile from "../pages/MyProfile/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/401",
        Component: Unauthorized,
      },
      {
        path: "/my-profile",
        element: <PrivateRoutes>
          <MyProfile/>
        </PrivateRoutes>
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/be-a-rider",
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
        element: (
          <PrivateRoutes>
            <Rider></Rider>
          </PrivateRoutes>
        ),
      },
      {
        path: "/send-parcel",
        loader: () => fetch("/warehouses.json").then((res) => res.json()),

        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: 
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>,
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      ///rider only routes
      {
        path: 'assigned-deliveries',
        
      },
      /// admin only routes
      {
        path: "approve-riders",
        // Component: ApproveRiders
        element: <AdminRoute>
          <ApproveRiders/>
        </AdminRoute>
      },
      {
        path: "users-management",
        // Component: UsersManagement
        element: <AdminRoute>
          <UsersManagement/>
        </AdminRoute>
      },
      {
        path: "assign-riders",
        // Component: UsersManagement
        element: <AdminRoute>
          <AssignRiders/>
        </AdminRoute>
      },
    ],
  },
]);

export default router