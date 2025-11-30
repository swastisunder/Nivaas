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
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Import custom modules
const ExpressError = require("./utils/ExpressError");
const User = require("./model/user.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const usersRouter = require("./routes/user.js");
const checkoutRouter = require("./routes/checkout.js");

// Configuration constants from environment variables with fallbacks for development
// In production, these should be set via environment variables
const serverPort = process.env.PORT || 8080;
const mongoDatabaseURI = process.env.MONGODB_URI;
// const mongoDatabaseURI = "mongodb://127.0.0.1:27017/nivaas";

// Determine if we're in production environment (needed early for database connection)
const isProduction = process.env.NODE_ENV === "production";

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
 *
 * @returns {Promise<mongoose.Connection>} The mongoose connection instance
 */
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDatabaseURI);
    console.log("✅ Database connected successfully");
    return mongoose.connection;
  } catch (databaseError) {
    console.error("❌ Database connection failed:", databaseError.message);
    // In production, exit the process if database connection fails
    // This allows process managers (like PM2) to restart the application
    if (isProduction) {
      console.error("Exiting application due to database connection failure");
      process.exit(1);
    }
    throw databaseError;
  }
}

// Calculate session expiration time: 7 days in milliseconds
const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
const sessionExpirationTime = Date.now() + sevenDaysInMilliseconds;

// Configure session options for user authentication
// SECURITY: Session secret must be set via SESSION_SECRET environment variable in production
// Generate a strong random secret: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
const sessionSecret = process.env.SESSION_SECRET;

// Calculate TTL in seconds (7 days)
const sessionTTL = 7 * 24 * 60 * 60; // 7 days in seconds

/**
 * Configure MongoDB Session Store
 *
 * Uses connect-mongo to store sessions in MongoDB instead of memory.
 * This allows sessions to persist across server restarts and enables
 * horizontal scaling in production environments.
 *
 * Features:
 * - Automatic TTL index creation for session expiration
 * - Lazy session updates to reduce database writes
 * - Reuses existing MongoDB connection via mongoose
 *
 * Note: The store is created with mongoUrl, but we'll ensure the database
 * connection is established before the server starts accepting requests.
 */
const mongoStore = MongoStore.create({
  mongoUrl: mongoDatabaseURI, // Use the same MongoDB URI as mongoose
  collectionName: "sessions", // Collection name for storing sessions
  ttl: sessionTTL, // Session expiration time in seconds (7 days)
  autoRemove: "native", // Use MongoDB's native TTL index for automatic cleanup
  touchAfter: 24 * 3600, // Lazy update: only update session once per 24 hours unless modified
  stringify: true, // Serialize sessions using JSON.stringify
});

// Optional: Listen to session store events for debugging and monitoring
// Uncomment these in development if you need to debug session issues
if (!isProduction) {
  mongoStore.on("create", (sessionId) => {
    console.log(`📝 Session created: ${sessionId}`);
  });
  mongoStore.on("update", (sessionId) => {
    console.log(`🔄 Session updated: ${sessionId}`);
  });
  mongoStore.on("destroy", (sessionId) => {
    console.log(`🗑️  Session destroyed: ${sessionId}`);
  });
}

const sessionConfiguration = {
  secret: sessionSecret,
  store: mongoStore, // Use MongoDB store instead of default memory store
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save uninitialized sessions
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
app.use("/", checkoutRouter);

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
 * Connects to the database first, then starts listening for incoming HTTP requests.
 * This ensures the database connection is established before the server accepts requests.
 */
async function startServer() {
  try {
    // Connect to database first
    await connectToDatabase();

    // Start the server after database connection is established
    app.listen(serverPort, () => {
      console.log(`🚀 Server is running on port ${serverPort}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
      if (!isProduction) {
        console.log("⚠️  Running in development mode");
      }
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    if (isProduction) {
      process.exit(1);
    }
  }
}

// Start the server
startServer();
