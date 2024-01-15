import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Main from "../../pages/StudentDashboard/Main";
import Sidebar from "../../pages/StudentDashboard/Sidebar";

const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  height: "100vh",
  gridTemplateColumns: "1fr",
}));

const Layout = () => {
  return (
    <Container>
      <Sidebar />
      <Main />
    </Container>
  );
};

export default Layout;
