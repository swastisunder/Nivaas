/**
 * Data Validation Schemas
 * 
 * This file defines validation schemas using Joi, a library for validating JavaScript objects.
 * These schemas are used to ensure that data submitted by users (for listings and reviews)
 * meets the required format and constraints before it's saved to the database.
 * 
 * Validation helps prevent:
 * - Missing required fields
 * - Invalid data types
 * - Data that doesn't meet business rules (e.g., price too low)
 */

const Joi = require("joi");

/**
 * Listing Validation Schema
 * 
 * Defines the rules for validating listing data when creating or updating a listing.
 * 
 * Required fields:
 * - title: Must be a non-empty string
 * - description: Must be a non-empty string
 * - location: Must be a non-empty string
 * - country: Must be a non-empty string
 * - price: Must be a number, at least 500
 * 
 * Optional fields:
 * - image: Can be a string, empty string, or null
 * - categories: Can be an array of strings (or omitted)
 */
module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().required().min(500),
  image: Joi.string().allow("", null),
  categories: Joi.array().items(Joi.string()),
});

/**
 * Review Validation Schema
 * 
 * Defines the rules for validating review data when creating a review.
 * 
 * The review data is nested inside a "review" object in the request body.
 * 
 * Required fields within the review object:
 * - rating: Must be a number between 1 and 5 (inclusive)
 * - comment: Must be a non-empty string
 */
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
