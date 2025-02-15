import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//base route test route
app.use('/test',async (req,res) => {
    res.send("api is working, mongdb connected")
})

//routes import
// import { userRouter } from '../routes/user.routes.js';
// import { adminRouter } from '../routes/admin.routes.js';
import { authRouter } from '../routes/auth.routes.js';
import { courseRouter } from '../routes/course.routes.js';
import { profileRouter } from '../routes/profile.routes.js';

//routes use
// app.use('/api/v1/user',userRouter)
// app.use('/api/v1/admin',adminRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/profile", profileRouter)


export {app}