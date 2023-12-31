import mongoose from "mongoose";
import app from "./app.js";

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  }); 
