import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageLink: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true } 
});

const Course = mongoose.model("Course", courseSchema);

export { Course };
