import request from "supertest";
import { app } from "../../../../app";

it("returns a 201 on getting fixtures from DB", async () => {
  const response = await request(app)
    .get("/api/fixtures") // Admin Signup Endpoint
    .send()
    .expect(200);

  expect(response.body.success).toBe(true);
  expect(response.body.fixtures).toBeDefined();
});

it("returns a date value with same value on :date slug", async () => {
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

  const response3 = await request(app)
    .post("/api/fixtures")
    .set("Authorization", `Bearer ${token}`)
    .send({
      homeTeam: "team1",
      awayTeam: "team2",
      date: "11-11-2022",
      status: "isPending",
    })
    .expect(201);

  const date = response3.body.fixture.date;
  // console.log();

  const response2 = await request(app)
    .get(`/api/fixtures/${date}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      homeTeam: "team1",
      awayTeam: "team2",
      date: "11-11-2022",
      isPending: false,
      isCompleted: false,
    })
    .expect(200);

  // console.log(response2.body.fixtures[0].date);

  expect(response2.body.success).toBe(true);
  expect(response2.body.fixtures[0].date).toBe("11-11-2022");
});
