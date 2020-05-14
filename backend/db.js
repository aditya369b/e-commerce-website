const { MongoClient, ObjectID } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "MochaDatabase";

// Create a new MongoClient
const client = new MongoClient(url);

export default client;