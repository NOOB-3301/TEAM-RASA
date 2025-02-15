import { register,login } from "../controllers/auth.controller.js";
import express from 'express'


const authRouter = express.Router()


authRouter.route("/login").post(login)
authRouter.route("/signup").post(register)


export {authRouter}
