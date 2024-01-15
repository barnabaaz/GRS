import React from "react";
import CreateQuestionsUI from "../../../components/AdminDashboard/cbtText/createQuestions";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";

const CreateQuestions = (props) => {
  const content = {
    entityMap: {},
    blocks: [
      {
        key: "637gr",
        text: "Initialized from content state.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  };
  const contentState = convertFromRaw(content);
  // const [editorStateTwo, setEditorStateTwo] = React.useState(() =>
  //   EditorState.createEmpty()
  // );

  // const onEditorStateTwo = (editorStateTwo) => {
  //   setEditorStateTwo(editorState);
  //   let newData = questionData.answerOptions.push({
  //     answerText: draftToMarkdown(
  //       convertToRaw(editorState.getCurrentContent())
  //     ),
  //   });
  // };
  const [count, setCount] = React.useState(0);

  const [headerData, setHeaderData] = React.useState({
    subjectClass: "",
    examDuration: "",
    questions: [{ answerText: "", isCorrect: false }],
    subject: "",
    term: "",
    academicSession: "",
  });
  const [questionData, setQuestionData] = React.useState({
    questionText: "",
    answerOptions: [],
    isAnswerCorrect: false,
    examId: "",
    choosenAnswer: "__none__",
  });
  const [answerOptions, setAnswerOptions] = React.useState({
    answerText: "",
    isCorrect: false,
    checked: false,
  });
  const handleAnswerOPtionsChange = (event) => {
    setAnswerOptions({
      ...answerOptions,
      [event.target.name]: event.target.value,
    });
    console.log(answerOptions.isCorrect);
  };

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setQuestionData({
      ...questionData,
      questionText: draftToMarkdown(
        convertToRaw(editorState.getCurrentContent())
      ),
    });
  };
  const [active, setActive] = React.useState(false);

  const handleChange = (e) => {
    setHeaderData({
      ...headerData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectchange = (event) => {
    setHeaderData({
      ...headerData,
      subjectClass: event.target.value,
    });
  };
  const handleSelectchangeTerm = (event) => {
    setHeaderData({
      ...headerData,
      term: event.target.value,
    });
  };

  const handleAddOptions = () => {
    if (
      (answerOptions.answerText !== "") &
      (answerOptions.answerText !== " ")
    ) {
      questionData.answerOptions.push(answerOptions);
      setAnswerOptions({
        ...answerOptions,
        answerText: "",
        isCorrect: false,
        checked: false,
      });
    }
  };
  const handleDelete = (item) => {
    const newData = questionData.answerOptions.filter(
      (data) => data.answerText !== item
    );
    setQuestionData({
      ...questionData,
      answerOptions: newData,
    });
  };
  // const handleEdit = () => {
  //   setActive(!active);
  // };

  const handleHeaderSubmit = async (event) => {
    event.preventDefault();
    if (questionData.examId === "") {
      try {
        const res = await fetch(
          `http://${window.location.hostname}:5000/question/header`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(headerData),
          }
        );
        const parsedResponse = await res.json();
        setQuestionData({
          ...questionData,
          examId: parsedResponse,
        });
        setActive(true);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      const res = await fetch(
        `http://${window.location.hostname}:5000/question/edit-header`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            examId: questionData.examId,
            examDuration: headerData.examDuration,
            subjectClass: headerData.subjectClass,
            term: headerData.term,
            academicSession: headerData.academicSession,
            subject: headerData.subject,
          }),
        }
      );
      const parsedResponse = await res.json();
      console.log(parsedResponse);
    }
  };
  const handleAddQuestions = async () => {
    try {
      console.log(questionData.choosenAnswer);
      const response = await fetch(
        `http://${window.location.hostname}:5000/question/insert`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(questionData),
        }
      );
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      setQuestionData({
        ...questionData,
        questionText: "",
        answerOptions: [],
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setActive(false);
  };
  console.log(questionData.examId);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CreateQuestionsUI
      open={open}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      headerData={headerData}
      handleSelectchange={handleSelectchange}
      handleChange={handleChange}
      handleAddOptions={handleAddOptions}
      handleSelectchangeTerm={handleSelectchangeTerm}
      active={active}
      handleHeaderSubmit={handleHeaderSubmit}
      setQuestionData={setQuestionData}
      questionData={questionData}
      handleAddQuestions={handleAddQuestions}
      setEditorStat={setEditorState}
      handleAnswerOPtionsChange={handleAnswerOPtionsChange}
      onEditorStateChange={onEditorStateChange}
      editorState={editorState}
      contentState={contentState}
      handleChange2={handleChange2}
      answerOptions={answerOptions}
      handleDelete={handleDelete}
    />
  );
};
export default CreateQuestions;
