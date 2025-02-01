import { config } from "dotenv";
import mongoose from "mongoose";
import express from "express";
import userRoutes from "./routes/userRoutes.js";

config();

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);

  app.listen(3000, () =>
    console.log({ message: "Server is running on port 3000" })
  );
}

main();
