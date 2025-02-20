import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CatPicSchema = new Schema({
    link: String,
    width: Number,
    height: Number,
    lastUsed: Date,
    usedCount: Number,
    createdAt: Date,
});

export default model("CatPic", CatPicSchema);