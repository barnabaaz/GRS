import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  TextField,
  InputAdornment,
  Typography,
  FormControl,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { AccountBox, Mail, Phone } from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  padding: 30,
}));
const Styledform = styled(Box)(({ theme }) => ({
  display: "grid",
  gridGap: 40,
  gridTemplateColumns: "1fr 1fr",
}));
const StyledCardOne = styled(Card)(({ theme }) => ({
  display: "grid",
  padding: 20,
}));
const StyledCardTwo = styled(Card)(({ theme }) => ({
  display: "grid",
  padding: 20,
}));

const ImageContainer = styled(Paper)(({ theme, user }) => ({
  height: "150px",
  width: "150px",
  display: "flex",
  marginBottom: 10,
  borderRadius: "50%",
  backgroundPosition: "top",
  padding: 0,
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundSize: "cover",

  position: "relative",
  flexDirection: "column",
  backgroundImage: `url(${user})`,
}));
const Input = styled("input")({
  display: "none",
});
const CreateNewStudentUser = ({
  user,
  handleChange,
  handleFileUpload,
  handleSubmit,
}) => {
  return (
    <Container>
      <div>
        <Styledform
          encType="multipart/form-data"
          component="form"
          onSubmit={handleSubmit}
        >
          <div style={{ display: "grid" }}>
            <Typography variant="body1" sx={{ mb: 1, pl: 3 }}>
              {" "}
              Basic user Information
            </Typography>
            <StyledCardOne elevation={4}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {" "}
                <ImageContainer
                  user={user.imSrc}
                  elevation={4}
                ></ImageContainer>
                <label htmlFor="contained-button-file">
                  <Input
                    // accept="image/*"
                    id="contained-button-file"
                    multiple
                    name="image"
                    onChange={handleFileUpload}
                    type="file"
                    required
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ width: "120px", backgroundColor: "#6c9668" }}
                  >
                    Upload
                  </Button>
                </label>
              </Box>
              <TextField
                required
                name="firstName"
                margin="normal"
                label="First Name"
                helperText="Please enter Your User First Name *"
                value={user.firstName}
                sx={{ color: "white" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <AccountBox />{" "}
                    </InputAdornment>
                  ),
                }}
                size="small"
                onChange={handleChange}
              />
              <TextField
                required
                helperText="Please enter Your User Last Name *"
                margin="normal"
                name="lastName"
                label="Last Name"
                value={user.LastName}
                onChange={handleChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBox />{" "}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                name="middleName"
                label="Middle Name"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBox />{" "}
                    </InputAdornment>
                  ),
                }}
                value={user.middleName}
                onChange={handleChange}
                size="small"
                helperText="Please enter Your middle Name *"
              />
            </StyledCardOne>
          </div>
          <div style={{}}>
            <Typography variant="body1" sx={{ mb: 1, pl: 3 }}>
              {" "}
              Other InFormation
            </Typography>
            <StyledCardTwo elevation={4}>
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  value={user.gender}
                  name="gender"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                label="PhoneNumber"
                value={user.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                margin="normal"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <Phone /> +234
                    </InputAdornment>
                  ),
                }}
                type="number"
                helperText="Enter Student Phone Number if any "
              />
              <TextField
                required
                label="Date of Birth"
                value={user.dateOfBirth}
                name="dateOfBirth"
                onChange={handleChange}
                margin="normal"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"> </InputAdornment>
                  ),
                }}
                type="date"
                helperText="Enter Student Date of Birth"
              />
              <TextField
                required
                type="text"
                label="Student Current Class"
                name="studentClass"
                value={user.studentClass}
                onChange={handleChange}
                helperText="Enter Student Current Class"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"> </InputAdornment>
                  ),
                }}
                margin="normal"
              />
            </StyledCardTwo>
          </div>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr" }}>
            <div>
              <Typography variant="body1" sx={{ mb: 1, pl: 3 }}>
                {" "}
                Contacts and Home Address
              </Typography>
              <Card
                elevation={4}
                sx={{
                  display: "grid",

                  gridColumnGap: 40,
                  padding: 3,
                }}
              >
                <TextField
                  label="State of origin *"
                  margin="normal"
                  size="small"
                  name="homeAddress"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> </InputAdornment>
                    ),
                  }}
                  type="text"
                  helperText="Please Enter your State of Origin"
                />
                <TextField
                  label="Local Government of Origin *"
                  margin="normal"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> </InputAdornment>
                    ),
                  }}
                  type="text"
                  helperText="Some important text"
                />
                <TextField
                  label="Home Address *"
                  margin="normal"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> </InputAdornment>
                    ),
                  }}
                  type="text"
                  helperText="Some important text"
                />
                <TextField
                  label="Home Address Two "
                  margin="normal"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> </InputAdornment>
                    ),
                  }}
                  type="text"
                  helperText="Some important text"
                />
              </Card>
            </div>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ mb: 1, pl: 3 }}>
              {" "}
              User Account Details
            </Typography>
            <Box sx={{ display: "grid" }}>
              <Card
                sx={{ display: "grid", gridColumn: "1/2", padding: 3 }}
                elevation={4}
              >
                <TextField
                  required
                  label="username"
                  name="username"
                  margin="normal"
                  value={user.username}
                  onChange={handleChange}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail />{" "}
                      </InputAdornment>
                    ),
                  }}
                  type="text"
                  helperText="Enter prefered users Username"
                />
                <TextField
                  required
                  label="Password * "
                  margin="normal"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> </InputAdornment>
                    ),
                  }}
                  type="password"
                  helperText="Enter user password"
                />
                <TextField
                  required
                  label="Confirm Paswword *"
                  margin="normal"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"> </InputAdornment>
                    ),
                  }}
                  type="password"
                  helperText="Confirm users Password"
                />
              </Card>
            </Box>
          </Box>
          <Box></Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "400px", bgcolor: "#6c9668" }}
            >
              Add User
            </Button>
          </Box>
        </Styledform>
      </div>
    </Container>
  );
};

export default CreateNewStudentUser;
