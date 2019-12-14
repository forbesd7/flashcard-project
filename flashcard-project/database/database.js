const mongo = require("mongodb").MongoClient;
const url =
  process.env.MONGODB_URI ||
  "mongodb://derekforbes:derekforbes7@ds353358.mlab.com:53358/heroku_5cv1td3b";

const main = async func => {
  console.log(url);
  const client = new mongo(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    if (func == "listDatabases") {
      await listDatabases(client);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

async function listDatabases(client) {
  // const databasesList = await client
  //   .db()
  //   .admin()
  //   .listDatabases();

  // console.log("Databases:");
  // databasesList.databases.forEach(db => console.log(` - ${db.name}`));

  const db = await client.db("heroku_5cv1td3b");

  const collection = await db.collection("deck1");

  await collection.insertOne({ test2: "helloooo" });
}
main("listDatabases");
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
