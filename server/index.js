"use strict";
const express = require('express');
const TransformData = require('./TransformData.js');
const data = require('../data/article.json');
const indexData = require('../data/index.json');

const app = express();

// http://expressjs.com/en/starter/static-files.html

// app settings
app.set('view engine', 'pug');
app.set('views', './components');

// render index
app.get('/', (req, res) => {

  res.render('index', { data: indexData });

});

// render index
app.get('/article/', (req, res) => {
  let articleData = new TransformData(data).transform();
  res.render('article', { article: articleData });
});

// listen for requests
let listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
