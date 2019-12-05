/****************************
 * Set up and Configuration *
 ****************************/
// Require necessary NPM Packages
const
  express = require("express");

// Instantiate a Router (mini app that only handles routes)
const
  router = express();

/***********************************
 * Action     : INDEX              *
 * Method     : GET                *
 * URI        : /                  *
 * Description: Get the Root Route *
 ***********************************/
router.get("/", (request, response) => {
  response.json({ message: "WElcome to Blogy" });
});

// Export the Router so we can use it in the server.js file
module.exports = router;
