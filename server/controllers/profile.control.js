import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';


const getProfile = async (req, res) => {
    try {
        // Validate Authorization Header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided." });
        } const secretkey = process.env.SECRET_KEY
        if (!secretkey) {
            console.log("Secret key not found")
            process.exit()
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Invalid token format." });
        }

        // Decode and Verify Token
        let decoded;
        try {
            decoded = jwt.verify(token, secretkey);
        } catch (err) {
            return res.status(401).json({ error: "Invalid or expired token." });
        }

        // Find the authenticated user
        const userId = decoded.userId;
        console.log(userId)
        const user = await User.findById(userId);
        await user.populate({
            path:"roleId",
            populate:{path: "publishedCourses"}
        })

        return res.status(200).send({meassage:"profile fetched successfully", fetchedUser:user})
    } catch (error) {
        console.error("Error getting profile:", error);
        return res.status(500).json({ error: "Server error" });
    }
}


export {getProfile}