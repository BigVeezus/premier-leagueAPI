import request from "supertest";
import { app } from "../../../app";
import { response } from "express";
import { token } from "../../../test/setup";

it("responds with details about current user", async () => {
  //   const jwt = await global.signin();
  //   console.log(jwt);
  const response = await request(app)
    .get("/api/users/currentuser")
    // .set("header", jwt)
    .set("Authorization", `Bearer ${token}`)
    .send()
    .expect(200);

  expect(response.body.currentUser).toBe("test@test.com");
});

it("responds with null if unauthenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);

  expect(response.body.currentUser).toBeUndefined();
});
