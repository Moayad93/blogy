// Require necessary NPM Packages
const
  express = require("express"),
  mongoose = require("mongoose");

// Instantiate Express Application Object
const
  app = express();

// Define PORT for the API to run on. Use NodeJS environment
const
  port = process.env.PORT || 5000;

// Start the server to listen for requests on a given port
app.listen(port, () => {
  console.log(`Blogy's server started on ${port}`);
});