const express = require("express");
const app = express();
const port = 3003;

const KafkaProducer = require('./Kafka/KafkaProducer.js');

const producer = new KafkaProducer('myTopic');

const { MongoClient, ObjectID } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "Mocha";
const client = new MongoClient(url);

app.use(express.json()); // this is a middleware

//apis
/*

  POST:
  "/api/transaction" - To record a transaction/purchase

*/

client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to server");
  const db = client.db(dbName);

app.post('/api/transaction', (req,res) => {

    let username = req.body.username;
    let items = req.body.itemId;
    let price = req.body.price;
  
    let date = new Date();
    // let transactionId = _id;

    let result = {}
        // records the transaction
    db.collection("transactionCollection")
        .insert({
          items: items,
          buyer: username,
          price: price,
          purchaseDate: date,
        })
        .then((doc) => {
          result["transaction"] = {valid: true, result: doc,};
        })
        .catch((e) => {
          console.log(e);
          res.send("Error", e);
        });
  
          /** Updates the buyer user in purchase history */
        db.collection("UserCollection")
        .findOneAndUpdate(
          {
            userId: username,
          },
          {
            $push: { items: items },  // yet to verify
          }
        )
        .then((doc) => {
          console.log(doc);
          result["buyer"] = { valid: doc };
        })
        .catch((e) => {
          console.log(e);
          res.send("Error ", e);
        });
  
            /** Item's salescount is increased */
        db.collection("ItemCollection")
        .findOneAndUpdate(
          {
            itemId: items,
          },
          {
            $inc: { salesCount: 1 },
          }
        )
        .then((doc) => {
          console.log(doc);
          result["transaction"] = { valid: doc };
        })
        .catch((e) => {
          console.log(e);
          res.send("Error ", e);
        });

    console.log('Pushing new item to queue');
    producer.send(req.body);
    res.send(result);
});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
