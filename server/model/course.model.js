import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageLink: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  allVideos: [
    { type: mongoose.Schema.Types.ObjectId, ref: "video", default: [] },
  ],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
