import express from "express";
import {
  createTransactions
} from "./transactions.controllers.js";

const router = express.Router();

router.route("/").post(createTransactions);


export default router;







