import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Cards from "./models/dbCards.js";

const app = express();
const port = process.env.PORT || 8001;
const connectPassword = "HTKVUqc54U6WMeIm";
const connectDB = "tinderDB";
const connectURL = `mongodb+srv://admin:${connectPassword}@cluster0.o55cb.mongodb.net/${connectDB}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

mongoose.connect(connectURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.post("/tinder/card", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const imageURL = req.body.imageURL;
  const created = req.body.created;
  Cards.create({ name, imageURL, created }, (err, data) =>
    err ? res.status(500).send(err) : res.status(201).send(data)
  );
});
app.get("/tinder/card/:id", (req, res) => {
  const cardId = req.params.id;
  Cards.findById(cardId, (err, data) =>
    err ? res.status(404).send(err) : res.status(200).send(data)
  );
});
app.get("/tinder/card", (req, res) => {
  Cards.find((err, data) =>
    err ? res.status(404).send(err) : res.status(200).send(data)
  );
});
app.listen(port, () => console.log(`Server running at port ${port}`));
