/**
 * User Authentication Routes
 * 
 * This file defines all the HTTP routes related to user authentication:
 * - User registration (sign up)
 * - User login
 * - User logout
 * 
 * Route Structure:
 * - GET /signup - Display sign up form
 * - POST /signup - Create a new user account
 * - GET /login - Display login form
 * - POST /login - Authenticate and log in a user
 * - GET /logout - Log out the current user
 */

const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import utility functions
const warpAsync = require("../utils/warpAsync");

// Import middleware functions
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");

// Import controller functions
const {
  renderSignUpForm,
  signUp,
  renderLoginForm,
  login,
  logout,
} = require("../controllers/users.js");

/**
 * Route: GET /signup - Display Sign Up Form
 * Route: POST /signup - Create a New User Account
 * 
 * GET: Shows the registration form
 * POST: Processes the registration form and creates a new user account
 */
router.route("/signup").get(renderSignUpForm).post(warpAsync(signUp));

/**
 * Route: GET /login - Display Login Form
 * Route: POST /login - Authenticate and Log In User
 * 
 * GET: Shows the login form
 * POST: Authenticates the user using Passport Local Strategy
 *      - saveRedirectUrl: Saves the redirect URL from session to response.locals
 *      - passport.authenticate: Validates username/password
 *      - login: Handles successful authentication
 */
router
  .route("/login")
  .get(renderLoginForm)
  .post(
    saveRedirectUrl, // Save redirect URL before authentication
    passport.authenticate("local", {
      failureRedirect: "/login", // Redirect to login on failure
      failureFlash: true, // Show error message on failure
    }),
    login // Handle successful login
  );

/**
 * Route: GET /logout - Log Out Current User
 * 
 * Logs out the currently authenticated user and destroys their session.
 * Requires user to be logged in.
 */
router.get("/logout", isLoggedIn, logout);

module.exports = router;
