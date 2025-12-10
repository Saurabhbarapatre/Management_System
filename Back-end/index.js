import express from "express";

import cors from "cors";

import Incoming from "./Routes/Route.js";

import db from "./DB.js";

const App = express();

App.use(express.json());

App.use(cors());

App.use("/Incoming", Incoming);

App.listen(3000, () => {
  console.log("Server is running");
});
