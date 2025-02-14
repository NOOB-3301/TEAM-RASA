import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema(
    {
        name:{type:String},
        teacher:{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
        skill:{type:String}
    }
)

const Subject = mongoose.model("Subject", subjectSchema)

export {Subject}