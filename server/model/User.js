import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: String,
  score: Number,
  password: String,
  createdAt: Date,
});

export default model("User", UserSchema);
