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

// app.get("/api/getDecks", (req, res) => {
//   axios
//     .get("https://tranquil-waters-24492.herokuapp.com/api/decks")
//     .then(response => {
//       console.log(typeof response.data);
//       res.send(response.data);
//     })
//     .catch(err => console.log(err));
// });

app.get("/api/getDecks", async (req, res) => {
  const collections = await databaseConnection("getDecks");
  deckNames = collections.map(collection => {
    return collection.name;
  });
  res.send(deckNames);
});

app.post("/api/addCard", (req, res) => {
  console.log(req.body);
  databaseConnection("addCard", req.body.deckName);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
