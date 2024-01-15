import React from "react";
import { styled } from "@mui/material/styles";

import Main from "./Main";
import SideBar from "./SideBar";
import { Box } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "250px 1fr",
  height: "100vh",
  overflow: "hidden",
  position: "relative",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const Layout = () => {
  return (
    <Container>
      <SideBar />
      <Main />
    </Container>
  );
};

export default Layout;
