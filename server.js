/****************************
 * Set up and Configuration *
 ****************************/
// Require necessary NPM Packages
const
  express  = require("express"),
  mongoose = require("mongoose");

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

// Define a PORT for the API to run on. Use NodeJS environment
const
  port = process.env.PORT || 5050;

/*************************************************************
 * Middleware                                                *
 * (Add 'bodyParser' middleware which will parse             *
 * JSON requests into JS objects they reach the route files) *
 *************************************************************/
// The method '.use' sets up middleware for the Express application
app.use(express.json());

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