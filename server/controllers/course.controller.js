import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import Course from "../model/course.model.js";
import { Teacher } from "../model/teacher.model.js";
import { upload_on_cloudinary } from "../utils/cloudinary.utils.js";
import { Student } from "../model/student.model.js";

const secretkey = process.env.SECRET_KEY;
if (!secretkey) {
  console.log("Secret key not found");
  process.exit();
}

const createCourse = async (req, res) => {
  try {
    // Validate Authorization Header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided." });
    }
    const secretkey = process.env.SECRET_KEY;
    if (!secretkey) {
      console.log("Secret key not found");
      process.exit();
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Invalid token format." });
    }

    // Decode and Verify Token
    let decoded;
    try {
      decoded = jwt.verify(token, secretkey);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    // Find the authenticated user
    const userId = decoded.userId;
    console.log(userId);
    const user = await User.findById(userId);
    await user.populate("roleId");
    console.log("after populate", user);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Ensure user is a teacher
    if (user.role !== "Teacher") {
      return res
        .status(403)
        .json({ message: "You are not authorized to create a course." });
    }

    // Get the course details from request body
    const { title, description, price } = req.body;
    const filebuffer = req.file ? req.file.buffer : null; // Assuming file is available in req.file.buffer

    if (!title || !description || price === undefined) {
      return res
        .status(400)
        .json({ message: "Title, description, and price are required." });
    }

    if (!filebuffer) {
      return res.status(400).send({ message: "image file is missing" });
    }

    const uploaded_url = await upload_on_cloudinary(filebuffer);

    // process.exit()
    // Create the course and associate it with the teacher
    const createdCourse = await Course.create({
      title,
      description,
      price,
      imageLink: uploaded_url,
      user: user._id,
      teacher: user.roleId._id, // Link to the teacher
    });
    // console.log(user)

    const fetchedTeacher = await Teacher.findById(user.roleId._id);
    fetchedTeacher.publishedCourses.push(createdCourse._id);
    // Update teacher's published courses list
    // user.roleId.publishedCourses.push(createdCourse._id);
    await fetchedTeacher.save();
    await user.save();

    return res.status(201).json({
      message: "Course created successfully",
      course: createdCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const fetchedCourses = await Course.find()
      .populate("user") // Populates the user field
      .populate("teacher"); // Populates the teacher field

    return res
      .status(200)
      .send({ message: "Fetched successfully", fetchedCourses });
  } catch (error) {
    return res.status(500).send({ message: "Error fetching courses", error });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const { c_id } = req.body;

    if (!c_id) {
      return res.status(400).send({ message: "Course ID is required" });
    }

    const fetchedCourse = await Course.findById(c_id)
      .populate("user")
      .populate("teacher");

    if (!fetchedCourse) {
      return res.status(404).send({ message: "Course not found" });
    }

    return res.status(200).send({
      message: "Fetched course details successfully",
      fetchedCourse,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error fetching course details", error });
  }
};

const getCourseByTeacher = async (req, res) => {
  try {
    const { u_id } = req.body;
    console.log(u_id)

    if (!u_id) {
      return res.status(400).send({ message: "Teacher ID is required" });
    }

    const fetchedCourses = await Course.find({ user: u_id })
      .populate("user")
      .populate("teacher");

    if (!fetchedCourses.length) {
      return res
        .status(404)
        .send({ message: "No courses found for this teacher" });
    }

    return res.status(200).send({
      message: "Fetched courses by teacher successfully",
      fetchedCourses,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error fetching courses by teacher", error });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const { c_id } = req.body;
    if (!c_id) {
      return res.status(400).json({ error: "Course ID is required." });
    }

    // Validate Authorization Header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid or missing token." });
    }

    const token = authHeader.split(" ")[1];

    // Verify Token
    // const secretKey = process.env.SECRET_KEY;
    // if (!secretKey) {
    //     console.error("Secret key not found");
    //     return res.status(500).json({ error: "Internal server error." });
    // }

    let decoded;
    try {
      decoded = jwt.verify(token, secretkey);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    // Fetch Student
    const fetchedStudent = await Student.findById(decoded.roleId);
    if (!fetchedStudent) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Check if student is already enrolled
    if (fetchedStudent.purchasedCourse.includes(c_id)) {
      return res
        .status(400)
        .json({ error: "You are already enrolled in this course." });
    }

    // Enroll Student
    fetchedStudent.purchasedCourse.push(c_id);
    await fetchedStudent.save();

    return res
      .status(200)
      .json({ message: "Successfully enrolled in course." });
  } catch (error) {
    console.error("Error while enrolling course:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while enrolling in the course." });
  }
};

const getEnrollCourse = async (req, res) => {
  try {
    // Validate Authorization Header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid or missing token." });
    }

    const token = authHeader.split(" ")[1];

    // Verify Token
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("Secret key not found");
      return res.status(500).json({ error: "Internal server error." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    // Fetch Student and populate purchased courses
    const fetchedStudent = await Student.findById(decoded.roleId).populate(
      "purchasedCourse"
    );

    if (!fetchedStudent) {
      return res.status(404).json({ error: "Student not found." });
    }

    return res.status(200).json({
      message: "Courses fetched successfully",
      fetchedCourses: fetchedStudent.purchasedCourse,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching courses." });
  }
};

export {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getCourseByTeacher,
  enrollCourse,
  getEnrollCourse,
};
