/**
 * Async Error Wrapper Utility
 * 
 * This utility function wraps async route handlers and controller functions
 * to automatically catch any errors and pass them to Express's error handler.
 * 
 * Without this wrapper, if an async function throws an error, it would need
 * to be manually caught with try/catch. This wrapper eliminates that boilerplate.
 * 
 * Usage:
 *   Instead of: router.get("/", async (req, res, next) => { try { ... } catch(e) { next(e); } });
 *   Use: router.get("/", warpAsync(async (req, res) => { ... }));
 * 
 * @param {Function} asyncFunction - An async function that handles a route
 * @returns {Function} A new function that wraps the async function with error handling
 */
module.exports = (asyncFunction) => {
  // Return a new function that Express can use as middleware
  return (request, response, next) => {
    // Call the async function and catch any errors
    // If an error occurs, pass it to Express's error handler via next()
    asyncFunction(request, response, next).catch(next);
  };
};
