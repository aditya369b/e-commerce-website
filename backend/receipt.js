const express = require("express");
const app = express();
const port = 3005;

app.use(express.json()); // this is a middleware

//apis

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
