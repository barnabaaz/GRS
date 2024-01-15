import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  TableCell,
  FormGroup,
  FormControlLabel,
  Switch,
  Paper,
} from "@mui/material";
import DeleteDialog from "../../ActionDialogue";
import { useNavigate } from "react-router-dom";
const Container = styled(Box)(({ theme }) => ({}));

const IndexCbt = () => {
  const navigate = useNavigate();
  const handleCreateQuestions = () => navigate("create-questions");
  const [allQuestions, setAllQuestions] = React.useState(null);
  const [deleteId, setDeleteId] = React.useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [useFetch, setFetch] = React.useState(false);

  const getAllQuestions = async () => {
    try {
      await fetch(`http://${window.location.hostname}:5000/question`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          setAllQuestions(data);
          console.log(data);
        });
    } catch (err) {
      console.error(err.message);
    }
  };
  React.useEffect(() => {
    getAllQuestions();
  }, [useFetch]);
  const handleChange = (_id, scheduled, event) => {
    fetch(`http://${window.location.hostname}:5000/result/scheduled`, {
      method: "PUT",
      body: JSON.stringify({ _id, scheduled }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setFetch(!useFetch);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const handleDelete = (id) => {
    setOpenDeleteDialog(true);
    setDeleteId(id);

    // fetch(
    //   `http://${window.location.hostname}:5000/question/delete-question/${id}`,
    //   {
    //     method: "DELETE",
    //   }
    // )
    //   .then((res) => res.json)
    //   .then((data) => console.log(data));
  };
  const handleExamDelete = () => {
    fetch(
      `http://${window.location.hostname}:5000/question/delete-question/${deleteId}`,
      {
        method: "DELETE",
      }
    )
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
        getAllQuestions();
      })
      .catch((err) => {
        toast.success(err, {
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
  const handleEdit = (id) => navigate(`${id}`);

  return (
    <Container>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          mb: 3,
        }}
      >
        <Button
          size="large"
          variant="contained"
          onClick={handleCreateQuestions}
        >
          Schedule A Test
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> sn </TableCell>
                <TableCell> Subject </TableCell>
                <TableCell> class </TableCell>
                <TableCell> Term </TableCell>
                <TableCell> Session </TableCell>
                <TableCell> Scheduled </TableCell>
                <TableCell> questions </TableCell>
                <TableCell> Edit </TableCell>
                <TableCell> Delete </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allQuestions &&
                allQuestions.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{row.subject}</TableCell>
                    <TableCell align="left">{row.subjectClass}</TableCell>
                    <TableCell align="left">{row.term}</TableCell>
                    <TableCell align="left">{row.academicSession}</TableCell>

                    <TableCell align="left">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={row.scheduled}
                              onChange={() =>
                                handleChange(row._id, row.scheduled)
                              }
                            />
                          }
                          label="Label"
                        />
                      </FormGroup>
                    </TableCell>
                    <TableCell align="left">{row.questions.length}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(row._id)}
                        sx={{ mr: 1 }}
                      >
                        {" "}
                        Edit{" "}
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(row._id)}
                        sx={{ display: "flex", flexWrap: "nowrap" }}
                      >
                        {" "}
                        Delete{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button
        size="large"
        variant="contained"
        onClick={handleCreateQuestions}
        sx={{ mt: 4 }}
      >
        Create New Test
      </Button>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        toast={toast}
        contentText={"Are you sure you want to Delete Exam ?"}
        dialogueTitle={"delete Exam "}
        handleClickOk={handleExamDelete}
      />
    </Container>
  );
};

export default IndexCbt;
