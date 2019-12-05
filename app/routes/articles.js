/****************************
 * Set up and Configuration *
 ****************************/
// Require necessary NPM Packages
const
  express = require("express");

// Instantiate a Router (mini app that only handles routes)
const
  router = express.Router();

/*********************************
 * Action     : INDEX            *
 * Method     : GET              *
 * URI        : /api/articles    *
 * Description: Get All Articles *
 *********************************/

/********************************************************
 * Action     : SHOW                                    *
 * Method     : GET                                     *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r *
 * Description: Get an Article by Article ID            *
 ********************************************************/

/*************************************
 * Action     : CREATE               *
 * Method     : POST                 *
 * URI        : /api/articles        *
 * Description: Create a new Article *
 *************************************/

/********************************************************
 * Action     : UPDATE                                  *
 * Method     : PATCH                                   *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r *
 * Description: Update an Article by Article ID         *
 ********************************************************/

/********************************************************
 * Action     : DESTROY                                 *
 * Method     : DELETE                                  *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r *
 * Description: Delete an Article by Article ID         *
 ********************************************************/

// Export the Router so we can use it in the server.js file
module.exports = router;
