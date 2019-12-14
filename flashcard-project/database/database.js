const mongo = require("mongodb").MongoClient;

const main = async () => {
  const url = "mongodb://localhost:27017";
  const client = new mongo(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await client.connect();
  await listDatabases(client);
};

async function listDatabases(client) {
  databasesList = await client
    .db()
    .admin()
    .listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

main();

module.exports = main;

// mongo.connect(
//   url,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   (err, client) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     const db = client.db("flashcard");

//     const collection = db.collection("deck1");

//     collection.insertOne({ test2: "Roger" }, (err, result) => {});

//     client.close();
//   }
// );
