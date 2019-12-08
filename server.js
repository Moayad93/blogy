/****************************
 * Set up and Configuration *
 ****************************/
// Require necessary NPM Packages
const
  express  = require("express"),
  mongoose = require("mongoose"),
  cors     = require("cors");

// Require Route Files
const
  indexRouter    = require("./app/routes/index"),
  articlesRouter = require("./app/routes/articles");

// Require DB Configuration File
const
  db = require("./config/db");

// Establish Database Connection
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once("open", () => {
  console.log("Connected to Mongo");
});

// Instantiate Express Application Object
const
  app = express();

// Define a PORT for the API to run on. Use NodeJS environment & Define a PORT number for the React App
const
  port      = process.env.PORT || 5050,
  reactPort = 3000;

/********************************************************************
 * Middleware                                                       *
 * The method '.use' sets up middleware for the Express application *
 ********************************************************************/
// Add 'bodyParser' middleware which will parse JSON requests into JS objects they reach the route files
app.use(express.json());

// Set CORS headers on response from this API using the "cors" NPM package
app.use(
  cors({ origin: process.env.CLIENT_ORIGIN || `http:/localhost:${reactPort}` })
);

/****************************
 * Routes                   *
 * (Mount imported Routers) *
 ****************************/
// Mount indexRouter on the app
app.use(indexRouter);
app.use(articlesRouter);

// Start the server to listen for requests on a given port
app.listen(port, () => {
  console.log(`Blogy's server started on ${port}`);
});