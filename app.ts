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
import { errorHandler, NotFoundError } from "@ticketifyorg/common";
import { signupRouter } from "./src/routes/user/signup";
import { signinRouter } from "./src/routes/user/signin";
import { currentUserRouter } from "./src/routes/user/current-user";
import { createTeamRouter } from "./src/routes/team/addTeam";
import { getAllTeamsRouter } from "./src/routes/team/getAllTeams";
import { showTeamRouter } from "./src/routes/team/showTeam";
import { editTeamRouter } from "./src/routes/team/editTeam";
import { adminSignupRouter } from "./src/routes/user/admin-signup";

const app = express();

//Configuring Cors to allow all access
app.use(cors());
app.use(json());

//Configuring routers
app.use(adminSignupRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(createTeamRouter);
app.use(getAllTeamsRouter);
app.use(showTeamRouter);
app.use(editTeamRouter);

app.get("/", (req, res) => {
  res.send("him Duncan");
});

app.all("*", (req, res) => {
  return res.status(404).send({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

export { app };
