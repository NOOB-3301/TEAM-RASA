import express from 'express'
import { createCourse } from '../controllers/course.controller.js'


const courseRouter = express.Router()


courseRouter.route("/createcourse").post(createCourse)


export {courseRouter}