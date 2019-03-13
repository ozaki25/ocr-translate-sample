require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = '5000';
const url = process.env.API_URL;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-cookies',
  );
  next();
});

app.get('/translate', (req, res) => {
  const {
    query: { text, source, target },
  } = req;
  console.log(`${url}?text=${text}&source=${source}&target=${target}`);
  fetch(
    encodeURIComponent(`${url}?text=${text}&source=${source}&target=${target}`),
  ).then(response =>
    response.json().then(json => {
      console.log(json);
      res.send(JSON.stringify(json));
    }),
  );
});

app.listen(port, () => {
  console.log(`app start listening on port ${port}`);
});
