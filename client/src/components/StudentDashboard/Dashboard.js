import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Paper,
  Table,
  TableContainer,
  Typography,
  TableRow,
  TableHead,
  TableCell,
  Stepper,
  Step,
  StepLabel,
  TableBody,
} from "@mui/material";
import { MainContext } from "../../context";

import AlertDialogSlide from "../AlertDialog";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "60% 40%",
  gridTemplateRows: "1fr 1fr 1fr",
  padding: 20,
  width: "100%",
  gridGap: 20,
}));
const LeftPanel = styled(Box)(({ theme }) => ({
  display: "grid",
  gridGap: 20,
  gridRow: "1/3",
}));
const RightPanel = styled(Paper)(({ theme }) => ({
  display: "grid",
  height: "100%",
  gridRow: "1/2",
  padding: "20px",
  borderRadius: "15px",
  backgroundColor: "#fff",
}));
const StyledCard = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  display: "flex",
  zIndex: 1,
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  transition: "color .5s ease 0s",

  "&::before": {
    content: "close-quote",
    width: "100%",
    paddingTop: "100%",
    position: "absolute",
    borderRadius: "50%",
    left: "-50%",
    top: 0,
    zIndex: -1,
    transform: "scale(0)",
    transition: "transform .8s ease 0s",
    backgroundColor: "#605d86",
  },
  "&:hover::before": {
    transform: "scale(3)",
  },
  "&:hover": {
    color: "white",
  },
}));
const Dashboard = ({ questionData, handleTakeTest }) => {
  const context = React.useContext(MainContext);
  const { userId } = context;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  // const handleTakeTest = async () => {
  //   await fetch(`http://${window.location.hostname}:5000/result/start-exams`, {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       studentClass: userId.studentClass,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setData(res);
  //       console.log(data);
  //     })
  //     .catch((err) => console.error(err.message));
  // };

  return (
    <>
      <AlertDialogSlide
        open={open}
        setOpen={setOpen}
        handleClickOK={() => console.log("hello")}
        dialogContent={" are you sure you want to exist ?"}
        title={"Confirm Exist"}
      />
      <Container>
        <LeftPanel>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "10px",
            }}
          >
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "20px",
                borderRadius: "15px",
              }}
              elevation={4}
            >
              {!questionData ? (
                <>
                  <i>
                    <QuizTwoToneIcon
                      sx={{ fontSize: "5rem", color: "#355e13e8" }}
                    />
                  </i>
                  <Typography> No scheduled Test </Typography>
                </>
              ) : (
                <>
                  <i>
                    <QuizTwoToneIcon
                      sx={{ fontSize: "5rem", color: "#355e13e8" }}
                    />
                  </i>
                  <Box sx={{ display: "grid", alignItems: "space-evenly" }}>
                    <Typography>
                      {" "}
                      {questionData && questionData[0].subject}{" "}
                    </Typography>

                    <Typography>
                      {" "}
                      Duration:{questionData &&
                        questionData[0].examDuration}{" "}
                      min{" "}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={handleTakeTest}
                    >
                      {" "}
                      Take Test{" "}
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
          </Box>
          <Box>
            <Typography variant="h6"> Records </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> Subject </TableCell>
                    <TableCell> Term </TableCell>
                    <TableCell> Session </TableCell>
                    <TableCell> Score </TableCell>
                    <TableCell> Avarage Score </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell> Mathematics </TableCell>
                    <TableCell> First Term </TableCell>
                    <TableCell> 2021/2022 </TableCell>
                    <TableCell> 80 </TableCell>
                    <TableCell> 75 </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> Mathematics </TableCell>
                    <TableCell> First Term </TableCell>
                    <TableCell> 2021/2022 </TableCell>
                    <TableCell> 80 </TableCell>
                    <TableCell> 75 </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> Mathematics </TableCell>
                    <TableCell> First Term </TableCell>
                    <TableCell> 2021/2022 </TableCell>
                    <TableCell> 80 </TableCell>
                    <TableCell> 75 </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> Mathematics </TableCell>
                    <TableCell> First Term </TableCell>
                    <TableCell> 2021/2022 </TableCell>
                    <TableCell> 80 </TableCell>
                    <TableCell> 75 </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> Mathematics </TableCell>
                    <TableCell> First Term </TableCell>
                    <TableCell> 2021/2022 </TableCell>
                    <TableCell> 80 </TableCell>
                    <TableCell> 75 </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </LeftPanel>
        <RightPanel>
          <Typography variant="h6">Scheduled Exams</Typography>
          <Stepper orientation="vertical">
            {questionData &&
              questionData.map((item) => (
                <Step key={item._id}>
                  <StepLabel>{item.subject} </StepLabel>
                </Step>
              ))}
          </Stepper>
        </RightPanel>
      </Container>
    </>
  );
};

export default Dashboard;
