//Configuring the ENV file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Importing Modules
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { errorHandler, NotFoundError } from "@ticketifyorg/common";
import { rateLimit } from "express-rate-limit";

//Importing Routers

import { signupRouter } from "./src/routes/user/signup";
import { signinRouter } from "./src/routes/user/signin";
import { currentUserRouter } from "./src/routes/user/current-user";
import { createTeamRouter } from "./src/routes/team/addTeam";
import { getAllTeamsRouter } from "./src/routes/team/getAllTeams";
import { showTeamRouter } from "./src/routes/team/showTeam";
import { editTeamRouter } from "./src/routes/team/editTeam";
import { adminSignupRouter } from "./src/routes/user/admin-signup";
import { createFixtureRouter } from "./src/routes/fixtures/createFixture";
import { deleteTeamRouter } from "./src/routes/team/deleteTeam";
import { getAllFixtureRouter } from "./src/routes/fixtures/getAllFixtures";
import { viewFixturebyDateRouter } from "./src/routes/fixtures/getFixturesbyDate";
import { viewFixturebySlugRouter } from "./src/routes/fixtures/getFixtureBySlug";
import { deleteFixtureRouter } from "./src/routes/fixtures/deleteFixtures";
import { editFixtureRouter } from "./src/routes/fixtures/editFixture";

const app = express();

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 70,
});

//Configuring Cors to allow all access
app.use(limiter);
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
app.use(deleteTeamRouter);
app.use(createFixtureRouter);
app.use(getAllFixtureRouter);
app.use(viewFixturebyDateRouter);
app.use(viewFixturebySlugRouter);
app.use(deleteFixtureRouter);
app.use(editFixtureRouter);

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
