import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        user:{type: mongoose.Schema.Types.ObjectId, ref:"User",required:true},
        purchasedCourse:[{type: mongoose.Schema.Types.ObjectId, ref:"Course", default:[]}],
        completedCourses:[{type: mongoose.Schema.Types.ObjectId, ref:"Course", default:[]}]
    }
)

const Student = mongoose.model("Student", studentSchema)

export {Student}