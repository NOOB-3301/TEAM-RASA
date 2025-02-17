import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import CourseCard from "../Courses/CourseCard";
import { Box, Card, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// console.log(jwtDecode(localStorage.getItem("authToken")));

if (localStorage.getItem("authToken")) {
  
  localStorage.setItem("u_id", jwtDecode(localStorage.getItem("authToken")).userId);
}


function Teacherhome() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const coursesPerPage = 4;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log(token);
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
  
        console.log(response);
        const data = response.data;
        console.log(data);
  
        if (response.status === 200) {
          console.log(data.fetchedCourses);
          setCourses(data.fetchedCourses);
        } else {
          console.error("Failed to fetch courses:", data.message);
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

      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-100 to-white ">
        {/* Buttons for "Create Meeting" and "Publish Course" */}
        <div className="mt-28"></div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          {" "}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-48 p-4 cursor-pointer bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
            onClick={() => {
              console.log("clicked");
              setIsModal(true);
            }}
          >
            Publish Course
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold mb-4 text-green-700">
            Published Courses
          </h2>
          {currentCourses.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
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
            </motion.div>
          ) : (
            <p className="text-gray-600 text-center">
              No courses published yet.
            </p>
          )}

          {courses.length > coursesPerPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg text-white font-bold ${
                  currentPage === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } transition duration-200`}
              >
                Previous
              </motion.button>
              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-white font-bold ${
                  currentPage === totalPages
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } transition duration-200`}
              >
                Next
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
      {isModal && (
        <Modal
          open={isModal}
          onClose={() => {
            setIsModal(false);
          }}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
              flexDirection: "column",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <button
              onClick={() => {
                setIsModal(false);
              }}
            >
              Close
            </button>

            <Card
              variant={"outlined"}
              style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
            >
              <TextField
                style={{ marginBottom: 10 }}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
              />

              <TextField
                style={{ marginBottom: 10 }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
              />
              {/* 
              <TextField
                style={{ marginBottom: 10 }}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
              /> */}
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <TextField
                style={{ marginBottom: 10 }}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
              />

              <Button
                size={"large"}
                variant="contained"
                onClick={async () => {
                  const formData = new FormData();
                  formData.append("title", title);
                  formData.append("description", description);
                  formData.append("image", image); // Append the file object
                  formData.append("price", price);
                  await axios.post(
                    "http://localhost:3000/api/v1/course/createcourse",
                    formData,
                    {
                      headers: {
                        authorization:
                          "Bearer " + localStorage.getItem("authToken"),
                      },
                    }
                  );
                  alert("Added course!");
                }}
              >
                Add course
              </Button>
            </Card>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default Teacherhome;
