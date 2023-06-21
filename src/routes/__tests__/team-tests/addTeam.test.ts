import request from "supertest";
import { app } from "../../../../app";

it("returns a 201 on successful team creation", async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/admin/signup") // Admin Signup Endpoint
    .send({
      email,
      password,
    })
    .expect(201);

  const token = response.body.userJwt;

  const response2 = await request(app)
    .post("/api/team")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test@test.com",
      league: "la liga",
      stadium: "test stadium",
      yearFounded: 2017,
    })
    .expect(201);

  expect(response2.body.success).toBe(true);
  expect(response2.body.message).toBe("team created");
});

it("returns a 400 with an empty field", async () => {
  return request(app)
    .post("/api/team")
    .send({
      // name: "test@test.com", -> Empty field should throw an error
      league: "la liga",
      stadium: "test stadium",
      yearFounded: 2017,
    })
    .expect(400);
});

it("returns a 401 if user is not an admin", async () => {
  return request(app)
    .post("/api/team")
    .send({
      name: "test@test.com",
      league: "la liga",
      stadium: "test stadium",
      yearFounded: 2017,
    })
    .expect(401)
    .expect({
      success: false,
      status: 401,
      message: "NOT AUTHORIZED!",
    });
});
