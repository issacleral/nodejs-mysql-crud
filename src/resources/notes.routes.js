import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getSingleTransaction,
  getSingleTransaction,
  updateTransaction,
  updateTransaction,
} from "./notes.controllers.js";

const router = express.Router();

router.route("/").get(getAllTransactions).post(createTransaction);
router.route("/:id").get(getSingleTransaction).patch(updateTransaction).delete(deleteTransaction);

export default router;





