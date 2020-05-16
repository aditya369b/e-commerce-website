const { MongoClient, ObjectID } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "TestDatabase";

// Create a new MongoClient
const client = new MongoClient(url);

client.connect((err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  
    console.log("Connected successfully to server");
    const db = client.db(dbName);
  
    db.collection("TransCollection").drop();
    db.collection("ItemCollection").drop();
    db.collection("UserCollection").drop();

    let date = new Date();

    /** Creates users in the db */
    defaultUsers = [
        {userId: "test_seller", password: 123, userType: "seller", email: "", items : ["test_seller_reader", "test_seller_book"]},
        {userId: "test_buyer", password: 123, userType: "buyer", email: "", items : ["test_seller_book"]},
    ]
        
    db.collection("UserCollection")
        .insertMany(defaultUsers, function(err,res){
            if (err) throw err;

            console.log(res);
        });


        /** Creates items in db */
    let itemDetails1 = {itemName: "reader", itemPrice: 19.99, itemDesc: "A reader", itemDate: new Date(), itemURL: ""}
    let itemDetails2 = {itemName: "book", itemPrice: 9.99, itemDesc: "A book", itemDate: new Date(), itemURL: ""}

    defaultItems = [
        {itemId: "test_seller_reader", itemDetails: itemDetails1, seller: "test_seller", salesCount: 0, forSale : true},
        {itemId: "test_seller_book", itemDetails: itemDetails2, seller: "test_seller", salesCount: 1, forSale : true},
    ]
        
    db.collection("ItemCollection")
        .insertMany(defaultItems, function(err,res){
            if (err) throw err;

            console.log(res);
        });

    defaultTransaction = [
        {items: "test_seller_book", buyer: "test_buyer", price: 9.99, purchaseDate: new Date()},
    ]
        
    db.collection("TransCollection")
        .insertMany(defaultTransaction, function(err,res){
            if (err) throw err;

            console.log(res);
        });


});