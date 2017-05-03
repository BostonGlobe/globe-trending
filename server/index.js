"use strict";
const express = require('express');
const TransformData = require('./TransformData.js');
const data = require('../data/article.json');
const https = require('https');


const app = express();

// http://expressjs.com/en/starter/static-files.html

// app settings
app.set('view engine', 'pug');
app.set('views', './components');


// render index
app.get('/', (req, res) => {


  // articleContent = '';
  // for (let i = 0; i < articleData.content.length; i++) {
  //   articleContent += '<' + articleData.content[i].type + '>';
  //   articleContent += articleData.content[i].content;
  //   articleContent += '</' + articleData.content[i].type + '>';
  // }

  // articleData.transformedContent = articleContent;

  // let articleData = new TransformData(data).transform();

  res.render('index', { article: data });
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
