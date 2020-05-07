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
    //param: {ProductName,ProductPrice,ProductDescription}
    app.post("/api/inventory/create", (req, res)=>{ 
        db.collection('inventory')
        .insertOne({
            ProductDetail: {
                ProductName: req.body.ProductName,
                ProductPrice: req.body.ProductPrice,
                ProductDescription:req.body.ProductDescription,
            }, 
            ProductSoldCount: "0"
        }, (err, item) => {
            if(err) res.status(404).send('Error: Item already exist');
            if(item) res.status(201).send('Item was successfully added to inventory');
        });
    });
    
    //get item info from inventory 
    //param: ProductName
    app.post("/api/inventory/getItem", (req, res)=>{
        db.collection('inventory')
        .findOne({"ProductDetail.ProductName": req.body.ProductName})
        .then(obj=>{
            res.status(200).send({
                price: obj.ProductDetail.ProductPrice, 
                description: obj.ProductDetail.ProductDescription,
                sold: obj.ProductSoldCount,
            });
        })
        .catch( e=> {
            res.status(404).send('item not found');
        });
    });

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
