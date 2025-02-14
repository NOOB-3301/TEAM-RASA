import mongoose from "mongoose";
import { Admin } from "./admin.model";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageLink: { type: String },
    published: { type: Boolean, default: false },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true } 
});

const Course = mongoose.model("Course", courseSchema);

export { Course };
