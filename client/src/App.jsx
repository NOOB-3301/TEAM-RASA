import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx/LandingPage";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import CourseList from "./Components/Courses/CourseList";
import StudentDashboard from "./Components/Students/StudentDashboard";
import StudentLiveClass from "./Components/Students/StudentLiveClass";

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<CourseList />} />

        {/* New Student Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/live-class/:callId" element={<StudentLiveClass />} />
      </Routes>
    </Router>
  );
}

export default App;
