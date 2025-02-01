import { config } from "dotenv";
import mongoose from "mongoose";
import MemoUser from "./model/User.js";
config();

async function seedUsers() {
  await MemoUser.deleteMany();
  await MemoUser.create({
    name: "MasoMenos",
    password: "",
    score: 42,
  });
  await MemoUser.create({
    name: "CathasTrophy",
    password: "",
    score: 21,
  });
  await MemoUser.create({
    name: "Meowington",
    password: "",
    score: 420,
  });
  await MemoUser.create({
    name: "Prüntyőke",
    password: "",
    score: 15,
  });
  await MemoUser.create({
    name: "Maszatka",
    password: "",
    score: 9,
  });
}

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);

  await seedUsers();

  await mongoose.disconnect();
}

main();
