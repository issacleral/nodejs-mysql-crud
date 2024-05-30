import express from "express";
import {
  createNote
} from "./notes.controllers.js";

const router = express.Router();

router.route("/").post(createNote);


export default router;
