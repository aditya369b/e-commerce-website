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

    //Api to create item in inventory
    app.post("/api/inventory/create", (req, res)=>{ 
        db.collection('inventory')
        .insertOne({name:req.body.name, price:req.body.price, quantity:req.body.quantity, description:req.body.description}, (err, item) => {
            if(err) res.status(404).send('Error: Item already exist');
            if(item) res.status(201).send('Item was successfully added to inventory');
        });
    });

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
