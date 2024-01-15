import React from "react";
import { styled } from "@mui/material/styles";
// import draftToHtml from "draftjs-to-html";
// import draftToMarkdown from "draftjs-to-markdown";

// import { convertToRaw } from "draft-js";
import {
  Box,
  Paper,
  TextField,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  MenuItem,
  FormHelperText,
  Select,
  Switch,
  FormControlLabel,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Check, Cancel, Delete } from "@mui/icons-material";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Container = styled(Box)(({ theme }) => ({
  marginTop: 20,
  padding: 20,
  display: "flex",
  flexDirection: "column",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: 20,

  display: "grid",
  gridColumnGap: 20,
}));
const StyledForm = styled("form")(({ theme }) => ({
  display: "grid",
}));

const StyledPaperTwo = styled(Paper)(({ theme }) => ({
  display: "grid",
  padding: 20,
}));

const AnswerPaper = styled(Paper)(({ theme }) => ({
  marginTop: "40px",
  display: "grid",
  padding: "30px",
}));
const CreateQuestions = ({
  questionData,
  headerData,
  answerOptions,
  handleEdited,
  handleSelectchange,
  handleSelectchangeTerm,
  handleAddOptions,
  handleDelete,
  handleAddQuestions,
  active,
  handleClickOpen,
  open,
  onEditorStateChange,
  handleClose,
  // setQuestionData,
  handleChange,
  handleChange2,
  handleHeaderSubmit,
  editorState,
  handleAnswerOPtionsChangeCheck,
  handleAnswerOPtionsChange,
  // setEditorState,
  onContentStateChange,
  // contentState,
}) => {
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [sectionA, setSectionA] = React.useState(true);
  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleChecked2 = (event) => {
    setChecked2(event.target.checked);
  };
  return (
    <Container>
      <StyledPaper elevation={4} sx={{ mb: 2 }}>
        <StyledForm onSubmit={handleHeaderSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: 15,
            }}
          >
            <FormControl margin="dense">
              <InputLabel>Term *</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                value={headerData.term}
                label="Term"
                size="small"
                name="term"
                onChange={handleSelectchangeTerm}
                disabled={active}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"First Term "}>First Term</MenuItem>{" "}
                <MenuItem value={"Secound Term"}>Second Term</MenuItem>
                <MenuItem value={"Third Term "}>Third Term</MenuItem>
              </Select>
              <FormHelperText>Please Select class</FormHelperText>
            </FormControl>
            <TextField
              required
              size="small"
              name="academicSession"
              margin="dense"
              label="Academic Seesion"
              helperText="Enter Academic Session"
              value={headerData.academicSession}
              onChange={handleChange}
            />
            <FormControl margin="dense">
              <InputLabel>Class</InputLabel>
              <Select
                value={headerData.subjectClass}
                label="Class*"
                size="small"
                name="subjectClass"
                onChange={handleSelectchange}
                disabled={active}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Pre Nursery "}>Pre Nursery</MenuItem>{" "}
                <MenuItem value={"Nursery One"}>Nursery One</MenuItem>
                <MenuItem value={"Nursery Two"}>Nursery Two</MenuItem>
                <MenuItem value={"Primary One"}>Primary One</MenuItem>
                <MenuItem value={"Primary Two"}>Primary Two</MenuItem>
                <MenuItem value={"Primary Three"}>Primary Three</MenuItem>
                <MenuItem value={"Primary Four"}>Primary Four</MenuItem>
                <MenuItem value={"Primary Five"}>Primary Five</MenuItem>
              </Select>
              <FormHelperText>Please Select class</FormHelperText>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gridGap: 15,
            }}
          >
            <TextField
              required
              size="small"
              name="subject"
              margin="dense"
              label="Subject"
              helperText="Enter Subect Title"
              value={headerData.subject}
              onChange={handleChange}
              disabled={active}
            />
            <TextField
              required
              size="small"
              name="examDuration"
              margin="dense"
              type="number"
              label="exam Duration"
              helperText="Enter Exam duration in Minutes"
              value={headerData.examDuration}
              onChange={handleChange}
              disabled={active}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              disabled={active}
              type="submit"
            >
              Set
            </Button>
            <Button
              variant="contained"
              disabled={!active}
              onClick={handleClickOpen}
            >
              Edit
            </Button>
          </Box>
        </StyledForm>
      </StyledPaper>
      <Box sx={{ mb: 2 }}>
        <Typography>Switch To Section B</Typography>
        <Switch
          size="large"
          variant="contained"
          onClick={() => setSectionA(!sectionA)}
        >
          {sectionA ? "Section B" : "Section A"}
        </Switch>
      </Box>
      {/* Questions container  */}
      <>
        {sectionA ? (
          <>
            <StyledPaperTwo elevation={4}>
              <Typography variant="h5"> Question </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr" }}>
                <Box sx={{ display: "flex", justifySelf: "flex-start" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={checked}
                        onChange={handleChecked}
                        disabled
                      />
                    }
                    label="switch for a RichText"
                    labelPlacement="top"
                  />
                </Box>
                {checked ? (
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="editorToolBar"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    onContentStateChange={onContentStateChange}
                  />
                ) : (
                  <TextField
                    required
                    size="small"
                    name="questionText"
                    autoFocus
                    value={questionData.questionText}
                    type="text"
                    placeholder="this is is a text area that support multi line"
                    label="Question"
                    helperText="use the Switch to Change for A richText box for entering equations and the likes"
                    onChange={handleChange2}
                    multiline
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                )}
              </Box>
            </StyledPaperTwo>
            <StyledPaperTwo elevation={4} sx={{ mt: 5 }}>
              <Typography variant="h5"> Enter Answer Option </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gridGap: 15,
                }}
              >
                <Box sx={{ display: "flex", justifySelf: "flex-start" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={checked2}
                        disabled
                        onChange={handleChecked2}
                      />
                    }
                    label="switch for a RichText"
                    labelPlacement="top"
                  />
                </Box>
                {checked2 ? (
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="editorToolBar"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    onContentStateChange={onContentStateChange}
                  />
                ) : (
                  <TextField
                    required
                    size="small"
                    name="answerText"
                    value={answerOptions.answerText}
                    type="text"
                    placeholder="this is is a text area that support multiline"
                    label="Question"
                    helperText="use the Switch to Change for A richText box for entering equations and the likes"
                    onChange={handleAnswerOPtionsChange}
                    multiline
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                )}
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    {" "}
                    is Answer Option Correct ?{" "}
                  </FormLabel>
                  <RadioGroup
                    name="isCorrect"
                    value={answerOptions.isCorrect}
                    onChange={handleAnswerOPtionsChange}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Not Correct"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Correct"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleAddOptions}>
                  Add Options
                </Button>
              </Box>
            </StyledPaperTwo>
            {questionData.questionText && (
              <AnswerPaper>
                <Typography variant="h5"> Question</Typography>
                <Typography sx={{ pl: 3, mt: 2, mb: 2 }}>
                  {" "}
                  {questionData.questionText}{" "}
                </Typography>

                {questionData.answerOptions.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          marginLeft: "40px",
                        }}
                      >
                        <Typography key={index} sx={{ mr: 2 }}>
                          {item.answerText}
                        </Typography>
                        {item.isCorrect ? (
                          <Check key={index} sx={{ color: "green" }} />
                        ) : (
                          <Cancel key={index} sx={{ color: "red" }} />
                        )}
                        <Button
                          key={index}
                          onClick={() => handleDelete(item.answerText)}
                        >
                          {" "}
                          <Delete />{" "}
                        </Button>
                      </div>
                    </>
                  );
                })}
                <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                  <Button variant="contained" onClick={handleAddQuestions}>
                    Add Question
                  </Button>
                </Box>
              </AnswerPaper>
            )}
          </>
        ) : (
          <>
            <Paper
              sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column" }}
            >
              <TextField
                required
                size="small"
                name="questionText"
                type="text"
                fullWidth
                placeholder="question"
                label="Enter Section Instruction "
                helperText="this is is a text area that support multi line"
                onChange={handleChange2}
                multiline
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <div style={{ margin: "20px 0" }}>
                <hr />
              </div>

              <TextField
                required
                size="small"
                name="questionText"
                type="text"
                fullWidth
                placeholder="question"
                label="Enter Question Text"
                helperText="this is is a text area that support multi line"
                onChange={handleChange2}
                multiline
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Button variant="contained">Add Question</Button>
              </Box>
            </Paper>
          </>
        )}
      </>
    </Container>
  );
};

export default CreateQuestions;

// <Typography>
// {editorState &&
//   draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
// </Typography>
