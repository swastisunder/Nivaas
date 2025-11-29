/**
 * Listing Routes
 * 
 * This file defines all the HTTP routes related to property listings.
 * Routes handle requests for viewing, creating, editing, and deleting listings.
 * 
 * Route Structure:
 * - GET /listings - Display all listings (with optional filtering)
 * - GET /listings/new - Display form to create a new listing
 * - POST /listings - Create a new listing
 * - GET /listings/:id - Display a single listing
 * - GET /listings/:id/edit - Display form to edit a listing
 * - PUT /listings/:id - Update an existing listing
 * - DELETE /listings/:id - Delete a listing
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");

// Import utility functions
const warpAsync = require("../utils/warpAsync");

// Import middleware functions
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

// Import controller functions
const {
  index,
  renderNewForm,
  showListings,
  createListing,
  renderEditForm,
  updateListing,
  destoryListing,
} = require("../controllers/listings");

// Import Cloudinary storage configuration
const { storage } = require("../cloudConfig");

// Configure Multer to handle file uploads and store them in Cloudinary
const upload = multer({ storage: storage });

/**
 * Route: GET /listings - Display All Listings
 * Route: POST /listings - Create a New Listing
 * 
 * GET: Shows all listings with optional category and search filtering
 * POST: Creates a new listing (requires authentication, validation, and image upload)
 */
router
  .route("/")
  .get(warpAsync(index))
  .post(
    isLoggedIn, // User must be logged in
    validateListing, // Validate listing data
    upload.single("listing[image]"), // Handle image upload
    warpAsync(createListing) // Create the listing
  );

/**
 * Route: GET /listings/new - Display Form to Create New Listing
 * 
 * Shows the form where users can enter details for a new listing.
 * Requires user to be logged in.
 */
router.get("/new", isLoggedIn, renderNewForm);

/**
 * Route: GET /listings/:id - Display a Single Listing
 * Route: PUT /listings/:id - Update an Existing Listing
 * Route: DELETE /listings/:id - Delete a Listing
 * 
 * GET: Shows detailed information about a specific listing
 * PUT: Updates a listing (requires authentication, ownership, validation, optional image upload)
 * DELETE: Deletes a listing (requires authentication and ownership)
 */
router
  .route("/:id")
  .get(warpAsync(showListings))
  .put(
    isLoggedIn, // User must be logged in
    isOwner, // User must own the listing
    upload.single("listing[image]"), // Handle optional image upload
    validateListing, // Validate listing data
    warpAsync(updateListing) // Update the listing
  )
  .delete(
    isLoggedIn, // User must be logged in
    isOwner, // User must own the listing
    warpAsync(destoryListing) // Delete the listing
  );

/**
 * Route: GET /listings/:id/edit - Display Form to Edit Listing
 * 
 * Shows the edit form pre-filled with the current listing data.
 * Requires user to be logged in and own the listing.
 */
router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(renderEditForm));

module.exports = router;
