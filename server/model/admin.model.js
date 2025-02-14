import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    specialization: { 
        type: String, 
        required: true, 
        enum: ["Mathematics", "Science", "English", "History", "Computer Science", "Physics", "Chemistry", "Biology", "Other"]
    },
    subjects: [{ type: String }],
    experience: { type: Number, default: 0 }, 
    qualification: { type: String }
});

const Admin = mongoose.model("Admin", adminSchema);

export { Admin };
