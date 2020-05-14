const express = require("express");
const app = express();
const port = 3003;
// const redis = require('redis');
// const client = redis.createClient();

app.use(express.json()); // this is a middleware

// app.get('/service1/*', (req, res) => {
//     console.log("Hi! world!");
// client.publish('transactionChannel', `Hello has been visited`);

// });

//apis

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
