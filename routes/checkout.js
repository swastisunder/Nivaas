/**
 * Checkout Routes
 * 
 * This file defines all the HTTP routes related to the checkout process:
 * - Displaying the checkout page
 * - Processing and saving bookings
 * - Displaying user profile with booking history
 * 
 * Route Structure:
 * - GET /checkout/:id - Display checkout page for a listing
 * - POST /checkout/:id - Create a new booking
 * - GET /profile - Display user profile with booking history
 * - GET /profile/edit - Display edit profile form
 * - POST /profile/edit - Update user username
 */

const express = require("express");
const router = express.Router();

// Import utility functions
const warpAsync = require("../utils/warpAsync");

// Import middleware functions
const { isLoggedIn } = require("../middleware");

// Import controller functions
const {
  renderCheckout,
  createBooking,
  renderProfile,
  renderEditProfile,
  updateUsername,
} = require("../controllers/checkout");

/**
 * Route: GET /checkout/:id - Display Checkout Page
 * 
 * Shows the checkout form for a specific listing.
 * Requires user to be logged in.
 */
router.get("/checkout/:id", isLoggedIn, warpAsync(renderCheckout));

/**
 * Route: POST /checkout/:id - Create a New Booking
 * 
 * Processes the checkout form and creates a new booking.
 * Requires user to be logged in.
 */
router.post("/checkout/:id", isLoggedIn, warpAsync(createBooking));

/**
 * Route: GET /profile - Display User Profile
 * 
 * Shows the user's profile page with account information and booking history.
 * Requires user to be logged in.
 */
router.get("/profile", isLoggedIn, warpAsync(renderProfile));

/**
 * Route: GET /profile/edit - Display Edit Profile Form
 * 
 * Shows the form to edit user profile information (username).
 * Requires user to be logged in.
 */
router.get("/profile/edit", isLoggedIn, warpAsync(renderEditProfile));

/**
 * Route: POST /profile/edit - Update User Username
 * 
 * Processes the edit profile form and updates the user's username.
 * Requires user to be logged in.
 */
router.post("/profile/edit", isLoggedIn, warpAsync(updateUsername));

module.exports = router;

