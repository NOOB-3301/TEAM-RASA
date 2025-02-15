import express from 'express'
import { createCourse, getAllCourses, getCourseByTeacher, getCourseDetails } from '../controllers/course.controller.js'


const courseRouter = express.Router()


courseRouter.route("/createcourse").post(createCourse)
courseRouter.route("/getallcourse").get(getAllCourses)
courseRouter.route("/getcoursedetails").post(getCourseDetails)
courseRouter.route("/getcoursebyeacher").post(getCourseByTeacher)

export {courseRouter}