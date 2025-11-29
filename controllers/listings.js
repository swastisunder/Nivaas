/**
 * Listings Controller
 * 
 * This file contains all the controller functions that handle HTTP requests
 * related to property listings. Controllers are responsible for:
 * - Processing user requests
 * - Interacting with the database (fetching, creating, updating, deleting listings)
 * - Rendering views with the appropriate data
 * - Handling file uploads for listing images
 */

const Listing = require("../model/listing");
const { cloudinary } = require("../cloudConfig");

/**
 * Category Icons Mapping
 * 
 * Maps each category name to its corresponding Font Awesome icon class.
 * These icons are displayed in the category filter bar and on listing cards.
 */
const categoriesIcons = {
  trending: "fa-fire",
  "entire homes": "fa-house",
  "iconic cities": "fa-city",
  mountains: "fa-mountain",
  castles: "fa-fort-awesome",
  "amazing pools": "fa-person-swimming",
  camping: "fa-tree",
  farms: "fa-cow",
  arctic: "fa-snowflake",
  beachfront: "fa-umbrella-beach",
  desert: "fa-sun",
  islands: "fa-water",
  lakefront: "fa-water",
  tropical: "fa-leaf",
  luxury: "fa-gem",
};

/**
 * Category Names List
 * 
 * Extracts all category names from the categoriesIcons object into a simple array.
 * This array is used to populate category checkboxes in the listing form.
 */
const categoriesList = Object.keys(categoriesIcons);

/**
 * Controller: Display All Listings (with optional filtering and search)
 * 
 * This function handles GET requests to the listings index page.
 * It can filter listings by category and/or search term from query parameters.
 * 
 * Query Parameters:
 * - category: Filter listings by a specific category (e.g., "mountains")
 * - search: Search for listings by title, location, or country (e.g., "goa")
 * 
 * @param {Object} request - Express request object (contains query parameters)
 * @param {Object} response - Express response object
 * @returns {void} Renders the listings index page
 */
module.exports.index = async (request, response) => {
  // Extract filter parameters from URL query string
  const selectedCategoryFilter = request.query.category; // e.g., "mountains"
  const searchTerm = request.query.search; // e.g., "goa"

  // Start with an empty query object (will match all listings by default)
  let databaseQuery = {};

  // If a category filter is provided, add it to the query
  if (selectedCategoryFilter) {
    databaseQuery.categories = selectedCategoryFilter;
  }

  // If a search term is provided, search in title, location, and country
  if (searchTerm) {
    // Create a case-insensitive regular expression for searching
    const caseInsensitiveSearchPattern = new RegExp(searchTerm, "i");

    // Search in multiple fields using MongoDB's $or operator
    databaseQuery.$or = [
      { title: caseInsensitiveSearchPattern },
      { location: caseInsensitiveSearchPattern },
      { country: caseInsensitiveSearchPattern },
    ];
  }

  // Fetch listings from database that match the query
  const matchingListings = await Listing.find(databaseQuery);

  // Check if any listings were found
  const hasNoResults = matchingListings.length === 0;

  // Determine which category is currently selected (or null if none)
  const currentlySelectedCategory = selectedCategoryFilter || null;

  // Determine the search term to display (or empty string if none)
  const displaySearchTerm = searchTerm || "";

  // Render the listings index page with the fetched data
  response.render("listings/index.ejs", {
    listings: matchingListings,
    categories: categoriesIcons,
    selectedCategory: currentlySelectedCategory,
    noResults: hasNoResults,
    searchTerm: displaySearchTerm,
  });
};

/**
 * Controller: Display Form to Create a New Listing
 * 
 * This function handles GET requests to show the form for creating a new listing.
 * It renders the form page with the list of available categories.
 * 
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @returns {void} Renders the new listing form page
 */
module.exports.renderNewForm = (request, response) => {
  response.render("listings/new.ejs", {
    categories: categoriesList,
  });
};

/**
 * Controller: Display a Single Listing
 * 
 * This function handles GET requests to display the details of a specific listing.
 * It fetches the listing from the database and populates related data:
 * - Reviews with their authors
 * - The listing owner
 * 
 * @param {Object} request - Express request object (contains listing ID in params)
 * @param {Object} response - Express response object
 * @returns {void} Renders the listing detail page or redirects if listing not found
 */
module.exports.showListings = async (request, response) => {
  // Extract listing ID from URL parameters
  const listingId = request.params.id;

  // Fetch the listing from database and populate related data
  // populate("reviews") loads the review documents, and populate({ path: "reviews", populate: { path: "author" } })
  // also loads the author information for each review
  // populate("owner") loads the owner (user) information
  const listing = await Listing.findById(listingId)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  // Check if listing was found
  if (!listing) {
    // Listing doesn't exist, show error and redirect to listings page
    request.flash("error", "Listing does not exist!");
    return response.redirect("/listings");
  }

  // Render the listing detail page with the fetched listing data
  response.render("listings/show.ejs", { listing: listing });
};

/**
 * Controller: Create a New Listing
 * 
 * This function handles POST requests to create a new listing.
 * It processes the form data, handles image upload, and saves the listing to the database.
 * 
 * @param {Object} request - Express request object (contains form data and uploaded file)
 * @param {Object} response - Express response object
 * @returns {void} Redirects to the newly created listing page
 */
module.exports.createListing = async (request, response) => {
  // Extract image information from the uploaded file (handled by Multer + Cloudinary)
  const imageUrl = request.file.path; // Cloudinary URL where the image is stored
  const imageFileName = request.file.filename; // Cloudinary public ID for the image

  // Extract categories from form data
  // Note: If only one checkbox is checked, Express sends a string instead of an array
  let selectedCategories = request.body.categories || [];

  // Convert to array if it's a string (single checkbox selected)
  if (!Array.isArray(selectedCategories)) {
    selectedCategories = [selectedCategories];
  }

  // Create a new listing document with the form data
  const newListing = new Listing({
    title: request.body.title,
    description: request.body.description,
    price: request.body.price,
    location: request.body.location,
    country: request.body.country,
    categories: selectedCategories,
    owner: request.user._id, // Set the current user as the owner
    image: {
      url: imageUrl,
      fileName: imageFileName,
    },
  });

  // Save the listing to the database
  await newListing.save();

  // Show success message to user
  request.flash("success", "New listing created");

  // Redirect to the newly created listing's detail page
  response.redirect(`/listings/${newListing._id}`);
};

/**
 * Controller: Display Form to Edit a Listing
 * 
 * This function handles GET requests to show the form for editing an existing listing.
 * It fetches the listing data and pre-fills the form with current values.
 * 
 * @param {Object} request - Express request object (contains listing ID in params)
 * @param {Object} response - Express response object
 * @returns {void} Renders the edit listing form page or redirects if listing not found
 */
module.exports.renderEditForm = async (request, response) => {
  // Extract listing ID from URL parameters
  const listingId = request.params.id;

  // Fetch the listing from database
  const listing = await Listing.findById(listingId);

  // Check if listing was found
  if (!listing) {
    // Listing doesn't exist, show error and redirect to listings page
    request.flash("error", "Listing does not exist!");
    return response.redirect("/listings");
  }

  // Render the edit form page with the listing data and available categories
  response.render("listings/edit.ejs", {
    listing: listing,
    categories: categoriesList,
  });
};

/**
 * Controller: Update an Existing Listing
 * 
 * This function handles PUT requests to update an existing listing.
 * It processes the form data, handles optional image replacement,
 * and saves the updated listing to the database.
 * 
 * @param {Object} request - Express request object (contains form data and optional uploaded file)
 * @param {Object} response - Express response object
 * @returns {void} Redirects to the updated listing page
 */
module.exports.updateListing = async (request, response) => {
  // Extract listing ID from URL parameters
  const listingId = request.params.id;

  // Fetch the listing from database
  const listing = await Listing.findById(listingId);

  // Check if listing was found
  if (!listing) {
    // Listing doesn't exist, show error and redirect to listings page
    request.flash("error", "Listing does not exist!");
    return response.redirect("/listings");
  }

  // Check if a new image was uploaded
  const hasNewImage = request.file;

  if (hasNewImage) {
    // Delete the old image from Cloudinary if it exists
    const hasExistingImage = listing.image && listing.image.fileName;

    if (hasExistingImage) {
      try {
        await cloudinary.uploader.destroy(listing.image.fileName);
      } catch (cloudinaryError) {
        // Log error but don't stop the update process
        console.log("Error deleting old image from Cloudinary:", cloudinaryError);
      }
    }

    // Update listing with new image information
    listing.image = {
      url: request.file.path, // New Cloudinary URL
      fileName: request.file.filename, // New Cloudinary public ID
    };
  }

  // Handle categories from form data
  // Note: If only one checkbox is checked, Express sends a string instead of an array
  let selectedCategories = request.body.categories || [];

  // Convert to array if it's a string (single checkbox selected)
  if (!Array.isArray(selectedCategories)) {
    selectedCategories = [selectedCategories];
  }

  // Update all text and number fields from the form
  listing.title = request.body.title;
  listing.description = request.body.description;
  listing.price = request.body.price;
  listing.location = request.body.location;
  listing.country = request.body.country;
  listing.categories = selectedCategories;

  // Save the updated listing to the database
  await listing.save();

  // Show success message to user
  request.flash("success", "Listing Updated!");

  // Redirect to the updated listing's detail page
  response.redirect(`/listings/${listingId}`);
};

/**
 * Controller: Delete a Listing
 * 
 * This function handles DELETE requests to remove a listing from the database.
 * Note: When a listing is deleted, its associated reviews are automatically
 * deleted due to the post hook defined in the Listing model.
 * 
 * @param {Object} request - Express request object (contains listing ID in params)
 * @param {Object} response - Express response object
 * @returns {void} Redirects to the listings index page
 */
module.exports.destoryListing = async (request, response) => {
  // Extract listing ID from URL parameters
  const listingId = request.params.id;

  // Delete the listing from the database
  await Listing.findByIdAndDelete(listingId);

  // Show success message to user
  request.flash("success", "Listing Deleted!");

  // Redirect to the listings index page
  response.redirect("/listings");
};
