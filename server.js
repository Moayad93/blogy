/****************************************************************
 * #	Action 	URL      	 HTTP Verb	mongoose method             *
 * 1	Index  	/xxxx    	 GET      	Xxx.find({})                *
 * 2	Show   	/xxxx/:id	 GET      	Xxx.findById(req.params.id) *
 * 3	Create 	/xxxx    	 POST     	Xxx.create(req.body)        *
 * 4	Update 	/xxxx/:id	 PUT      	Xxx.findByIdAndUpdate()     *
 * 5	Destroy	/xxxx    	 DELETE   	Xxx.findByIdAndRemove()     *
 ****************************************************************/

/****************************
 * Set up and Configuration *
 ****************************/
// Require necessary NPM Packages
const
  express  = require("express"),
  mongoose = require("mongoose");

// Require Route Files
const
  indexRoute = require("./app/routes/index");

// Instantiate Express Application Object
const
  app = express();

// Define a PORT for the API to run on. Use NodeJS environment
const
  port = process.env.PORT || 5000;

/****************************
 * Routes                   *
 * (Mount imported Routers) *
 ****************************/

// Mount indexRoute on the app
app.use(indexRoute);

// Start the server to listen for requests on a given port
app.listen(port, () => {
  console.log(`Blogy's server started on ${port}`);
});