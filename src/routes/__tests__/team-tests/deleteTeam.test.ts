import request from "supertest";
import { app } from "../../../../app";

it("returns a 200 on successfully deleting a team", async () => {
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

  const id = response2.body.team.id;
  // console.log(id);

  const response3 = await request(app)
    .delete(`/api/team/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  expect(response3.body.success).toBe(true);
  expect(response3.body.message).toBe("Team deleted");
});
