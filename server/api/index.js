import dotenv from "dotenv";
import { dbConnect } from "./dbconnect.js";
import { app } from "./app.js";

dotenv.config();

dbConnect()
  .then(() => {
    console.log("Database connected: ", process.env.MONGO_URI);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT}, press Ctrl+C to stop`
      );
    });
  })
  .catch(() => {
    console.log("error while connecting db");
    process.exit();
  });
