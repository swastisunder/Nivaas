/**
 * Reviews Controller
 * 
 * This file contains all the controller functions that handle HTTP requests
 * related to reviews. Reviews are comments and ratings that users can leave
 * on property listings.
 */

const Listing = require("../model/listing");
const Review = require("../model/review");

/**
 * Controller: Create a New Review
 * 
 * This function handles POST requests to create a new review for a listing.
 * It creates the review, associates it with the current user as the author,
 * and adds it to the listing's reviews array.
 * 
 * @param {Object} request - Express request object (contains review data in body and listing ID in params)
 * @param {Object} response - Express response object
 * @returns {void} Redirects to the listing detail page
 */
module.exports.createReview = async (request, response) => {
  // Extract listing ID from URL parameters
  const listingId = request.params.id;

  // Fetch the listing from database
  const listing = await Listing.findById(listingId);

  // Create a new review document from the form data
  // request.body.review contains { rating: number, comment: string }
  const newReview = new Review(request.body.review);

  // Set the current user as the review author
  newReview.author = request.user._id;

  // Add the review to the listing's reviews array
  listing.reviews.push(newReview);

  // Save the review to the database
  const savedReview = await newReview.save();

  // Save the updated listing (with the new review reference)
  const savedListing = await listing.save();

  // Show success message to user
  request.flash("success", "Review Added!");

  // Redirect back to the listing detail page
  response.redirect(`/listings/${listing._id}`);
};

/**
 * Controller: Delete a Review
 * 
 * This function handles DELETE requests to remove a review from a listing.
 * It removes the review reference from the listing and deletes the review document.
 * 
 * @param {Object} request - Express request object (contains listing ID and review ID in params)
 * @param {Object} response - Express response object
 * @returns {void} Redirects to the listing detail page
 */
module.exports.destoryReview = async (request, response) => {
  // Extract listing ID and review ID from URL parameters
  const listingId = request.params.id;
  const reviewId = request.params.reviewId;

  // Remove the review reference from the listing's reviews array
  // $pull is a MongoDB operator that removes matching items from an array
  await Listing.findByIdAndUpdate(listingId, {
    $pull: { reviews: reviewId },
  });

  // Delete the review document from the database
  await Review.findByIdAndDelete(reviewId);

  // Show success message to user
  request.flash("success", "Review Deleted!");

  // Redirect back to the listing detail page
  response.redirect(`/listings/${listingId}`);
};
