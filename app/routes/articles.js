/****************************
 * Set up and Configuration *
 ****************************/
// Require necessary NPM Packages
const
  express = require("express");

// Require Mongoose Model for Article
const
  Article = require("../models/article");

// Instantiate a Router (mini app that only handles routes)
const
  router = express.Router();

/****************************************************************
 * #	Action 	URL      	 HTTP Verb	mongoose method             *
 * 1	Index  	/xxxx    	 GET      	Xxx.find({})                *
 * 2	Show   	/xxxx/:id	 GET      	Xxx.findById(req.params.id) *
 * 3	Create 	/xxxx    	 POST     	Xxx.create(req.body)        *
 * 4	Update 	/xxxx/:id	 PUT      	Xxx.findByIdAndUpdate()     *
 * 5	Destroy	/xxxx    	 DELETE   	Xxx.findByIdAndRemove()     *
 ****************************************************************/

/*********************************
 * Action     : INDEX            *
 * Method     : GET              *
 * URI        : /api/articles    *
 * Description: Get All Articles *
 *********************************/
router.get("/api/articles", (request, response) => {
  // Return all Articles as an Array
  Article.find()
    .then(articles => {
      response.status(200).json({ articles: articles });
    })
    // Catch any errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});

/********************************************************
 * Action     : SHOW                                    *
 * Method     : GET                                     *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r *
 * Description: Get an Article by Article ID            *
 ********************************************************/
router.get("/api/articles/:id", (request, response) => {
  const
    articleID  = request.params.id;

  Article.findById(articleID)
    .then(article => {
      if (article) {
        // XXXXXXXX Pass the result of Mongoose's ".delete" method to the next ".then"
        // promise returned from findOneAndUpdate() is returned to the next then()
        return response.json({ article });
      } else {
        // If we could not find a document with the matching ID
        response.status(404).json({
          error: {
            name   : "DocumentNotFoundError",
            message: "The provided ID doesn't match any documents"
          }
        });
      }
    })
    // If the show succeeded, return 202 and no JSON
    .then(() => {
      response.status(201).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});

/*************************************
 * Action     : CREATE               *
 * Method     : POST                 *
 * URI        : /api/articles        *
 * Description: Create a new Article *
 *************************************/
router.post("/api/articles", (request, response) => {
  const
    article = request.body.article;

  Article.create(article)
    // On a successful "create" action, respond with 201
    // HTTP status and the content of the new article
    .then(newArticle => {
      response.status(201).json({ article: newArticle });
    })
    // Catch any Errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
})

/********************************************************
 * Action     : UPDATE                                  *
 * Method     : PATCH                                   *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r *
 * Description: Update an Article by Article ID         *
 ********************************************************/
router.patch("/api/articles/:id", (request, response) => {
  const
    articleID  = request.params.id,
    newArticle = request.body.article;

  Article.findById(articleID)
    .then(article => {
      if (article) {
        // XXXXXXXX Pass the result of Mongoose's ".delete" method to the next ".then"
        // promise returned from findOneAndUpdate() is returned to the next then()
        return article.updateOne({article: newArticle});
      } else {
        // If we could not find a document with the matching ID
        response.status(404).json({
          error: {
            name   : "DocumentNotFoundError",
            message: "The provided ID doesn't match any documents"
          }
        });
      }
    })
    // If the updating succeeded, return 202 and no JSON
    .then(() => {
      response.status(202).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});

/********************************************************
 * Action     : DESTROY                                 *
 * Method     : DELETE                                  *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r *
 * Description: Delete an Article by Article ID         *
 ********************************************************/
router.delete("/api/articles/:id", (request, response) => {
  const
    articleID = request.params.id;

  Article.findById(articleID)
    .then(article => {
      if (article) {
        // Pass the result of Mongoose's ".delete" method to the next ".then"
        return article.remove();
      } else {
        // If we could not find a document with the matching ID
        response.status(404).json({
          error: {
            name   : "DocumentNotFoundError",
            message: "The provided ID doesn't match any documents"
          }
        });
      }
    })
    // If the deletion succeeded, return 204 and no JSON
    .then(() => {
      response.status(204).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});

// Export the Router so we can use it in the server.js file
module.exports = router;
