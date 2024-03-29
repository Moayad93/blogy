/****************************
 * Set up and Configuration *
 ****************************/
// Require necessary NPM Packages
const
  express = require("express");

// Require Mongoose Models for Article and Comment
const
  Article = require("../models/article").Article,
  Comment = require("../models/article").Comment;

// Instantiate a Router (mini app that only handles routes)
const
  router = express.Router();


/*────────────────*
 * Article Routes *
 *────────────────*/

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
router.get("/api/articles/:articleId", (request, response) => {
  const
    articleId = request.params.articleId;

  Article.findById(articleId)
    .then(article => {
      if (article) {
        // Pass the result of Mongoose's ".get" method to the next ".then"
        // Promise returned from response.json() is returned to the next ".then"
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
    // If the showing succeeded, return 202 and no JSON
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
});

/********************************************************
 * Action     : UPDATE                                  *
 * Method     : PATCH                                   *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r *
 * Description: Update an Article by Article ID         *
 ********************************************************/
router.patch("/api/articles/:articleId", (request, response) => {
  const
    articleId  = request.params.articleId,
    newArticle = request.body.article;

  Article.findById(articleId)
    .then(article => {
      if (article) {
        // Pass the result of Mongoose's ".patch" method to the next ".then"
        // Promise returned from updateOn() is returned to the next ".then"
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
    // If the updating succeeded, return 204 and no JSON
    .then(() => {
      response.status(204).end();
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
router.delete("/api/articles/:articleId", (request, response) => {
  const
    articleId = request.params.articleId;

  Article.findById(articleId)
    .then(article => {
      if (article) {
        // Pass the result of Mongoose's ".delete" method to the next ".then"
        // Promise returned from remove() is returned to the next ".then"
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
      //
      response.status(204).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});


/*────────────────*
 * Comment Routes *
 *────────────────*/

/*****************************************************************
 * Action     : INDEX                                            *
 * Method     : GET                                              *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r/comments *
 * Description: Get All Comments for an Article                  *
 *****************************************************************/
router.get("/api/articles/:articleId/comments", (request, response) => {
  const
    articleId = request.params.articleId;

    Article.findById(articleId)
    .then(article => {
      if (article) {
        // Pass the result of Mongoose's ".get" method to the next ".then"
        // Promise returned from response.json() is returned to the next ".then"
        const
          comments = response.json({ comments: article.comments });

        return comments;
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
    // If the showing succeeded, return 200 and no JSON
    .then(() => {
      response.status(200).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});

/*******************************************************************************************
 * Action     : SHOW                                                                       *
 * Method     : GET                                                                        *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r/comments/22ftr54t8mu4xx78sww9r774r *
 * Description: Get a Comment from an Article by Comment ID and Article ID                 *
 *******************************************************************************************/
router.get("/api/articles/:articleId/comments/:commentId", (request, response) => {
  const
    articleId = request.params.articleId,
    commentId = request.params.commentId;

    Article.findById(articleId)
    .then(article => {
      if (article) {
        // Pass the result of Mongoose's ".get" method to the next ".then"
        // Promise returned from response.json() is returned to the next ".then"
        const
          comment = response.json({ comment: article.comments.id(commentId) });

        return comment;
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
    // If the showing succeeded, return 200 and no JSON
    .then(() => {
      response.status(200).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});

/*****************************************************************
 * Action     : CREATE                                           *
 * Method     : POST                                             *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r/comments *
 * Description: Create a new Comment for an Article              *
 *****************************************************************/
router.post("/api/articles/:articleId/comments", (request, response) => {
  const
    articleId  = request.params.articleId,
    comment    = request.body.comment,
    newComment = new Comment({ text: comment.text });

  Article.findById(articleId)
    // On a successful "create" action, respond with 201
    // HTTP status and the content of the new comment
    .then(article => {
      if (article) {
        article.comments.push(newComment);
        // ".markModified" might not be needed
        article.markModified("comments");
        return article.save();
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
    // If the creation succeeded, return 200 and no JSON
    .then(() => {
      response.status(200).end();
    })
    // Catch any Errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});

/*******************************************************************************************
 * Action     : UPDATE                                                                     *
 * Method     : PATCH                                                                      *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r/comments/22ftr54t8mu4xx78sww9r774r *
 * Description: Update a Comment from an Article by Comment ID and Article ID              *
 *******************************************************************************************/
router.patch("/api/articles/:articleId/comments/:commentId", (request, response) => {
  const
    articleId  = request.params.articleId,
    commentId  = request.params.commentId,
    newComment = request.body.comment;

  Article.findById(articleId)
    .then(article => {
      if (article) {
        // Pass the result of Mongoose's ".patch" method to the next ".then"
        // Promise returned from updateOn() is returned to the next ".then"
        const
          currentComment = article.comments.id(commentId);

        currentComment.text = newComment.text;
         // ".markModified" might not be needed
        article.markModified("comments");
        return article.save();
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
    // If the updating succeeded, return 204 and no JSON
    .then(() => {
      response.status(204).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});

/*******************************************************************************************
 * Action     : DESTROY                                                                    *
 * Method     : DELETE                                                                     *
 * URI        : /api/articles/66ftr54t8fu4rr78sww9r334r/comments/22ftr54t8mu4xx78sww9r774r *
 * Description: Delete a Comment from an Article by Comment ID and Article ID              *
 *******************************************************************************************/
router.delete("/api/articles/:articleId/comments/:commentId", (request, response) => {
  const
    articleId = request.params.articleId,
    commentId = request.params.commentId;

  Article.findById(articleId)
    .then(article => {
      if (article) {
        // Pass the result of Mongoose's ".delete" method to the next ".then"
        // Promise returned from remove() is returned to the next ".then"
        article.comments.id(commentId).remove();
        // ".markModified" might not be needed
        article.markModified("comments");
        return article.save();
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
      //
      response.status(204).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      response.status(500).json({ error: error });
    });
});

// Export the Router so we can use it in the server.js file
module.exports = router;