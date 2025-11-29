/**
 * Custom Error Class for Express Application
 * 
 * This file defines a custom error class that extends JavaScript's built-in Error class.
 * It's used throughout the application to create errors with specific HTTP status codes
 * and messages that can be caught by the error handler middleware.
 * 
 * Usage:
 *   throw new ExpressError(404, "Page Not Found");
 *   throw new ExpressError(400, "Invalid input data");
 */

/**
 * ExpressError Class
 * 
 * A custom error class that includes both a status code and a message.
 * This allows error handlers to easily determine what HTTP status code
 * to send back to the client.
 * 
 * @param {number} statusCode - HTTP status code (e.g., 404, 400, 500)
 * @param {string} message - Error message to display to the user
 */
class ExpressError extends Error {
  constructor(statusCode, message) {
    // Call the parent Error constructor
    super();

    // Store the HTTP status code
    this.statusCode = statusCode;

    // Store the error message
    this.message = message;
  }
}

module.exports = ExpressError;
