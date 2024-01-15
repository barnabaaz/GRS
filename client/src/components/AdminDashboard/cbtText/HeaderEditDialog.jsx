import React from "react";
import {
  Dialog,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  TextField,
  DialogTitle,
  Button,
} from "@mui/material";
const HeaderEditDialog = ({
  headerData,
  openHeaderEdit,
  handleHeaderClose,
  getData,
  examId,
  setOpenHeaderData,
  toast,
}) => {
  const term = React.createRef();
  const subject = React.createRef();
  const academicSession = React.createRef();
  const subjectClass = React.createRef();
  const examDuration = React.createRef();

  const [editedData, setEditedData] = React.useState(null);

  const HandleEditedData = () => {
    setEditedData({
      ...editedData,
      term: term.current.value,
      subjectClass: subjectClass.current.value,
      subject: subject.current.value,
      examDuration: examDuration.current.value,
      academicSession: academicSession.current.value,
      examId: examId,
    });
    setOpenHeaderData(false);
  };
  console.log(editedData);
  React.useEffect(() => {
    if (editedData) {
      fetch(`http://${window.location.hostname}:5000/question/update-header`, {
        method: "POST",
        body: JSON.stringify(editedData),
        headers: { "Content-type": "application/json" },
      })
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
  }, [editedData]);

  return (
    <Dialog
      open={openHeaderEdit}
      onClose={handleHeaderClose}
      title={"Edit Header"}
      fullWidth
    >
      <div style={{ display: "grid", padding: "15px" }}>
        <DialogTitle id="alert-dialog-title"> Edit Header Details </DialogTitle>
        <FormControl margin="dense">
          <InputLabel>Term *</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            defaultValue={headerData.term}
            label="Term"
            size="small"
            name="term"
            inputRef={(input) => (term.current = input)}
          >
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
          inputRef={(input) => (academicSession.current = input)}
          label="Academic Seesion"
          helperText="Enter Academic Session"
          defaultValue={headerData.academicSession}
        />
        <FormControl margin="dense">
          <InputLabel>Class</InputLabel>
          <Select
            defaultValue={headerData.subjectClass}
            label="Class*"
            size="small"
            name="subjectClass"
            inputRef={(input) => (subjectClass.current = input)}
          >
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
        <TextField
          required
          size="small"
          name="subject"
          margin="dense"
          inputRef={(input) => (subject.current = input)}
          label="Subject"
          helperText="Enter Subect Title"
          defaultValue={headerData.subject}
        />
        <TextField
          required
          size="small"
          name="examDuration"
          margin="dense"
          type="number"
          label="exam Duration"
          inputRef={(input) => (examDuration.current = input)}
          helperText="Enter Exam duration in Minutes"
          defaultValue={headerData.examDuration}
        />
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            onClick={handleHeaderClose}
            sx={{ mr: 1 }}
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={HandleEditedData} variant="contained">
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default HeaderEditDialog;
