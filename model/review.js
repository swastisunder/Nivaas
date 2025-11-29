/**
 * Review Model
 * 
 * This file defines the database schema and model for reviews.
 * A review is a comment and rating that a user can leave on a property listing.
 * Each review is associated with a listing and has an author (the user who wrote it).
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Review Schema Definition
 * 
 * Defines the structure of a review document in the MongoDB database.
 */
const reviewSchema = new Schema({
  // The text comment written by the reviewer
  comment: String,

  // The star rating (1 to 5 stars)
  rating: {
    type: Number,
    min: 1, // Minimum rating is 1 star
    max: 5, // Maximum rating is 5 stars
  },

  // Timestamp of when the review was created
  createdAt: {
    type: Date,
    default: Date.now(), // Automatically set to current date/time when created
  },

  // Reference to the User who wrote this review
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // This ObjectId references a document in the User collection
  },
});

// Create and export the Review model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
