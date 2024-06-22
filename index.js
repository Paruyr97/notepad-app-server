const express = require("express");
const cors = require("cors");
const { data } = require("./data.js");
const { PORT } = require("./constants.js");


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(data);
});

app.put("/", (req, res) => {
    console.log(req, res);
});

app.post("/", (req, res) => {
    console.log(req, res);
});

app.delete("/", (req, res) => {
    console.log(req, res);
});

app.listen(PORT, () => console.log(`server runs on ${PORT} port`));
