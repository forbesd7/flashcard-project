const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");

const databaseConnection = require("../database/database");

app.use(express.static(path.join(__dirname, "../build/")));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

app.get("/api/getDecks", (req, res) => {
  axios
    .get("https://tranquil-waters-24492.herokuapp.com/api/decks")
    .then(response => {
      console.log(typeof response.data);
      res.send(response.data);
    })
    .catch(err => console.log(err));
});

app.post("/api/addCard", (req, res) => {
  console.log(req.body);
  databaseConnection("addCard", req.body);
  res.send("hello");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
