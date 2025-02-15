import express from 'express';
import { authenticateJwt } from '../server/middleware/auth.js';
import { 
    getAdminProfile, 
    adminSignup, 
    adminLogin, 
    createCourse, 
    updateCourse, 
    getAllCourses, 
    getCourseById 
} from './admin.controller.js';

const adminRouter = express.Router();

adminRouter.route('/me').get(authenticateJwt, getAdminProfile);
adminRouter.route('/signup').post(adminSignup);
adminRouter.route('/login').post(adminLogin);
adminRouter.route('/courses').post(authenticateJwt, createCourse).get(authenticateJwt, getAllCourses);
adminRouter.route('/courses/:courseId').put(authenticateJwt, updateCourse);
adminRouter.route('/course/:courseId').get(authenticateJwt, getCourseById);

export { adminRouter };
