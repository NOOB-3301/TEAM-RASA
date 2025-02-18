import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import CourseCard from "../Courses/CourseCard";
import { Box, Card, Modal, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

if (localStorage.getItem("authToken")) {
  localStorage.setItem(
    "u_id",
    jwtDecode(localStorage.getItem("authToken")).userId
  );
}

function Teacherhome() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const coursesPerPage = 4;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
          "http://localhost:3000/api/v1/course/getcoursebyeacher",
          { u_id: localStorage.getItem("u_id") },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.status === 200) {
          setCourses(response.data.fetchedCourses);
        } else {
          console.error("Failed to fetch courses:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-100 to-white">
        <div className="mt-28"></div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-48 p-4 cursor-pointer bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          onClick={() => setIsModal(true)}
        >
          Publish Course
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-6"
        >
          <Typography variant="h5" className="text-green-700 font-bold mb-4">
            Published Courses
          </Typography>
          {currentCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentCourses.map((course) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Typography className="text-gray-600 text-center">
              No courses published yet.
            </Typography>
          )}

          {courses.length > coursesPerPage && (
            <div className="flex justify-between items-center mt-6">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="contained"
                color={currentPage === 1 ? "secondary" : "primary"}
              >
                Previous
              </Button>
              <Typography>Page {currentPage} of {totalPages}</Typography>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="contained"
                color={currentPage === totalPages ? "secondary" : "primary"}
              >
                Next
              </Button>
            </div>
          )}
        </motion.div>
      </div>
      
      <Modal open={isModal} onClose={() => setIsModal(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Card sx={{ width: 400, p: 3 }}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>{File}</div>
            <Button variant="contained" component="label" fullWidth sx={{ my: 2 }}>
              Upload Image
              <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
              
            </Button>
            <TextField
              label="Price"
              fullWidth
              margin="normal"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={async () => {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("description", description);
                formData.append("image", image);
                formData.append("price", price);
                await axios.post(
                  "http://localhost:3000/api/v1/course/createcourse",
                  formData,
                  {
                    headers: { authorization: `Bearer ${localStorage.getItem("authToken")}` },
                  }
                );
                alert("Added course!");
              }}
            >
              Add Course
            </Button>
          </Card>
        </Box>
      </Modal>
    </>
  );
}

export default Teacherhome;
