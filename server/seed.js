import { config } from "dotenv";
import mongoose from "mongoose";
import MemoUser from "./model/User.js";
import CatPic from "./model/CatPic.js";
import { fetchValidImages } from "./fetchValidImages.js";
config();

async function seedUsers() {
  await MemoUser.deleteMany();
  await MemoUser.create({
    name: "MasoMenos",
    password: "",
    score: 42,
    createdAt: Date.now(),
  });
  await MemoUser.create({
    name: "CathasTrophy",
    password: "",
    score: 21,
    createdAt: Date.now(),
  });
  await MemoUser.create({
    name: "Meowington",
    password: "",
    score: 420,
    createdAt: Date.now(),
  });
  await MemoUser.create({
    name: "Prüntyőke",
    password: "",
    score: 15,
    createdAt: Date.now(),
  });
  await MemoUser.create({
    name: "Maszatka",
    password: "",
    score: 9,
    createdAt: Date.now(),
  });
}

async function seedCatPics() {
  await CatPic.deleteMany();
  const requiredCount = 90;
  const validImages = await fetchValidImages(requiredCount);

  for (const image of validImages) {
    await CatPic.create(image);
  }
}

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);

  //await seedUsers();

  await seedCatPics();

  await mongoose.disconnect();
}

main();
