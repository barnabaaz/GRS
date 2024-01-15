import React from "react";
import { Routes, Route } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AdminPrivateRoute from "./AdminPrivateRoute";
import QuizPrivateRoute from "./QuizPrivateRoute";
import { MainContext } from "./context";
import Error404 from "./components/Erro404";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import StudentPrivateroute from "./StudentPrivateroute";
import StaffProvateRoute from "./StaffProvateRoute";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
} from "@react-pdf/renderer";
import ResultPrivateRoute from "./ResultPrivateRoute";
//
import LetterHead from "./components/LetterHead";
import { Check } from "@mui/icons-material";
const QuizPage = React.lazy(() => import("./pages/QuestionDashboard"));
//const QuestionDashboard = React.lazy(() => import("./pages/QuestionDashboard"));
const Login = React.lazy(() => import("./pages/LoginPages"));

const CreateNewStudent = React.lazy(() =>
  import("./pages/CreateNewStudentUser")
);
// admin Pages
const AdminIndexPage = React.lazy(() =>
  import("./components/AdminDashboard/Dashboard")
);
const AdminLoginPage = React.lazy(() =>
  import("./pages/AdminDashboard/LoginPage.js")
);
const CreateQuestions = React.lazy(() =>
  import("./pages/AdminDashboard/cbt/CreateQuestions")
);
// student pages
const StudentDashboard = React.lazy(() =>
  import("./pages/StudentDashboard/Dashboard")
);

const StudentLoginPage = React.lazy(() =>
  import("./pages/StudentDashboard/LoginPage")
);
// lazy load for staff

const StaffLoginPage = React.lazy(() =>
  import("./pages/staffDashboard/LoginPage")
);
const ProfilePage = React.lazy(() => import("./components/ProfileCard"));
const StudentHome = React.lazy(() =>
  import("./components/AdminDashboard/student/Student")
);
const AdminStudentIndexPage = React.lazy(() =>
  import("./components/AdminDashboard/student/Index")
);
// cbt Routes
const CbtIndex = React.lazy(() =>
  import("./components/AdminDashboard/cbtText/Index")
);
const CbtDashboard = React.lazy(() =>
  import("./pages/AdminDashboard/cbt/IndexPage")
);
// Admin user Routes
const AdminIndexAdminpage = React.lazy(() =>
  import("./components/AdminDashboard/admin/Index")
);
const AdminMainPage = React.lazy(() =>
  import("./components/AdminDashboard/admin/Admin")
);
const CreateAdmin = React.lazy(() =>
  import("./components/AdminDashboard/admin/CreateAdmin")
);
const EditCbt = React.lazy(() => import("./pages/AdminDashboard/cbt/EditPage"));

// students routes
const CbtIndexPage = React.lazy(() =>
  import("./components/StudentDashboard/cbt/Index.js")
);

const Report = React.lazy(() =>
  import("./components/StudentDashboard/report/Index")
);
const ReportIndex = React.lazy(() =>
  import("./pages/StudentDashboard/report/ReportList")
);
const SingleReport = React.lazy(() =>
  import("./pages/StudentDashboard/report/StudentResult")
);

function App() {
  const context = React.useContext(MainContext);
  const {
    studentAuth,
    setStudentAuth,
    adminAuth,
    setAdminAuth,
    staffAuth,
    setStaffAuth,
    userId,
    setUserId,
  } = context;

  const suspense = (
    <div className="body">
      <div className="loader-box">
        <div className="loader"></div>
      </div>
    </div>
  );
  console.log(userId && userId.firstName);
  return (
    <React.Suspense fallback={suspense}>
      <Routes>
        <Route path="/" element={<Login setStudentAuth={setStudentAuth} />}>
          <Route
            path="login-admin"
            element={<AdminLoginPage setAdminAuth={setAdminAuth} />}
          />
          <Route
            path="login-staff"
            element={<StaffLoginPage setStaffAuth={setStaffAuth} />}
          />
          <Route
            index
            element={<StudentLoginPage setStudentAuth={setStudentAuth} />}
          />
        </Route>
        <Route
          path="/student"
          element={
            <StudentPrivateroute
              setStudentAuth={setStudentAuth}
              studentAuth={studentAuth}
              userId={userId}
              setUserId={setUserId}
            />
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="cbt" element={<CbtIndexPage />}></Route>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="report" element={<Report />}>
            <Route index element={<ReportIndex />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>

        {/* admin Portal Routes */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute
              adminAuth={adminAuth}
              setAdminAuth={setAdminAuth}
              userId={userId}
              setUserId={setUserId}
            />
          }
        >
          <Route index element={<AdminIndexPage />} />
          <Route path="cbt" element={<CbtIndex />}>
            <Route index element={<CbtDashboard />} />
            <Route path=":id" element={<EditCbt />} />
            <Route path="create-questions" element={<CreateQuestions />} />
          </Route>
          <Route path="admin" element={<AdminIndexAdminpage />}>
            <Route index element={<AdminMainPage />} />
            <Route path="create-admin" element={<CreateAdmin />} />
          </Route>
          <Route path="student" element={<AdminStudentIndexPage />}>
            <Route index element={<StudentHome />} />
            <Route path="create-student" element={<CreateNewStudent />} />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route
          path="/staff"
          element={
            <StaffProvateRoute
              staffAuth={staffAuth}
              setStaffAuth={setStaffAuth}
            />
          }
        >
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route
          path="/quiz/:id"
          element={
            <QuizPrivateRoute staffAuth={staffAuth} setStaffAuth={setStaffAuth}>
              <QuizPage />
            </QuizPrivateRoute>
          }
        />
        <Route
          path="/result/:id"
          element={
            <ResultPrivateRoute>
              <SingleReport />
            </ResultPrivateRoute>
          }
        />
      </Routes>
    </React.Suspense>
  );
}

export default App;
