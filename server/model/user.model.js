import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["Student", "Teacher"], required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, refPath: "role" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
