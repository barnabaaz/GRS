import React from "react";
import { styled } from "@mui/material/styles";
import { Backdrop, Box } from "@mui/material";
const Container = styled(Box)(({ theme }) => ({
  display: "block",
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
}));
const Loader = styled(Box)(({ theme }) => ({
  display: "block",
  position: "relative",
  left: "50%",
  top: "50%",
  width: "150px",
  height: "150px",

  margin: "-75px 0 0 -75px",
  borderRadius: "50%",
  border: "10px solid transparent",
  borderTopColor: "rgb(67, 196, 196)",
  "-webkit-animation": "spin 2s linear infinite",
  animation: "spin 2s linear infinite",
  "&::before ": {
    content: "close-quote",

    top: "5px",
    left: "5px",
    right: "5px",
    bottom: "5px",
    position: "absolute",
    borderRadius: "50%",
    border: "7px solid transparent",
    borderTopColor: "turquoise",
    "-webkit-animation": "spin 3s linear infinite",
    animation: "spin 3s linear infiite",
  },
  "&::after": {
    content: "close-quote",

    top: "15px",
    left: "15px",
    right: "15px",
    bottom: "15px",
    position: "absolute",
    borderRadius: "50%",
    border: "5px solid transparent",
    borderTopColor: "rgb(59, 172, 160)",
    "-webkit-animation": "spin 1.5s linear infinite",
    animation: "spin 1.5s linear infiite",
  },
}));
const Spinner = () => {
  return (
    <Backdrop>
      <Container>
        <Loader />
      </Container>
    </Backdrop>
  );
};

export default Spinner;
