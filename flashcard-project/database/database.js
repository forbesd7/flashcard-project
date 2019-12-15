const mongo = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
//mongodb (online one ) is mongodb://derekforbes:derekforbes7@ds353358.mlab.com:53358/heroku_5cv1td3b

const toArray = iterator => {
  return new Promise((resolve, reject) => {
    iterator.toArray((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const databaseConnection = async (func, data) => {
  console.log(url);
  const client = new mongo(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    if (func == "addCard") {
      await addCard(client, data);
    } else if (func == "getDecks") {
      const collections = await getDecks(client);
      return collections;
    } else {
      console.log("no function given");
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

const getDecks = async client => {
  const db = await client.db("heroku_5cv1td3b");
  const collectionArray = await toArray(db.listCollections());
  return collectionArray;
};
async function addCard(client, data) {
  const db = await client.db("heroku_5cv1td3b");
  await db.createCollection(data);
  //const collection = await db.collection("deck1");

  //await collection.insertOne(data);
}
databaseConnection();
module.exports = databaseConnection;

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
