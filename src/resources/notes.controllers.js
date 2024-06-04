import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @returns transaction object
 */
async function getTransaction(id) {
  let sql = "SELECT * FROM transactions WHERE id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All transaction
 * @route GET /transactions
 */
export const getAllTransactions = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from transactions";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ transactions: rows });
});

/**
 * @description Get Single transaction
 * @route GET /transactions/:id
 */
export const getSingleTransaction = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const transaction = await getTransaction(id);
  if (!transaction) return next(createCustomError("transaction not found", 404));

  return res.status(200).json(transaction);
});

/**
 * @description Create transaction
 * @route POST /transactions
 */
export const createTransaction = tryCatchWrapper(async function (req, res, next) {
  const { title, contents } = req.body;

  if (!title || !contents)
    return next(createCustomError("All fields are required", 400));

  let sql = "INSERT INTO transactions (title, contents) VALUES (?, ?)";
  await pool.query(sql, [title, contents]);

  return res.status(201).json({ message: "transaction has been created" });
});

/**
 * @description Update transaction
 * @route PATCH /transactions/:id
 */
export const updateTransaction = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!id || !title || !contents)
    return next(createCustomError("All fields are required", 400));

  const transaction = await getTransaction(id);
  if (!transaction) return next(createCustomError("transaction not found", 404));

  let sql = "UPDATE transactions SET title = ? , contents = ? WHERE id = ?";
  await pool.query(sql, [title, contents, id]);

  return res.status(201).json({ message: "transaction has been updated" });
});

/**
 * @description Delete transaction
 * @route DELETE /transactions/:id
 */
export const deleteTransaction = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const transaction = await getTransaction(id);
  if (!transaction) return next(createCustomError("transaction not found", 404));

  let sql = "DELETE FROM transactions WHERE id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "transaction has been deleted" });
});






















