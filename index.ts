import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("him");
});

app.listen(PORT, () => {
  console.log(`Port is listening on ${PORT}`);
});
