import request from "supertest";
import { app } from "../../../../app";

it("returns a 201 on deleted team", async () => {
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

  const id = response3.body.fixture.id;
  //   console.log(id);

  //   const email2 = "test2@test.com";
  //   const password2 = "password";

  //   await request(app)
  //     .post("/api/users/admin/signup") // Admin Signup Endpoint
  //     .send({
  //       email2,
  //       password2,
  //     })
  //     .expect(201);

  //   const token2 = response.body.userJwt;
  //   console.log(token2);

  await request(app)
    .delete(`/api/fixtures/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200)

    .expect({ success: true, message: "Fixture deleted" });
});
