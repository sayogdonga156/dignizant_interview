const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const formRouter = require("./routes/formRouter");

mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://sayogdonga156156:Geclr9dYfk0DTgw7@cluster0.fr3ikpp.mongodb.net/interview");

const app = express();
const con = mongoose.connection;

app.use(express.json());
app.use(cors());
app.use("/api/v1", userRoute);
app.use("/api/v1", adminRouter);
app.use("/api/v1", formRouter);

con.on("open", () => {
  console.log("connected successfully ✌");
});

app.listen(process.env.PORT, () =>
  console.log(`app listing on port ${process.env.PORT}`)
);
