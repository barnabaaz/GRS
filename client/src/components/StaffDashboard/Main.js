import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
const Container = styled(Box)(({ theme }) => ({
  display: "block",
  overflowY: "auto",
  backgroundColor: "#ececec",
  padding: "20px",
}));
const OutletContainer = styled(Box)(() => ({}));

const Main = () => {
  return (
    <Container>
      <Header />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
};

export default Main;
