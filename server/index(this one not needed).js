const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/i_created_new_one/admin");
const userRouter = require("./routes/i_created_new_one/user");
const rateLimit = require("express-rate-limit");
const app = express();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: { error: "Too many login attempts. Try again later." },
});

app.use(cors());
app.use(express.json());

app.use("/admin",loginLimiter, adminRouter)
app.use("/user",loginLimiter, userRouter)
app.get("/", (req, res) => res.json({msg: "hello world after the class"}));

mongoose.connect('mongodb+srv://raunitjaiswal510:xBMJj3RiNP5dxbqz@cluster0.i6xb0.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

app.listen(3000, () => console.log('Server running on port 3000'));
