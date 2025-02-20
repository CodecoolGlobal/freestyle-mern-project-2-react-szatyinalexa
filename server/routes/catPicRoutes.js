import express from "express";
import { getCatPics } from "../controller/catPicController.js";

const catPicsRouter = express.Router();

catPicsRouter.get("/", getCatPics);

export default catPicsRouter;