//Configuring the ENV file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Importing Modules
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

//Importing Routers
import { signupRouter } from "./src/routes/signup";
import { signinRouter } from "./src/routes/signin";
import { currentUserRouter } from "./src/routes/current-user";

const app = express();

//Configuring Cors to allow all access
app.use(cors());
app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== "test",
//   })
// );

//Configuring routers
app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);

app.get("/", (req, res) => {
  res.send("him Duncan");
});

app.all("*", (req, res) => {
  return res.status(404).send({
    success: false,
    message: "Route not found",
  });
});

export { app };
