import express from "express";
import dotenv from "dotenv";
import { notFound } from "./src/middlewares/notFound.js";
import { handleError } from "./src/middlewares/handleError.js";
import transactionsRoute from "./src/resources/transactions/transactions.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

// api routes
app.use("/transactions", transactionsRoute);

app.use(notFound);
app.use(handleError);

app.listen(port, () => {
  console.log('Hello Node...');
  console.log(`server running on port ${port}`);
});
