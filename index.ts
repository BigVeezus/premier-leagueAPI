if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import { connectDataBase } from "./config/db";
import { app } from "./app";

const PORT = process.env.PORT || 5000;

connectDataBase();

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Port is listening on ${PORT}`);
  });
};

start();
