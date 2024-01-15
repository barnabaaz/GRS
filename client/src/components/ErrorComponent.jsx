import { Paper, Typography } from "@mui/material";
import React from "react";

const ErrorComponent = () => {
  return (
    <Paper elevation={4}>
      <Typography variant="h4">Server Error or Pages Does not Exist</Typography>
    </Paper>
  );
};

export default ErrorComponent;
