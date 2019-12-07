/****************************
 * Set up and Configuration *
 ****************************/
// Require necessary NPM Packages
const
  mongoose = require("mongoose"),
  Schema   = mongoose.Schema;

// Define Comment Schema (Embedded Document/Record)
const
  commentSchema = new Schema(
    {
      text: String
    },
    {
      timestamps: true
    }
  );

// Define Article Schema (Parent Document/Record)
const
  articleSchema = new Schema(
    {
      title      : { type: String, required: true },
      content    : String,
      author     : { type: String, required: true },
      published  : { type: Boolean, default: true },
      publishedOn: { type: Date, default: Date.now },
      comments   : [commentSchema]
    },
    {
      timestamps: true
    }
  );

// Compile our Models based on the Schema
const
  Article = mongoose.model("Article", articleSchema),
  Comment = mongoose.model("Comment", commentSchema);

// Export our Model for use
module.exports = { Article, Comment };
