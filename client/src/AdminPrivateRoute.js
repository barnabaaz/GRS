import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MainContext } from "./context";
const AdminDashboard = React.lazy(() =>
  import("./components/AdminDashboard/Layout")
);
const AdminPrivateRoute = ({ setAdminAuth, adminAuth }) => {
  const context = useContext(MainContext);
  const { handleAdminAuth } = context;

  React.useEffect(() => {
    handleAdminAuth();
  }, []);
  return adminAuth ? (
    <AdminDashboard>
      <Outlet />{" "}
    </AdminDashboard>
  ) : (
    <Navigate to="/login-admin" />
  );
};

export default AdminPrivateRoute;
