const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://vishal:admin@shopapp.upwujhl.mongodb.net/?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected");
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
