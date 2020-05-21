const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT || 5000;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

// api for auth service
app.all("/api/auth/*", (req, res)=> {
  apiProxy.web(req, res, {
    target: "http://localhost:3001"
  });
});

// api for transaction service
app.all("/api/transaction", (req, res)=>{
  apiProxy.web(req, res, {
    target: "http://localhost:3003"
  });
});

// api for inventory service
app.all("/api/item/*", (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3004'
  });
});

// api for receipt service
/*
app.all("*", (req, res) => {
    // front end server -> react
    apiProxy.web(req, res, {
      target: 'http://localhost:3000',
    });
  });
*/

app.listen(port, () => console.log(`Gateway on port ${port}!`))