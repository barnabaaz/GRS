import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { FormControlLabel, Switch, InputAdornment } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({
  open,
  setOpen,
  editData,
  setEditData,
  getData,
  toast,
}) {
  const questionText = React.createRef();
  const ansText = [];
  const correctAnswer = [];

  if (editData) {
    for (var i = 0; i < editData.answerOptions.length; ++i) {
      ansText[i] = React.createRef();
      correctAnswer[i] = React.createRef();
    }
  }

  const [newData, setNewData] = React.useState(null);
  const handleSave = (event) => {
    let answerText = ansText.map((item) => item.current.value);
    let answerOptions = correctAnswer.map((item, index) => ({
      answerText: answerText[index],
      isCorrect: item.current.checked,
    }));
    setNewData({
      questionId: editData._id,
      examId: editData.examId,
      question: {
        questionText: questionText.current.value,
        answerOptions,
        isAnswerCorrect: false,
      },
    });
    setOpen(false);
  };
  React.useEffect(() => {
    if (newData) {
      fetch(
        `http://${window.location.hostname}:5000/question/update-question`,
        {
          method: "POST",
          body: JSON.stringify(newData),
          headers: { "Content-type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((res) => {
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
        .catch((res) =>
          toast.error(res, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
  }, [newData]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle> Edit question </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              defaultValue={editData && editData.questionText}
              label="Question"
              name="questionText"
              inputRef={(inputValue) => (questionText.current = inputValue)}
              type="text"
              fullWidth
              multiline
              onChange={handleChange}
              variant="standard"
            />
            {editData &&
              editData.answerOptions.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 1fr ",
                    gridGap: 3,
                  }}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    label={`option ${index + 1}`}
                    type="text"
                    fullWidth
                    defaultValue={item.answerText}
                    variant="standard"
                    inputRef={(inputValue) =>
                      (ansText[index].current = inputValue)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"> </InputAdornment>
                      ),
                    }}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked={item.isCorrect}
                        inputRef={(value) =>
                          (correctAnswer[index].current = value)
                        }
                      />
                    }
                    label="correct"
                  />
                </div>
              ))}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}> save </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
