import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subjects: { type: String },
    publishedCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: [] },
    ],
    Qualification: { type: String },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export { Teacher };
