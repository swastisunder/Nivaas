/**
 * Users Controller
 * 
 * This file contains all the controller functions that handle HTTP requests
 * related to user authentication and account management:
 * - User registration (sign up)
 * - User login
 * - User logout
 * - Rendering authentication forms
 */

const User = require("../model/user");

/**
 * Controller: Display Sign Up Form
 * 
 * This function handles GET requests to show the user registration form.
 * 
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @returns {void} Renders the sign up form page
 */
module.exports.renderSignUpForm = async (request, response) => {
  response.render("users/signup.ejs");
};

/**
 * Controller: Create a New User Account (Sign Up)
 * 
 * This function handles POST requests to register a new user.
 * It creates a new user account, hashes the password, and automatically
 * logs the user in after successful registration.
 * 
 * @param {Object} request - Express request object (contains username, email, password in body)
 * @param {Object} response - Express response object
 * @param {Function} next - Function to call to pass errors to error handler
 * @returns {void} Redirects to listings page on success, or signup page on error
 */
module.exports.signUp = async (request, response, next) => {
  try {
    // Extract user registration data from form
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    // Check if email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      request.flash("error", "Email already in use");
      return response.redirect("/signup");
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      request.flash("error", "Username already taken");
      return response.redirect("/signup");
    }

    // Create a new user document (password not set yet)
    const newUser = new User({ email: email, username: username });

    // Register the user with Passport Local Mongoose
    // This method hashes the password and saves the user to the database
    const registeredUser = await User.register(newUser, password);

    // Automatically log in the newly registered user
    request.login(registeredUser, (loginError) => {
      if (loginError) {
        // If login fails, pass error to error handler
        return next(loginError);
      }

      // Show welcome message to user
      request.flash("success", `${username} Welcome To Nivaas.`);

      // Redirect to listings page
      response.redirect("/listings");
    });
  } catch (registrationError) {
    // If registration fails (e.g., username already exists), show error and redirect
    request.flash("error", registrationError.message);
    response.redirect("/signup");
  }
};

/**
 * Controller: Display Login Form
 * 
 * This function handles GET requests to show the user login form.
 * 
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @returns {void} Renders the login form page
 */
module.exports.renderLoginForm = (request, response) => {
  response.render("users/login.ejs");
};

/**
 * Controller: Log In an Existing User
 * 
 * This function handles POST requests to authenticate and log in a user.
 * Note: The actual authentication is handled by Passport middleware before
 * this function is called. This function only handles the successful login case.
 * 
 * @param {Object} request - Express request object (user is set by Passport after authentication)
 * @param {Object} response - Express response object
 * @returns {void} Redirects to the saved redirect URL or listings page
 */
module.exports.login = async (request, response) => {
  // Get the username of the logged-in user
  const username = request.user.username;

  // Show welcome back message
  request.flash("success", `Welcome Back ${username}!`);

  // Get the redirect URL from response locals (set by saveRedirectUrl middleware)
  // If no redirect URL was saved, default to the listings page
  const redirectUrl = response.locals.redirectUrl || "/listings";

  // Redirect to the appropriate page
  response.redirect(redirectUrl);
};

/**
 * Controller: Log Out the Current User
 * 
 * This function handles GET requests to log out the currently authenticated user.
 * It destroys the user's session and clears their authentication.
 * 
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Function to call to pass errors to error handler
 * @returns {void} Redirects to login page
 */
module.exports.logout = (request, response, next) => {
  // Log out the user using Passport's logout method
  request.logOut((logoutError) => {
    if (logoutError) {
      // If logout fails, pass error to error handler
      return next(logoutError);
    }

    // Show logout confirmation message
    request.flash("success", "you are logged out!");

    // Redirect to login page
    response.redirect("/login");
  });
};
