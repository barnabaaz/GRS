import { Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
const Container = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));
const Erro404 = () => {
  return (
    <Container>
      <Typography variant="h4">Error 404 page Not Found</Typography>
    </Container>
  );
};

export default Erro404;
