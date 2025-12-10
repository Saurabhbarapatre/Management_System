import express from "express";

import Routelogic from "../Controllers/Controller.js";

const router = express.Router();

// GET request

router.get("/", Routelogic.getpost);

// Post request

router.post("/", Routelogic.createpost);

// Delete request

router.delete("/:id", Routelogic.deletepost);

// Update request

router.put("/:id", Routelogic.Updatedata);

export default router;
