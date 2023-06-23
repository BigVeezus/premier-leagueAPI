import request from "supertest";
import { app } from "../../../../app";

it("returns a 200 on getting teams from DB", async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup") // Admin Signup Endpoint
    .send({
      email,
      password,
    })
    .expect(201);

  const token = response.body.userJwt;

  const response2 = await request(app)
    .get("/api/team")
    .set("Authorization", `Bearer ${token}`)
    .send()
    .expect(200);

  expect(response2.body.success).toBe(true);
  expect(response2.body.teams).toBeDefined();
});
