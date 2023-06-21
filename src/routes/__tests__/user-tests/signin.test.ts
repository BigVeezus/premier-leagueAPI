import request from "supertest";
import { app } from "../../../../app";

it("fails when an email or password value isnt given", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      // email: "test@test.com",  // Email in body is missing
      password: "pas",
    })
    .expect(400)
    .expect({
      errors: [
        {
          message: "Email must be valid!",
          field: "email",
        },
      ],
    });
});

it("fails when an email doesnt exist", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "pas",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "ratata@test.com",
      password: "pas",
    })
    .expect(400)
    .expect({
      success: false,
      message: "Invalid login details",
    });
});

it("fails when an incorrect password is used", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "pas", // Correct Password
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "pappj", //Incorrect Password
    })
    .expect(400);
});

it("responds with a JWT when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "pass",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "pass",
    })
    .expect(200);
  expect(response.body.userJwt).toBeDefined();
});
