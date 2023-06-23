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

  expect(response3.body.success).toBe(true);
  expect(response3.body.message).toBe("Fixture created");
  expect(response3.body.fixture.status).toBe("isPending");
});

it("returns a 400 with an empty field", async () => {
  return request(app)
    .post("/api/fixtures")
    .send({
      homeTeam: "home team",
      // awayTeam: "away team",  ---->  Missing Fields
      date: "11-11-2022",
      isPending: false,
      isCompleted: false,
    })
    .expect(400);
});

it("returns a 401 if user is not admin", async () => {
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

  await request(app)
    .post("/api/team")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "team1",
      league: "la liga",
      stadium: "test stadium",
      yearFounded: 2017,
    })
    .expect(401);

  await request(app)
    .post("/api/team")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "team2",
      league: "la liga",
      stadium: "team2 stadium",
      yearFounded: 2010,
    })
    .expect(401);

  const response3 = await request(app)
    .post("/api/fixtures")
    .set("Authorization", `Bearer ${token}`)
    .send({
      homeTeam: "team1",
      awayTeam: "team2",
      date: "11-11-2022",
      status: "isPending",
    })
    .expect(401);
});
