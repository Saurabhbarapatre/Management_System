import express from "express";

import cors from "cors";

import Incoming from "./Routes/Route.js";

import Verify from "./Controllers/Verify.js";

import db from "./DB.js";

import auth from "./Routes/auth_Route.js";

const App = express();

App.use(express.json());

App.use(cors());

App.use("/auth", auth);

App.use("/Incoming", Verify, Incoming);

App.listen(3000, () => {
  console.log("Server is running");
});
