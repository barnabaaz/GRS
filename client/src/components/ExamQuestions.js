// has user started exams before
// if yes get all previous answered questions and generate randomly remain questions
// if no generates all questions randomly

//******************
// get all available questions and loop through them
// set current questions using question index
// save checked question and answer to db and question number

import React from "react";

import { makeStyles } from "@mui/styles";
import { Typography, Button, Box, Container, Paper } from "@mui/material";
import { Check } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  paper: {
    color: "#444",
    justifyContent: "center",
    padding: 15,
    display: "flex",
    alignItems: "cener",
    alignContent: "center",
    borderRadius: "10px",
    flexDirection: "column",
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  answerContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  styledButton: {
    color: "#444",
    justifyContent: "left",
    borderRadius: "10px",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  navigationButtons: {
    cursor: "pointer",
    marginRight: "10px",
    padding: 0,
  },
  finishTest: {
    marginTop: 10,
  },
  upperContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ExamQuestions = ({
  currentQuestion,
  setCurrentQuestion,
  answeredQuestion,
  questions,
  setAnsweredQuestion,
  handleLogOut,
}) => {
  const classes = useStyles();
  //
  const HandleAnswerButtonClicked = async (isAnswerCorrect, id) => {
    if (isAnswerCorrect) {
      setAnsweredQuestion({
        ...answeredQuestion,
        isAnswerCorrect: true,
        questionId: questions.answeredQuestions[currentQuestion]._id,
        answerId: id,
        examId: questions._id,
      });
    } else {
      setAnsweredQuestion({
        ...answeredQuestion,
        isAnswerCorrect: false,
        questionId: questions.answeredQuestions[currentQuestion]._id,
        answerId: id,
        examId: questions._id,
      });
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.answeredQuestions.length) {
      setCurrentQuestion(nextQuestion);
      // } else {
      //   setShowScore(true);
      //   GetData();
      //   // const score = questions.filter((lenght) => lenght.isAnswerCorrect).length;
      //   // setScore(score);
      //   setCurrentQuestion(0);
      // }
    }
  };
  // const [score, setScore] = React.useState(0);
  // const GetScore = () => {
  //   GetData();
  //   const score = questions.filter((lenght) => lenght.isAnswerCorrect).length;
  //   console.log(score);
  // };

  const [section, setSection] = React.useState(false);

  return (
    <Container sx={{ mt: 3, mb: 3 }}>
      {questions && questions.finished ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Paper
            sx={{
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">
              This test has Already been Taken
            </Typography>
          </Paper>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignContent: "start",
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                color: "#000",
                backgroundColor: "#FEA82F",
                "&:hover": { backgroundColor: "#d38922", color: "#222" },
              }}
              onClick={() => setSection(!section)}
            >
              {section ? "section A" : "section B"}
            </Button>
          </Box>
          {section ? (
            <div> Section B </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyItems: "space-between",
              }}
            >
              <div className={classes.paper}>
                <div className={classes.questionContainer}>
                  <span>
                    <Typography variant="h4">
                      Questions {currentQuestion + 1}
                      <span style={{ fontSize: "18px" }}>
                        /{" "}
                        {questions
                          ? questions.answeredQuestions.length
                          : "..loading"}
                      </span>
                    </Typography>
                  </span>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, pl: 3, fontWeight: 500 }}
                  >
                    {questions &&
                      questions.answeredQuestions[currentQuestion]
                        .questionText}{" "}
                  </Typography>
                </div>
                <div className={classes.answerContainer}>
                  {questions &&
                    questions.answeredQuestions[
                      currentQuestion
                    ].answerOptions.map((item, index) => (
                      <Button
                        className={classes.styledButton}
                        fullWidth
                        size="small"
                        variant="outlined"
                        key={index}
                        sx={{
                          backgroundColor: `${item.checked && "#1B263B"}`,
                          mb: 1,
                        }}
                        onClick={() =>
                          HandleAnswerButtonClicked(item.isCorrect, item._id)
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            color: `${item.checked && "white"}`,
                            "&:hover": {
                              color: `${item.checked && "#444"}`,
                            },
                          }}
                        >
                          <p>{item.answerText} </p>
                          <i> {item.checked && <Check />} </i>{" "}
                        </Box>
                      </Button>
                    ))}
                </div>
              </div>
              <div className={classes.buttonContainer}>
                {questions &&
                  questions.answeredQuestions.map((item, index) => (
                    <Button
                      className={classes.navigationButtons}
                      variant="outlined"
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      sx={{
                        mb: 1,
                        backgroundColor: `${
                          item.answerOptions.some((data) => {
                            let answer = data.checked;
                            return answer;
                          }) && "#FEA82F"
                        }`,
                        color: "#000",
                      }}
                    >
                      {index + 1}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ExamQuestions;
