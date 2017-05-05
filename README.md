# Boston Globe Trending Progressive Web App
Built by [Eddie Kennedy](https://github.com/eddiekennedy), [Connor MacDonald](https://github.com/fmcat) and Kelsey Kronmiller for Spring Hack Day 2017.

Displays Most Popular Globe content, along with basic stats on popular referrers and comments. Leverages the styles for Big Article templates built by the Sites team for Big Article template, and the API built for the Sports 2.0 project.

## Getting set up:
1. `npm install` Download dependencies (you'll need NPM)
2. `npm start` Start the development environment (localhost:9000)
This will start the node server and the webpack watch loop for styles/js. Currently there is no JS for the app.
3. Get a sample of data to put into the `/data/` directory. See either Eddie or Connor for this.

## Things this thing is built with:
- Node/Express - Server
- Pug - Templating
- Webpack SASS (Because #hackday)


---

## Screenshots
### Homepage
<img width="889" alt="screen shot 2017-05-05 at 3 34 23 pm" src="https://cloud.githubusercontent.com/assets/4061265/25761325/7bc9b2b8-31a8-11e7-8887-c66b3cc3dd27.png">

### Article
<img width="412" alt="screen shot 2017-05-05 at 3 35 08 pm" src="https://cloud.githubusercontent.com/assets/4061265/25761331/8401a1ac-31a8-11e7-97c6-6066dd342919.png">

---

## TODO
* Offline browsing
* Taxonomy specific data
* Get server to send transformed JSON data instead of HTML
