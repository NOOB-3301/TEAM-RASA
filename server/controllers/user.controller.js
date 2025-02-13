import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';
import { SECRET } from '../middleware/auth.js';
import { Course } from '../model/course.model.js';

export const signup = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        return res.status(403).json({ message: 'User already exists' });
    }
    
    const newUser = new User({ username, password });
    await newUser.save();
    
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
};

export const login = async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
};

export const getCourses = async (req, res) => {
    const courses = await Course.find({ published: true });
    res.json({ courses });
};

export const purchaseCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
        return res.status(403).json({ message: 'User not found' });
    }
    
    user.purchasedCourses.push(course);
    await user.save();
    
    res.json({ message: 'Course purchased successfully' });
};

export const getPurchasedCourses = async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    
    if (!user) {
        return res.status(403).json({ message: 'User not found' });
    }
    
    res.json({ purchasedCourses: user.purchasedCourses || [] });
};


// export {signup,login,getCourses,getPurchasedCourses,purchaseCourse}