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

// api for notification service

// api for transaction service

// api for inventory service

// api for receipt service

app.all("*", (req, res) => {
    // front end server -> react
    apiProxy.web(req, res, {
      target: 'http://localhost:3000',
    });
  });
  
  app.listen(port, () => console.log(`Gateway on port ${port}!`))