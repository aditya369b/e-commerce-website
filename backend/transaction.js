const express = require("express");
const app = express();
const port = 3003;
// const redis = require('redis');
// const client = redis.createClient();

const KafkaProducer = require('./Kafka/KafkaProducer.js');

const producer = new KafkaProducer('myTopic');

app.use(express.json()); // this is a middleware

// app.get('/service1/*', (req, res) => {
//     console.log("Hi! world!");
// client.publish('transactionChannel', `Hello has been visited`);

// });

//apis

app.post('/transaction', (req,res) => {

    let username = req.body.username;
    let items = req.body.items;
    let price = req.body.price;
  
    let date = new Date();
    // let transactionId = _id;
        // records the transaction
    db.collection("transactionCollection")
        .insert({
          items: items,
          buyer: username,
          price: price,
          purchaseDate: date,
        })
        .then((doc) => {
          res.send({valid: true, result: doc,});
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
          res.send({ valid: doc });
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
          res.send({ valid: doc });
        })
        .catch((e) => {
          console.log(e);
          res.send("Error ", e);
        });
  



    console.log('Pushing new item to queue');
    producer.send(req.body);
    res.send('Item added to queue');
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
