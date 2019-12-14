const mongo = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new mongo(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const main = async () => {
  console.log(url);
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

async function listDatabases(client) {
  const databasesList = await client
    .db()
    .admin()
    .listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));

  const db = await client.db("flashcard");

  const collection = await db.collection("deck1");

  await collection.insertOne({ test2: "ASDASasdDASD" });
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
