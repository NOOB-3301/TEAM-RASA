import express from "express"
import { getProfile } from "../controllers/profile.control.js"


const profileRouter = express.Router()

profileRouter.route('/getprofile').get(getProfile)

export {profileRouter}