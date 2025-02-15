import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    subjects:[{type: mongoose.Schema.Types.ObjectId , ref:"Subject", default:[]}],
    publishedCourses:[{type: mongoose.Schema.Types.ObjectId , ref:"Course", default:[]}],
    Qualification:{type:String}
}, { timestamps: true }); 

const Teacher = mongoose.model("Teacher", teacherSchema);

export { Teacher };
