/**
 * Review Routes
 * 
 * This file defines all the HTTP routes related to reviews.
 * Reviews are comments and ratings that users can leave on property listings.
 * 
 * Route Structure:
 * - POST /listings/:id/reviews - Create a new review for a listing
 * - DELETE /listings/:id/reviews/:reviewId - Delete a review
 * 
 * Note: mergeParams: true allows these routes to access the :id parameter
 * from the parent route (listings/:id/reviews)
 */

const express = require("express");
const router = express.Router({ mergeParams: true });

// Import utility functions
const warpAsync = require("../utils/warpAsync");

// Import middleware functions
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

// Import controller functions
const { createReview, destoryReview } = require("../controllers/reviews.js");

/**
 * Route: POST /listings/:id/reviews - Create a New Review
 * 
 * Allows a logged-in user to create a review (rating and comment) for a listing.
 * The listing ID comes from the URL parameter.
 * 
 * Middleware:
 * - isLoggedIn: User must be logged in
 * - validateReview: Review data must be valid (rating 1-5, comment required)
 */
router.post("/", isLoggedIn, validateReview, warpAsync(createReview));

/**
 * Route: DELETE /listings/:id/reviews/:reviewId - Delete a Review
 * 
 * Allows a user to delete their own review.
 * The listing ID and review ID come from the URL parameters.
 * 
 * Middleware:
 * - isReviewAuthor: User must be the author of the review
 * - isLoggedIn: User must be logged in
 */
router.delete(
  "/:reviewId",
  isReviewAuthor,
  isLoggedIn,
  warpAsync(destoryReview)
);

module.exports = router;
