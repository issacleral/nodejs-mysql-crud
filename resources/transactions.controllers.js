import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @returns transactions object
 */
async function getTransactions(id) {
  let sql = "SELECT * FROM transactions WHERE id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All transactions
 * @route GET /transactions
 */
export const getAllTransactions = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from transactions";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ transactions: rows });
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
export const getSingleTransactions = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const transactions = await getTransactions(id);
  if (!transactions) return next(createCustomError("transactions not found", 404));

  return res.status(200).json(transactions);
});

/**
 * @description Create transactions
 * @route POST /notes
 */
export const createTransactions = tryCatchWrapper(async function (req, res, next) {
  const { title, contents } = req.body;
  console.log("Entra por aqui....");
  console.log(title);
  console.log(contents);

  if (!title || !contents)
    return next(createCustomError("All fields are required", 400));

  let sql = "INSERT INTO notes (title, contents) VALUES (?, ?)";
  await pool.query(sql, [title, contents]);

  return res.status(201).json({ message: "note has been created" });
});

/**
 * @description Update transactions
 * @route PATCH /transactions/:id
 */
export const updateNote = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!id || !title || !contents)
    return next(createCustomError("All fields are required", 400));

  const transactions = await getTransactions(id);
  if (!transactions) return next(createCustomError("transactions not found", 404));

  let sql = "UPDATE notes SET title = ? , contents = ? WHERE id = ?";
  await pool.query(sql, [title, contents, id]);

  return res.status(201).json({ message: "transactions has been updated" });
});

/**
 * @description Delete transactions
 * @route DELETE /transactions/:id
 */
export const deleteNote = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const note = await getTransactions(id);
  if (!note) return next(createCustomError("transactions not found", 404));

  let sql = "DELETE FROM transactions WHERE id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "transactions has been deleted" });
});




























