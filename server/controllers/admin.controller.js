import jwt from 'jsonwebtoken';
import { SECRET } from '../middleware/auth.js';
import { Admin } from '../model/admin.model.js';
import  Course  from '../model/course.model.js';
export const getAdminProfile = async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
        return res.status(403).json({ msg: "Admin doesn't exist" });
    }
    res.json({ username: admin.username });
};

export const adminSignup = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (admin) {
        return res.status(403).json({ message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
};

export const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });

    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
};

export const createCourse = async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course._id.toString() });
};

export const updateCourse = async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course updated successfully' });
};

export const getAllCourses = async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
};

export const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    res.json({ course });
};

