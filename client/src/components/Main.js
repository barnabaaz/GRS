import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button, LinearProgress, Paper } from "@mui/material";
import ExamQuestion from "./ExamQuestions";
import CountDownTimer from "./CountDownTimer";
import { useNavigate, useParams } from "react-router-dom";
import ActionDialogue from "./ActionDialogue";

const Container = styled(Box)(({ theme }) => ({
  background: "#fcf6f5ff",
  display: "flex",
  gridArea: "main",
  position: "relative",
  flexDirection: "column",
  overflow: "hidden",
  width: "100%",
}));
const HeaderContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: 70,
  position: "fixed",
  width: "-webkit-calc(100% - 250px)",
  zIndex: 1,
  marginBottom: 0,
}));
const BodyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingLeft: 10,

  marginTop: 80,
  overflowY: "auto",
}));

const Main = ({ handleLogOut, time, counter, setCounter, updateTime }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [answeredQuestion, setAnsweredQuestion] = React.useState(null);
  const [questions, setQuestions] = React.useState(null);

  const GetData = async () => {
    try {
      const res = await fetch(
        `http://${window.location.hostname}:5000/result/${params.id}`,
        {
          method: "GET",
        }
      );
      const parsedResponse = await res.json();
      setQuestions(parsedResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  React.useEffect(() => {
    GetData();
  }, []);
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0 && questions.finished !== true) {
        setCounter((prev) => (prev * 60 - 30) / 60);
        updateTime();
      }
    }, 30000);

    return () => clearInterval(interval);
  });

  React.useEffect(() => {
    if (answeredQuestion !== null) {
      async function FetchData() {
        try {
          await fetch(`http://${window.location.hostname}:5000/result`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(answeredQuestion),
          }).then((response) => response.json());
        } catch (err) {
          console.error(err.message);
        }
      }
      FetchData();
      GetData();
    }
  }, [answeredQuestion]);

  const handleEndTest = () => {
    setOpen(true);
    fetch(`http://${window.location.hostname}:5000/result/end-test`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ examId: params.id }),
    }).then(() => navigate("/"));
  };
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  return (
    <Container>
      <ActionDialogue
        open={open}
        setOpen={setOpen}
        handleClickOk={handleEndTest}
        dialogueTitle={"Comfirm End Test"}
        contentText={
          "Are you sure You want to End Test ? This Action is not Reversible"
        }
      />
      {time && questions && !questions.finished && (
        <HeaderContainer elevation={4}>
          <Box>
            <Typography variant="h6"> Subject Mathematics </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              justifyContent: "stretch",
              gridTemplateColumns: "2fr 5fr 2fr",
              alignItems: "center",
              gridGap: 10,
            }}
          >
            <Typography>Time Start Left</Typography>
            <Box sx={{ width: "100%" }}>
              <LinearProgress style={{}} />
            </Box>
            <CountDownTimer time={time} handleTimeUp={handleEndTest} />
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                color: "#000",
                backgroundColor: "#FEA82F",
                "&:hover": { backgroundColor: "#d38922", color: "#222" },
              }}
              onClick={() => setOpen(true)}
            >
              End Test
            </Button>
          </Box>
        </HeaderContainer>
      )}
      <BodyContainer>
        <ExamQuestion
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          answeredQuestion={answeredQuestion}
          questions={questions}
          setAnsweredQuestion={setAnsweredQuestion}
        />
      </BodyContainer>
    </Container>
  );
};

export default Main;
