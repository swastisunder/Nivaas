const express = require("express");
const router = express.Router({ mergeParams: true });
const warpAsync = require("../utils/warpAsync");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const { createReview, destoryReview } = require("../controllers/reviews.js");

// ROUTE: Create a New Review
router.post("/", isLoggedIn, validateReview, warpAsync(createReview));

// ROUTE: Delete a Review
router.delete(
  "/:reviewId",
  isReviewAuthor,
  isLoggedIn,
  warpAsync(destoryReview)
);

module.exports = router;
