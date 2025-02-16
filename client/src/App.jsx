import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx/LandingPage";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import CourseList from "./Components/Courses/CourseList";
import Home from "./Components/Home";
import CourseDetails from "./Components/Courses/CourseDeatils";
import PublicRoute from "./Components/PublicRoute";
import ProtectedRoute from "./Components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* public routes anyone can access without authentication */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/details/:id" element={<CourseDetails />} />
        </Route>

        {/* Only authenticated users can access these routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
