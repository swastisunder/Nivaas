/**
 * Middleware Functions
 * 
 * This file contains custom middleware functions that are used throughout the application
 * to handle authentication, authorization, validation, and request processing.
 * 
 * Middleware functions run between receiving a request and sending a response,
 * allowing us to check conditions, modify data, or redirect users as needed.
 */

const Listing = require("./model/listing");
const ExpressError = require("./utils/ExpressError");
const { reviewSchema, listingSchema } = require("./schema.js");
const Review = require("./model/review.js");

/**
 * Middleware: Check if User is Logged In
 * 
 * This middleware checks if the current request is from an authenticated user.
 * If the user is not logged in:
 * - Saves the original URL they were trying to access
 * - Shows an error message
 * - Redirects them to the login page
 * 
 * If the user is logged in, it allows the request to continue to the next handler.
 * 
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Function to call to continue to next middleware
 */
module.exports.isLoggedIn = (request, response, next) => {
  // Check if user is authenticated using Passport.js
  const isUserAuthenticated = request.isAuthenticated();

  if (!isUserAuthenticated) {
    // Save the URL they were trying to access so we can redirect them back after login
    request.session.redirectUrl = request.originalUrl;

    // Show error message to user
    request.flash("error", "You must be logged in!");

    // Redirect to login page
    return response.redirect("/login");
  }

  // User is logged in, continue to next handler
  next();
};

/**
 * Middleware: Check if User is the Owner of a Listing
 * 
 * This middleware verifies that the current user owns the listing they're trying to modify.
 * It fetches the listing from the database and compares the owner ID with the current user ID.
 * 
 * If the user is not the owner:
 * - Shows an error message
 * - Redirects them back to the listing page
 * 
 * If the user is the owner, it allows the request to continue.
 * 
 * @param {Object} request - Express request object (contains listing ID in params)
 * @param {Object} response - Express response object
 * @param {Function} next - Function to call to continue to next middleware
 */
module.exports.isOwner = async (request, response, next) => {
  // Extract listing ID from URL parameters
  const listingId = request.params.id;

  // Fetch the listing from the database
  const listing = await Listing.findById(listingId);

  // Get the current user's ID from response locals (set by Passport)
  const currentUserId = response.locals.currUser._id;

  // Check if the listing's owner ID matches the current user's ID
  const isUserTheOwner = listing.owner.equals(currentUserId);

  if (!isUserTheOwner) {
    // User is not the owner, show error and redirect
    request.flash("error", "You don't have permission!");
    return response.redirect(`/listings/${listingId}`);
  }

  // User is the owner, continue to next handler
  next();
};

/**
 * Middleware: Check if User is the Author of a Review
 * 
 * This middleware verifies that the current user wrote the review they're trying to delete.
 * It fetches the review from the database and compares the author ID with the current user ID.
 * 
 * If the user is not the author:
 * - Shows an error message
 * - Redirects them back to the listing page
 * 
 * If the user is the author, it allows the request to continue.
 * 
 * @param {Object} request - Express request object (contains listing ID and review ID in params)
 * @param {Object} response - Express response object
 * @param {Function} next - Function to call to continue to next middleware
 */
module.exports.isReviewAuthor = async (request, response, next) => {
  // Extract listing ID and review ID from URL parameters
  const listingId = request.params.id;
  const reviewId = request.params.reviewId;

  // Fetch the review from the database
  const review = await Review.findById(reviewId);

  // Get the current user's ID from response locals (set by Passport)
  const currentUserId = response.locals.currUser._id;

  // Check if the review's author ID matches the current user's ID
  const isUserTheAuthor = review.author.equals(currentUserId);

  if (!isUserTheAuthor) {
    // User is not the author, show error and redirect
    request.flash("error", "You don't have permission!");
    return response.redirect(`/listings/${listingId}`);
  }

  // User is the author, continue to next handler
  next();
};

/**
 * Middleware: Save Redirect URL to Response Locals
 * 
 * This middleware checks if there's a saved redirect URL in the session
 * (set when a user tries to access a protected page while not logged in).
 * If it exists, it copies it to response.locals so the login handler can use it.
 * 
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Function to call to continue to next middleware
 */
module.exports.saveRedirectUrl = (request, response, next) => {
  // Check if there's a saved redirect URL in the session
  const savedRedirectUrl = request.session.redirectUrl;

  if (savedRedirectUrl) {
    // Copy it to response.locals so the login handler can access it
    response.locals.redirectUrl = savedRedirectUrl;
  }

  // Continue to next handler
  next();
};

/**
 * Middleware: Validate Listing Data
 * 
 * This middleware validates the data submitted when creating or updating a listing.
 * It uses Joi schema validation to check that all required fields are present
 * and that the data matches the expected format.
 * 
 * If validation fails:
 * - Collects all error messages
 * - Throws an ExpressError with status 400 (Bad Request)
 * 
 * If validation passes, it allows the request to continue.
 * 
 * @param {Object} request - Express request object (contains listing data in body)
 * @param {Object} response - Express response object
 * @param {Function} next - Function to call to continue to next middleware
 */
module.exports.validateListing = (request, response, next) => {
  // Validate the request body against the listing schema
  const validationResult = listingSchema.validate(request.body);
  const validationError = validationResult.error;

  if (validationError) {
    // Extract all error messages from the validation result
    const errorDetails = validationError.details;
    const errorMessages = errorDetails.map((detail) => detail.message);
    const combinedErrorMessage = errorMessages.join(",");

    // Throw an error that will be caught by the error handler
    throw new ExpressError(400, combinedErrorMessage);
  } else {
    // Validation passed, continue to next handler
    next();
  }
};

/**
 * Middleware: Validate Review Data
 * 
 * This middleware validates the data submitted when creating a review.
 * It uses Joi schema validation to check that the rating and comment are present
 * and that the rating is between 1 and 5.
 * 
 * If validation fails:
 * - Collects all error messages
 * - Throws an ExpressError with status 400 (Bad Request)
 * 
 * If validation passes, it allows the request to continue.
 * 
 * @param {Object} request - Express request object (contains review data in body)
 * @param {Object} response - Express response object
 * @param {Function} next - Function to call to continue to next middleware
 */
module.exports.validateReview = (request, response, next) => {
  // Validate the request body against the review schema
  const validationResult = reviewSchema.validate(request.body);
  const validationError = validationResult.error;

  if (validationError) {
    // Extract all error messages from the validation result
    const errorDetails = validationError.details;
    const errorMessages = errorDetails.map((detail) => detail.message);
    const combinedErrorMessage = errorMessages.join(",");

    // Throw an error that will be caught by the error handler
    throw new ExpressError(400, combinedErrorMessage);
  } else {
    // Validation passed, continue to next handler
    next();
  }
};
