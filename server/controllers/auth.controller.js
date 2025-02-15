import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Teacher } from "../model/teacher.model.js";
import { User } from "../model/user.model.js";
import { Student } from "../model/student.model.js";
import dotenv from 'dotenv'

dotenv.config()

const secretkey = process.env.SECRET_KEY;
if (!secretkey) {
    console.log("Secret key not found");
    process.exit();
}


const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // ✅ Check if all required fields are provided
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        let createdRole;

        // ✅ Create either a Teacher or Student
        if (role === "teacher") {
            const {qualification} = req.body
            if (!qualification) {
                return res.status(400).json({ message: "Qualification is required" });
            }
            createdRole = await Teacher.create({
                subjects: [],
                publishedCourses: [],
                Qualification:qualification
            });
        } else {
            createdRole = await Student.create({
                purchasedCourse: [],
                completedCourses: []
            });
        }

        // ✅ Create User
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role,
            roleId: createdRole._id
        });

        // ✅ Link User to Student/Teacher
        createdRole.user = user._id;
        await createdRole.save();

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, role: user.role, roleId: createdRole._id },
            secretkey, // Store this in your .env file
            { expiresIn: "7d" }
        );

        
        return res.status(201).json({
            message: `${role} created successfully`,
            token
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // ✅ Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "No user found with this email" });
        }
        console.log(user)
        // ✅ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Retrieve role details (Student or Teacher)
        let roleData;
        if (user.role === "teacher") {
            roleData = await Teacher.findById(user.roleId);
        } else {
            roleData = await Student.findById(user.roleId);
        }

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { userId: user._id , role: user.role, roleId:roleData._id },
            secretkey, // Store this in your .env file
            { expiresIn: "7d" }
        );

        console.log("User logged in:", user.email);
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            roleData
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

export { register, login };
