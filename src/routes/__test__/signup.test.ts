import request from "supertest";
import { app } from "../../../app";

it("returns a 201 on successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "pass",
    })
    .expect(201);

  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("user created");
  expect(response.body.user).toBeDefined();
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testkk.com",
      password: "pass",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "p",
    })
    .expect(400)
    .expect({
      errors: [
        { message: "Password must be 3 to 20 characters", field: "password" },
      ],
    });
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(403)
    .expect({
      success: false,
      message: "Email in Use",
    });
});

it("sets a JWT after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  expect(response.body.userJwt).toBeDefined();
});
