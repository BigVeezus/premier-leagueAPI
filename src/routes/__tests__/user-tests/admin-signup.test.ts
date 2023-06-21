import request from "supertest";
import { app } from "../../../../app";

it("returns a 201 on successful admin signup", async () => {
  const response = await request(app)
    .post("/api/users/admin/signup")
    .send({
      email: "test@test.com",
      password: "pass",
    })
    .expect(201);

  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("Admin created");
  expect(response.body.user).toBeDefined();
});

it("returns an 'Admin' Role in the user body", async () => {
  const response = await request(app)
    .post("/api/users/admin/signup")
    .send({
      email: "test@test.com",
      password: "pass",
    })
    .expect(201);

  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("Admin created");
  expect(response.body.user.role).toBe("Admin");
});
