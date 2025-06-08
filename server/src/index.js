import dotenv from "dotenv";
import connectDB from "./configure/database.js";
import app from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Monogo db conncection failed !!!", err);
  });