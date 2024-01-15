import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, TextField } from "@mui/material";
import ProgressButton from "../ProgressButton";

const FormContainer = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
}));

const Login = ({
  username,
  password,
  handleLogin,
  handleChange,
  error,
  errorMessage,
  loading,
  success,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          fontWeight: 400,
          textAlign: "left",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "left" }}>
          STAFF LOGIN
        </Typography>
      </Box>
      <FormContainer onSubmit={handleLogin}>
        <TextField
          sx={{ width: "400px" }}
          variant="outlined"
          required
          label="username"
          name="username"
          value={username}
          onChange={handleChange}
          margin="normal"
          error={error}
          helperText={error ? errorMessage : "please Enter Username"}
        />
        <TextField
          sx={{ width: "400px" }}
          variant="outlined"
          type="password"
          required
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
          helperText={error ? errorMessage : "please Enter Username"}
          error={error}
          margin="normal"
        />

        <div
          style={{
            display: "flex",
            alignContent: "stretch",
            position: "relative",
          }}
        >
          <ProgressButton
            body="login"
            success={success}
            loading={loading}
            buttonType="submit"
          />
        </div>
      </FormContainer>
    </>
  );
};

export default Login;
