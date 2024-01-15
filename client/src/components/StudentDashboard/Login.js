import React from "react";
import { styled } from "@mui/material/styles";
import { Button, Box, Typography, TextField } from "@mui/material";

const FormContainer = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
}));

const Login = ({ loginDetails, handleChange, handleLogin }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",

          fontWeight: 500,
          textAlign: "center",
        }}
      >
        <Typography variant="h4">Student Login</Typography>
      </Box>
      <FormContainer onSubmit={handleLogin}>
        <TextField
          sx={{ width: "400px" }}
          variant="outlined"
          required
          label="username"
          name="username"
          onChange={handleChange}
          margin="dense"
          error={loginDetails.error}
          value={loginDetails.username}
          helperText={
            loginDetails.error
              ? loginDetails.errorText
              : "Please enter username"
          }
        />
        <TextField
          sx={{ width: "400px" }}
          variant="outlined"
          required
          label="Password"
          error={loginDetails.error}
          onChange={handleChange}
          type="password"
          name="password"
          value={loginDetails.password}
          margin="dense"
          helperText={
            loginDetails.error
              ? loginDetails.errorText
              : "Please enter user Password"
          }
        />
        <Button variant="contained" size="large" sx={{ mt: 1 }} type="submit">
          Login
        </Button>
      </FormContainer>
    </>
  );
};

export default Login;
