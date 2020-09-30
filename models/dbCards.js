import mongoose from "mongoose";

const Schema = mongoose.Schema({
  name: String,
  imageURL: String,
  created: String,
});

export default mongoose.model("cards", Schema);
