import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { MainContext } from "./context";
const StaffDashboardLayout = React.lazy(() =>
  import("./pages/staffDashboard/StaffIndexPage")
);
const StaffProvateRoute = () => {
  const context = React.useContext(MainContext);
  const { staffAuth, handleStaffAuth } = context;

  React.useEffect(() => {
    handleStaffAuth();
  }, []);
  return staffAuth ? (
    <StaffDashboardLayout>
      <Outlet />
    </StaffDashboardLayout>
  ) : (
    <Navigate to="/login-staff" />
  );
};

export default StaffProvateRoute;
