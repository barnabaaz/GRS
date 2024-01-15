import React from "react";
import EditDialogue from "./EditDialogue";
import { Cancel, Check } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import DeleteDialogue from "../../ActionDialogue";
import { ToastContainer, toast } from "react-toastify";
import HeaderEditDialog from "./HeaderEditDialog";
import AddQuestoinDialog from "./AddQuestoinDialog";

const EditCbt = ({ data, id, handleClickOk, getData }) => {
  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openHeaderEdit, setOpenHeaderEdit] = React.useState(false);
  const [openDelete, setDelete] = React.useState({
    open: false,
    questionId: "",
    examId: "",
  });
  const [section, setSection] = React.useState(true);
  const [editData, setEditData] = React.useState(null);
  const handleEdit = (item, id) => {
    setEditData({ ...item, examId: id });
    setOpen(true);
  };
  const handleOpenDeleteDialog = (questionId, examId) => {
    setOpenDeleteDialog(true);
    console.log(openDeleteDialog);
    setDelete({
      ...openDelete,
      questionId: questionId,
      examId: examId,
    });
  };
  const [openAddQuestionDialog, setOpenAddQuestions] = React.useState(false);
  const handleDelete = async () => {
    console.log(openDelete.examId, openDelete.questionId);
    fetch(`http://${window.location.hostname}:5000/deleteID`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        questionId: openDelete.questionId,
        id: openDelete.examId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setOpenDeleteDialog(false);
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
        setOpenDeleteDialog(false);
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
  };
  const handleHeaderClose = () => {
    setOpenHeaderEdit(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {data && (
        <div>
          <Paper sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">
              {" "}
              SUBJECT: {data && data.subject}{" "}
            </Typography>
            <Typography variant="h6">
              class: {data && data.subjectClass}{" "}
            </Typography>
            <Typography variant="h6">Term: {data && data.term}</Typography>
            <Typography variant="h6">
              session: {data && data.academicSession}
            </Typography>
            <Typography variant="h6">
              Time: {data && data.examDuration}
            </Typography>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                variant="contained"
                onClick={() => setOpenHeaderEdit(true)}
              >
                Edit
              </Button>
            </div>
          </Paper>
          <div>
            <Button
              variant="contained"
              size="large"
              style={{ marginBottom: "15px" }}
              onClick={() => setSection(!section)}
            >
              {section ? "Switch to Section B" : "Switch to Section A"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginBottom: "15px",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenAddQuestions(true)}
            >
              Add Questions
            </Button>
          </div>
          {section ? (
            <>
              <div>
                {data &&
                  data.questions.map((item, index) => (
                    <Paper
                      key={item._id}
                      sx={{
                        mb: 1,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h6">
                        {` Question ${index + 1}`}
                      </Typography>
                      <Typography variant="h6">{item.questionText}</Typography>
                      {item.answerOptions.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            marginLeft: "15px",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              height: "10px",
                              width: "10px",
                              backgroundColor: "tomato",
                              marginRight: "10px",
                            }}
                          ></span>
                          <Typography
                            sx={{ display: "flex", flexWrap: "wrap" }}
                          >
                            {item.answerText}
                          </Typography>
                          <i style={{ marginLeft: "15px" }}>
                            {item.isCorrect ? <Check /> : <Cancel />}
                          </i>
                        </div>
                      ))}
                      <div
                        key={index}
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(item, id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ ml: 1 }}
                          onClick={() => handleOpenDeleteDialog(item._id, id)}
                        >
                          DELETE
                        </Button>
                      </div>
                    </Paper>
                  ))}
              </div>
            </>
          ) : (
            <>
              <h1>Hello From Section B</h1>
            </>
          )}
          <EditDialogue
            open={open}
            setOpen={setOpen}
            handleEdit={handleEdit}
            editData={editData}
            getData={getData}
            toast={toast}
            setEditData={setEditData}
          />
        </div>
      )}{" "}
      <DeleteDialogue
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        handleClickOk={handleDelete}
        contentText={"Are you sure you want to Delete ? "}
        dialogueTitle={"Delete Question"}
        toast={toast}
      />
      {data && (
        <HeaderEditDialog
          openHeaderEdit={openHeaderEdit}
          setOpenHeaderData={setOpenHeaderEdit}
          examId={id}
          handleHeaderClose={handleHeaderClose}
          headerData={data}
          getData={getData}
          toast={toast}
        />
      )}
      {data && (
        <AddQuestoinDialog
          openAddQuestionDialog={openAddQuestionDialog}
          examId={id}
          setOpenAddQuestions={setOpenAddQuestions}
          toast={toast}
          getData={getData}
        />
      )}
    </>
  );
};

export default EditCbt;
