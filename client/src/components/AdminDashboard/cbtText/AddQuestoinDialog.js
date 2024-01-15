import React from "react";
import {
  Dialog,
  TextField,
  Box,
  Typography,
  Button,
  InputAdornment,
  DialogTitle,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { Cancel, Check, Delete } from "@mui/icons-material";

const AddQuestoinDialog = ({
  openAddQuestionDialog,
  toast,
  setOpenAddQuestions,
  examId,
  getData,
}) => {
  const focusRef = React.useRef(null);
  const [question, setQuestion] = React.useState({
    questionText: "",
    answerOptions: [],
    isAnswerCorrect: false,
    chosenAnswer: "__none",
    examId: examId,
  });
  const [answerOption, setAnswerOptions] = React.useState({
    answerText: "",
    isCorrect: false,
    checked: false,
  });
  const handleAddQuestionClose = () => {
    setOpenAddQuestions(false);
  };
  const handleChange = (event) => {
    setQuestion({
      ...question,
      [event.target.name]: event.target.value,
    });
  };
  const handleAnswerOptionChange = (event) => {
    setAnswerOptions({
      ...answerOption,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddOptions = () => {
    if ((answerOption.answerText !== "") & (answerOption.answerText !== " ")) {
      question.answerOptions.push(answerOption);
      setAnswerOptions({
        ...answerOption,
        answerText: "",
        isCorrect: false,
        checked: false,
      });
    }
    focusRef.current.focus();
  };

  const handleDelete = (item) => {
    const newData = question.answerOptions.filter(
      (data) => data.answerText !== item
    );
    setQuestion({
      ...question,
      answerOptions: newData,
    });
  };
  const handleAddQuestion = () => {
    if (question.questionText !== "" && question.questionText !== " ") {
      fetch(`http://${window.location.hostname}:5000/question/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(question),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setAnswerOptions({
            ...answerOption,
            answerText: "",
            isCorrect: false,
            checked: false,
          });
          setQuestion({
            questionText: "",
            answerOptions: [],
            isAnswerCorrect: false,
            chosenAnswer: "__none",
            examId: examId,
          });
          setOpenAddQuestions(false);
          toast.success(res, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          getData();
        })
        .catch((res) => {
          toast.error(res, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };
  return (
    <Dialog
      open={openAddQuestionDialog}
      onClose={handleAddQuestionClose}
      fullWidth
    >
      <DialogTitle>Add Question</DialogTitle>
      <Box sx={{ display: "grid", p: 2 }}>
        <Box sx={{ display: "grid", mb: 1 }}>
          <TextField
            placeholder="Enter Question Text"
            name="questionText"
            value={question.questionText}
            multiline
            helperText="enter question"
            label="Question Text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"> </InputAdornment>
              ),
            }}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: "grid", mb: 1 }}>
          <TextField
            name="answerText"
            placeholder="Enter answer Text"
            value={answerOption.answerText}
            helperText="enter Answer"
            label="Answer Text"
            onChange={handleAnswerOptionChange}
            variant="outlined"
            inputRef={focusRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"> </InputAdornment>
              ),
            }}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="isCorrect"
              value={answerOption.isCorrect}
              row
              onChange={handleAnswerOptionChange}
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="NOT Correct"
              />
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Correct"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button variant="contained" onClick={handleAddOptions}>
            Add Option
          </Button>
        </Box>
        <div>
          <hr />
        </div>
        <Typography variant="h6">Answer Options</Typography>
        <Box>
          {question.answerOptions.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                marginBottom: 10,
              }}
            >
              <Typography>{item.answerText} </Typography>
              <i>{item.isCorrect ? <Check /> : <Cancel />}</i>
              <Box sx={{ display: "flex" }}>
                <Button
                  variant="contained"
                  onClick={() => handleDelete(item.answerText)}
                >
                  <Delete />
                </Button>
              </Box>
            </div>
          ))}
          <div>
            <hr />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "10px",
            }}
          >
            <Button variant="contained" onClick={handleAddQuestion}>
              Add Question
            </Button>
          </div>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddQuestoinDialog;
