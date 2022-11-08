import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import taskRoute from "./routes/taskRoute";


const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("middleware working");
  next();
});

app.use("/api/user/", userRoute);
app.use("/api/task/", taskRoute);


module.exports = app;
