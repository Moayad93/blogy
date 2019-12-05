/****************************
 * Set up and Configuration *
 ****************************/
// Require necessary NPM Packages
const
  mongoose = require("mongoose"),
  Schema   = mongoose.Schema;

// Define Article Schema
const
  articleSchema = new Schema(
    {
      title      : { type: String, required: true },
      content    : String,
      author     : { type: String, required: true },
      published  : { type: Boolean, default: true },
      publishedOn: { type: Date, default: Date.now }
    },
    {
      timestamps: true
    }
  );

// Compile our Model based on the Schema
const
  Article = mongoose.model("Article", articleSchema);

// Export our Model for use
module.exports = Article
