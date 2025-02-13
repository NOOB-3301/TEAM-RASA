import express from 'express';
// import { authenticateJwt } from '../../middleware/auth.js';
import { authenticateJwt } from '../middleware/auth.js';
import { 
    // userSignup, 
    // userLogin, 
    // getAllCourses, 
    purchaseCourse, 
    getPurchasedCourses, 
    login,
    getCourses
} from '../controllers/user.controller.js';

import { signup } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);
userRouter.route('/courses').get(authenticateJwt, getCourses);
userRouter.route('/courses/:courseId').post(authenticateJwt, purchaseCourse);
userRouter.route('/purchasedCourses').get(authenticateJwt, getPurchasedCourses);

export { userRouter };
