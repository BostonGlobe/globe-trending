const express = require('express');
const request = require('request');
const rawIndexData = require('../data/index.json');
const TransformIndexData = require('./TransformIndexData.js');
const rawArticleData = require('../data/article.json');
const TransformArticleData = require('./TransformArticleData.js');
const rawChartbeatData = require('../data/chartbeat.json');

const app = express();

// http://expressjs.com/en/starter/static-files.html

// app settings
app.set('view engine', 'pug');
app.set('views', './components');


// render index
app.get('/', (req, res) => {

  let indexData = new TransformIndexData(rawIndexData, rawChartbeatData).transform();
  res.render('index', { data: indexData, chartbeat: rawChartbeatData });

});

// render article
app.get('/article/:section/:year/:month/:day/:slug/:garbage/story', (req, res) => {

  let globeURL = 'http://www.bostonglobe.com' + req.url.replace('/article', '') + '.json';

  request({'json': true, 'uri': globeURL}, (error, response, body) => {

      if (!error && response.statusCode == 200) {

        let articleData = new TransformArticleData(body).transform();
        res.render('article', { article: articleData });

      } else {
        // IDK, maybe render a 404 or something?

      }

  });
  
});

// listen for requests
let listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
