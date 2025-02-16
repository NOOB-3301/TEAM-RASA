import express from "express";
import { tokenProvider } from "../controllers/getstearm.controller.js";

const tokenRouter = express.Router();

tokenRouter.route("/getstreamtoken").post(tokenProvider);

export { tokenRouter };
