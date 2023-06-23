import request from "supertest";
import { app } from "../../../../app";

it("returns a 201 on successful fixture edit", async () => {
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

  await request(app)
    .post("/api/team")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "team1",
      league: "la liga",
      stadium: "test stadium",
      yearFounded: 2017,
    })
    .expect(201);

  await request(app)
    .post("/api/team")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "team2",
      league: "la liga",
      stadium: "team2 stadium",
      yearFounded: 2010,
    })
    .expect(201);

  const response1 = await request(app)
    .post("/api/fixtures")
    .set("Authorization", `Bearer ${token}`)
    .send({
      homeTeam: "team1",
      awayTeam: "team2",
      date: "11-11-2022",
      status: "isPending",
    })
    .expect(201);

  const id = response1.body.fixture.id;
  //   console.log(id);

  const response2 = await request(app)
    .put(`/api/fixtures/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      homeTeam: "team1",
      awayTeam: "team2",
      date: "15-11-2022", //----> Edited date
      status: "isCompleted", // -----> status changed to completed
    })
    .expect(200);

  expect(response2.body.success).toBe(true);
  expect(response2.body.message).toBe("fixture edited");
  expect(response2.body.existingfixture.date).toBe("15-11-2022");
});
