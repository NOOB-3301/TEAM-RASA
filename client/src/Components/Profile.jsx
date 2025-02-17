import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CourseCard from "./Courses/CourseCard";

const TeacherProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [couses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("No auth token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/v1/course/getenrollcourse",
          {
            headers: {
              contentType: "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(response.data.fetchedCourses);
        setCourses(response.data.fetchedCourses);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("No auth token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/v1/profile/getprofile",
          {
            headers: {
              contentType: "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(response.data.fetchedUser);
        setUserData(response.data.fetchedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return <div style={styles.loading}>Loading Profile...</div>;
  }

  if (!userData) {
    return <div style={styles.error}>User data not available</div>;
  }
  console.log(userData.role);
  if (userData.role === "Student") {
    return (
      <div style={styles.container}>
        <Navbar />
        <h1 style={styles.heading}>User Profile</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <div style={styles.profileBox}>
          <h2 style={styles.subHeading}>👤 {userData.name}</h2>
          <p style={styles.paragraph}>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>

        {couses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.heading}>User Profile</h1>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      <div style={styles.profileBox}>
        <h2 style={styles.subHeading}>👤 {userData.username}</h2>
        <p style={styles.paragraph}>
          <strong>Email:</strong> {userData.email}
        </p>
        <p style={styles.paragraph}>
          <strong>Qualification:</strong> {userData.roleId.Qualification}
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeading}>📚 Subjects</h2>
        <p>Subject: {userData.roleId.subjects}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeading}>🎓 Published Courses</h2>
        <ul style={styles.list}>
          {userData.roleId.publishedCourses.length > 0 ? (
            userData.roleId.publishedCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p style={styles.emptyText}>No published courses</p>
          )}
        </ul>
      </div>
    </div>
  );
};

// 💡 Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "40px auto",
  },
  heading: {
    fontSize: "30px",
    color: "#0F6B5E",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: "22px",
    color: "#14887a",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: "18px",
    color: "#444",
    lineHeight: "1.8",
    marginBottom: "10px",
    textAlign: "center",
  },
  profileBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
  },
  section: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
    textAlign: "left",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  emptyText: {
    fontSize: "16px",
    color: "#888",
    textAlign: "center",
  },
  loading: {
    fontSize: "20px",
    color: "#14887a",
    textAlign: "center",
    padding: "20px",
  },
  error: {
    fontSize: "20px",
    color: "red",
    textAlign: "center",
    padding: "20px",
  },
};

export default TeacherProfile;