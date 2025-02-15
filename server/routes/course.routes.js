import express from 'express'
import { createCourse, getAllCourses, getCourseByTeacher, getCourseDetails } from '../controllers/course.controller.js'
import multer from 'multer'


const courseRouter = express.Router()
const upload = multer({Storage: multer.memoryStorage()})

courseRouter.route("/createcourse").post(upload.single('image') ,createCourse)
courseRouter.route("/getallcourse").get(getAllCourses)
courseRouter.route("/getcoursedetails").post(getCourseDetails)
courseRouter.route("/getcoursebyeacher").post(getCourseByTeacher)

export {courseRouter}