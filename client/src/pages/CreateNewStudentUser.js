import React from "react";

import CreateStudentUser from "../components/AdminDashboard/student/CreateNewStudentUser";
import userupload from "../utils/userUpload.png";
import AlertDialogSlide from "../components/AlertDialog";

const CreateNewStudentUser = () => {
  const [user, setUser] = React.useState({
    firstName: "",
    password: "",
    lastName: "",
    middleName: "",
    gender: "",
    username: "",
    dateOfBirth: "",
    localGovernmentOfOrigin: "",
    timeleft: 0,
    phoneNumber: "",
    confirmPassword: "",
    file: null,
    fileName: "",
    imSrc: userupload,
  });
  const [open, setOpen] = React.useState(true);
  const handleChange = (e) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };
  const handleFileUpload = (event) => {
    setUser({
      ...user,
      file: event.target.files[0],
      imSrc: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("image", user.file, user.file.name);
    data.append("firstName", user.firstName);
    data.append("lastName", user.lastName);
    data.append("gender", user.gender);
    data.append("password", user.password);
    data.append("middleName", user.middleName);
    data.append("username", user.username);
    data.append("dateOfBirth", user.dateOfBirth);
    data.append("studentClass", user.studentClass);
    data.append("phoneNumber", user.phoneNumber);

    if (user.password !== user.confirmPassword) {
      return console.log("passwords do not match");
    }
    try {
      await fetch(`http://${window.location.hostname}:5000/student/create`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setOpen(true);
          setUser({
            firstName: "",
            password: "",
            lastName: "",
            middleName: "",
            gender: "",
            username: "",
            studentClass: "",
            dateOfBirth: "",
            localGovernmentOfOrigin: "",
            timeleft: 0,
            phoneNumber: "",
            confirmPassword: "",
            file: null,
            fileName: "",
            imSrc: userupload,
          });
        });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <CreateStudentUser
        user={user}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFileUpload={handleFileUpload}
      ></CreateStudentUser>
      <AlertDialogSlide
        open={open}
        setOpen={setOpen}
        dialogContent={"new User created Succesfully "}
        title={"User Created"}
      />
      ;
    </>
  );
};

export default CreateNewStudentUser;
