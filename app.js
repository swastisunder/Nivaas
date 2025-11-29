/**
 * Main Application Entry Point
 * 
 * This file sets up and configures the Express web server for the Nivaas application.
 * It handles:
 * - Environment configuration (loading .env in development)
 * - Database connection to MongoDB
 * - Express middleware setup (static files, body parsing, sessions, authentication)
 * - Route registration for listings, reviews, and user management
 * - Error handling for 404 and other errors
 * - Server startup
 */

// Load environment variables from .env file if not in production mode
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Import custom modules
const ExpressError = require("./utils/ExpressError");
const User = require("./model/user.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const usersRouter = require("./routes/user.js");

// Configuration constants from environment variables with fallbacks for development
// In production, these should be set via environment variables
const serverPort = process.env.PORT || 8080;
const mongoDatabaseURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nivaas";

// Create Express application instance
const app = express();

// Configure view engine and template settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Configure middleware for serving static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Configure middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Configure middleware to override HTTP methods (for PUT/DELETE from forms)
app.use(methodOverride("_method"));

/**
 * Connect to MongoDB Database
 * 
 * Establishes a connection to the MongoDB database using the connection URI.
 * Logs success or error messages to the console.
 * In production, exits the process if connection fails.
 */
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDatabaseURI);
    console.log("✅ Database connected successfully");
  } catch (databaseError) {
    console.error("❌ Database connection failed:", databaseError.message);
    // In production, exit the process if database connection fails
    // This allows process managers (like PM2) to restart the application
    if (isProduction) {
      console.error("Exiting application due to database connection failure");
      process.exit(1);
    }
  }
}

// Attempt to connect to the database
connectToDatabase();

// Calculate session expiration time: 7 days in milliseconds
const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
const sessionExpirationTime = Date.now() + sevenDaysInMilliseconds;

// Configure session options for user authentication
// SECURITY: Session secret must be set via SESSION_SECRET environment variable in production
// Generate a strong random secret: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
const sessionSecret = process.env.SESSION_SECRET || "mysupersecretcode-dev-only-change-in-production";

// Determine if we're in production environment
const isProduction = process.env.NODE_ENV === "production";

const sessionConfiguration = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: sessionExpirationTime,
    maxAge: sevenDaysInMilliseconds,
    httpOnly: true, // Prevents JavaScript access to cookies (XSS protection)
    secure: isProduction, // Only send cookies over HTTPS in production
    sameSite: isProduction ? "strict" : "lax", // CSRF protection in production
  },
};

// Enable session management
app.use(session(sessionConfiguration));

// Enable flash messages for temporary notifications (success/error)
app.use(flash());

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Local Strategy with User model
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**
 * Middleware: Make Flash Messages and Current User Available to All Views
 * 
 * This middleware runs before every request and makes the following available
 * to all EJS templates:
 * - success: Array of success flash messages
 * - error: Array of error flash messages
 * - currUser: The currently logged-in user object (or undefined if not logged in)
 */
app.use((request, response, next) => {
  response.locals.success = request.flash("success");
  response.locals.error = request.flash("error");
  response.locals.currUser = request.user;
  next();
});

/**
 * Route: Home Page
 * 
 * Redirects users from the root URL ("/") to the listings page.
 */
app.get("/", (request, response) => {
  response.redirect("/listings");
});

// Register route handlers
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", usersRouter);

/**
 * Route: 404 Page Not Found Handler
 * 
 * Catches all routes that don't match any defined routes above.
 * Creates an ExpressError with status 404 and passes it to the error handler.
 */
app.all(/.*/, (request, response, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

/**
 * Error Handler Middleware
 * 
 * Handles all errors that occur during request processing.
 * Extracts status code and message from the error object, with defaults.
 * Renders an error page with the status code and message.
 */
app.use((error, request, response, next) => {
  // Extract status code from error, default to 500 if not provided
  let statusCode = error.statusCode;
  if (statusCode === undefined) {
    statusCode = 500;
  }

  // Extract message from error, default to generic message if not provided
  let errorMessage = error.message;
  if (errorMessage === undefined) {
    errorMessage = "Something went wrong";
  }

  // Render error page with status code and message
  response.status(statusCode).render("listings/error.ejs", {
    statusCode: statusCode,
    message: errorMessage,
  });
});

/**
 * Start the Server
 * 
 * Starts listening for incoming HTTP requests on the configured port.
 * Logs a message to confirm the server is running.
 */
app.listen(serverPort, () => {
  console.log(`🚀 Server is running on port ${serverPort}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
  if (!isProduction) {
    console.log("⚠️  Running in development mode");
  }
});
