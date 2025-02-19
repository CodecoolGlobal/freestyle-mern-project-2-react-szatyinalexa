import { config } from "dotenv";
import mongoose from "mongoose";
import MemoUser from "./model/User.js";
import CatPic from "./model/CatPic.js";
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

async function fetchValidImages(requiredCount) {
  const apiKey = process.env.CAT_API_KEY;
  const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=50&mime_types=jpg,png&api_key=${apiKey}`;
  const validImageSet = new Set();
  
  while (validImageSet.size < requiredCount) {
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    data.forEach((datum) => {
      const idealWidthHeightRatio = 0.8;
      const widthHeightRatio = datum.width / datum.height;
        if (widthHeightRatio >= idealWidthHeightRatio - 0.2 && widthHeightRatio <= idealWidthHeightRatio + 0.2) {
          const catPic = {
            link: datum.url,
            width: datum.width,
            height: datum.height,
            usedCount: 0,
            createdAt: Date.now(),
          }
          validImageSet.add(catPic);
        }
    });
  }
  return Array.from(validImageSet).slice(0, requiredCount);
}

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);

  await seedUsers();

  await seedCatPics();

  await mongoose.disconnect();
}

main();
