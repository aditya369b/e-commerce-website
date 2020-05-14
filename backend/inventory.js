const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb');
const app = express();

const port = 3004;
const url = 'mongodb://localhost:27017';
const itemDb = 'EcommerceDatabase';

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

MongoClient.connect(url, (err, client)=>{
    if(err){
        console.log(err);
        process.exit(1);
    }
    console.log('Connected successfully to server');
    const db = client.db(itemDb);


    //Api
    //create item in inventory
    app.post("/api/inventory/create", (req, res)=>{ 
        console.log("inside create", req)
        db.collection('inventory')
        .insertOne({name:req.body.item_name, price:req.body.item_price, quantity:req.body.item_quantity, description:req.body.item_description}, (err, item) => {
            if(err) res.status(404).send('Error: Item already exist');
            if(item) res.status(201).send('Item was successfully added to inventory');
        });
    });
    //get item info from inventory
    app.post("/api/inventory/getItem", (req, res)=>{
        console.log("inside getitems")
        const rows = db.collection('inventory').find().toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
        })
        /*.then(obj=>{
            res.status(200).send({
                name: obj.name,
                price: obj.price, 
                quantity: obj.quantity,
                description: obj.description,
                
            });*/
        })
        
    });



/** Database */
const { MongoClient, ObjectID } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "MochaDatabase";
const client = new MongoClient(url);

app.use(express.json()); // this is a middleware

//apis
/*

"/api/item/create" - To add an item in db
"/api/item/edit" - To edit an item
"/api/item/delete" - To modify an item as unavailable
"/api/item/getInfo" - To fetch item details for a buyer/seller

*/
client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to server");
  const db = client.db(dbName);

  app.post("/api/item/create", (req, res) => {
      // Should check whether itemId exisits in db or not. May do it at front end as well ????
    db.collection("ItemCollection")
      .insert({
        itemId: req.body.username + "_" + req.body.name, // unique id
        itemDetails: {
          itemName: req.body.name,
          itemPrice: req.body.price,
          itemDesc: req.body.desc,
          itemDate: req.body.date,
          itemURL: req.body.URL,
        },
        seller: req.body.username,
        salesCount: 0,
        forSale: true,
      })
      .then((doc) => {
        console.log(doc);
        res.send({
          valid: true,
          result: doc,
        });
      })
      .catch((e) => {
        console.log(e);
        res.send("Error", e);
      });

    db.collection("UserCollection")
      .findOneAndUpdate(
        {
          userId: req.body.username,
        },
        {
          $push: { items: req.body.username + "_" + req.body.itemName },
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
  });

  app.post("/api/item/delete", (req, res) => {
    db.collection("ItemCollection")
      .findOneAndUpdate(
        {
          itemId: req.body.username + "_" + req.body.itemName,
        },
        {
          $set: { forSale: false },
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
  });

  app.post("/api/item/edit", (req, res) => {
    db.collection("ItemCollection")
      .findOneAndUpdate(
        {
          itemName: req.body.itemId,
        },
        {
          //   $set: { itemName: false, itemPrice: 99, itemDesc },
          $set: req.body.params,
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
  });

  app.post("/api/item/getInfo", (req, res) => {
    let itemDetails = [];

    db.collection("UserCollection")
      .aggregate([
        { $lookup:
           {
             from: 'ItemCollection',
             localField: 'items',
             foreignField: 'itemId',
             as: 'itemDetails'
           }
         }
        ]).toArray(function(err, response) {
        if (err) throw err;
        console.log(JSON.stringify(response));
        for(let i=0; i<response.length; i++){
            let resObj = response[i];
            if(resObj["userId"] == req.body.username)
            {   itemDetails = resObj["itemDetails"];
                break;}
        }
        res.send({result : itemDetails});
        });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
