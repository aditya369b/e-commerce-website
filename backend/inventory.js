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


app.listen(port, () => console.log(`Example app listening on port ${port}!`));