import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx/LandingPage";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import CourseList from "./Components/Courses/CourseList";
import CourseDetails from "./Components/Courses/CourseDeatils";
import PublicRoute from "./Components/PublicRoute";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Teacherhome from "./Components/teacher/Teacherhome";
import Studenthome from "./Components/student/Studenthome";

function App() {
  return (
    <Router>
      <Routes>
        {/* can be accessed by anyone */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/details/:id" element={<CourseDetails />} />

        {/* can be accessed by uauthenticate user */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Only authenticated users can access these routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/teacher" element={<Teacherhome />} />
          <Route path="/student" element={<Studenthome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
