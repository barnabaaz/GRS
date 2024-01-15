import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gridArea: "footer",
  backgroundColor: "#999",
  justifyContent: "center",
  alignItems: "center",
}));

const Footer = () => {
  return (
    <Container>
      <Typography variant="body1">Hello from footer</Typography>
    </Container>
  );
};

export default Footer;
