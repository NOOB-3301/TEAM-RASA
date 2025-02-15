import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx/LandingPage";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import CourseList from "./Components/Courses/CourseList";
import Home from "./Components/Home";
import CourseDetails from "./Components/Courses/CourseDeatils";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/details/:id" element={<CourseDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
