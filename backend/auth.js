const express = require("express");
const app = express();
const port = 3001;

/** Database */
const { MongoClient, ObjectID } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "MochaDatabase";
const client = new MongoClient(url);

app.use(express.json()); // this is a middleware

//apis

client.connect((err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  
    console.log("Connected successfully to server");
    const db = client.db(dbName);

  // user authentication
  app.post("/api/auth/login", (req, res) => {
    db.collection("UserCollection")
      .findOne({
        userId: req.body.userId,
      })
      .then((doc) => {
        console.log(doc);
        res.send({
          valid: doc !== null && doc.password === req.body.password,
        });
      })
      .catch((e) => {
        console.log(e);
        res.send("Error", e);
      });
  });

  // For creating user/ signup
  app.post("/api/db/signup", (req, res) => {

    db.collection("UserCollection")
      .findOne({
        userId: req.body.userId,
      })
      .then((doc) => {
        console.log(doc);
        if (doc !== null)
          res.send({
            valid: false,
            cause: "User Already exists",
          });
      })
      .catch((e) => {
        console.log(e);
        res.send("Error", e);
      });

    db.collection("MyCollection")
      .insert({
        userId: req.body.userId,
        password: req.body.password,
        userType: req.body.userType,
        items: [],
      })
      .then((doc) => {
        res.send({
          valid: true,
          cause: "User signed up!",
        });
      })
      .catch((e) => {
        console.log(e);
        res.send("Error", e);
      });
  });
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});