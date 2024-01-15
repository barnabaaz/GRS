import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Typography } from "@mui/material";

const Container = styled(Paper)(({ theme }) => ({
  display: "grid",
  gridArea: "footer",
  justifyContent: "center",
  backgroundColor: "#1B263B",
  color: "#FEA82F",
  alignItems: "center",
  borderRadius: 0,
}));
const Footer = () => {
  return (
    <Container elevation={4}>
      <Typography fontWeight={500}>
        Designed And powered BarnaDev &copy; 2022
      </Typography>
    </Container>
  );
};

export default Footer;
