/**
 * Checkout Controller
 * 
 * This file contains all the controller functions that handle HTTP requests
 * related to the checkout process and bookings:
 * - Displaying the checkout page
 * - Processing and saving bookings
 * - Displaying user profile with booking history
 * - Displaying and processing profile edits
 */

const Listing = require("../model/listing");
const Booking = require("../model/booking");
const User = require("../model/user");

/**
 * Controller: Display Checkout Page
 * 
 * This function handles GET requests to show the checkout page for a specific listing.
 * It fetches the listing details and renders the checkout form.
 * 
 * @param {Object} request - Express request object (contains listing ID in params)
 * @param {Object} response - Express response object
 * @returns {void} Renders the checkout page or redirects if listing not found
 */
module.exports.renderCheckout = async (request, response) => {
  // Extract listing ID from URL parameters
  const listingId = request.params.id;

  // Fetch the listing from the database
  const listing = await Listing.findById(listingId);

  // If listing doesn't exist, show error and redirect
  if (!listing) {
    request.flash("error", "Listing not found");
    return response.redirect("/listings");
  }

  // Render the checkout page with listing data
  response.render("checkout.ejs", { listing: listing });
};

/**
 * Controller: Create a New Booking
 * 
 * This function handles POST requests to create a new booking.
 * It validates the dates, calculates the total price, and saves the booking to the database.
 * 
 * @param {Object} request - Express request object (contains booking data in body)
 * @param {Object} response - Express response object
 * @returns {void} Redirects to profile page on success, or checkout page on error
 */
module.exports.createBooking = async (request, response) => {
  // Extract listing ID from URL parameters
  const listingId = request.params.id;

  // Fetch the listing from the database
  const listing = await Listing.findById(listingId);

  // If listing doesn't exist, show error and redirect
  if (!listing) {
    request.flash("error", "Listing not found");
    return response.redirect("/listings");
  }

  // Extract booking data from form
  const { name, mobile, checkIn, checkOut } = request.body;

  // Validate that check-in and check-out dates are provided
  if (!checkIn || !checkOut) {
    request.flash("error", "Please select both check-in and check-out dates");
    return response.redirect(`/checkout/${listingId}`);
  }

  // Convert date strings to Date objects
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Validate that check-out is after check-in
  if (checkOutDate <= checkInDate) {
    request.flash("error", "Check-out date must be after check-in date");
    return response.redirect(`/checkout/${listingId}`);
  }

  // Validate that dates are not in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (checkInDate < today) {
    request.flash("error", "Check-in date cannot be in the past");
    return response.redirect(`/checkout/${listingId}`);
  }

  // Calculate number of nights
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate total price
  const totalPrice = nights * listing.price;

  // Create a new booking document
  const newBooking = new Booking({
    user: request.user._id,
    listing: listingId,
    name: name,
    mobile: mobile,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    totalPrice: totalPrice,
    paymentMethod: "cash",
  });

  // Save the booking to the database
  await newBooking.save();

  // Show success message
  request.flash("success", "Booking confirmed! Payment will be collected at the counter.");

  // Redirect to profile page
  response.redirect("/profile");
};

/**
 * Controller: Display User Profile Page
 * 
 * This function handles GET requests to show the user's profile page
 * with their account information and booking history.
 * 
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @returns {void} Renders the profile page
 */
module.exports.renderProfile = async (request, response) => {
  // Fetch all bookings for the current user, populated with listing details
  const bookings = await Booking.find({ user: request.user._id })
    .populate("listing")
    .sort({ createdAt: -1 }); // Sort by most recent first

  // Render the profile page with user and bookings data
  response.render("profile.ejs", {
    user: request.user,
    bookings: bookings,
  });
};

/**
 * Controller: Display Edit Profile Form
 * 
 * This function handles GET requests to show the edit profile form
 * where users can update their username.
 * 
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @returns {void} Renders the edit profile page
 */
module.exports.renderEditProfile = async (request, response) => {
  // Render the edit profile page with current user data
  response.render("editProfile.ejs", {
    user: request.user,
  });
};

/**
 * Controller: Update User Username
 * 
 * This function handles POST requests to update the user's username.
 * It validates that the new username is unique and updates the user document.
 * 
 * @param {Object} request - Express request object (contains new username in body)
 * @param {Object} response - Express response object
 * @returns {void} Redirects to profile page on success, or edit page on error
 */
module.exports.updateUsername = async (request, response) => {
  // Extract new username from form
  const newUsername = request.body.username;
  const currentUserId = request.user._id;

  // Validate that username is provided
  if (!newUsername || newUsername.trim() === "") {
    request.flash("error", "Username cannot be empty");
    return response.redirect("/profile/edit");
  }

  // Check if username already exists (excluding current user)
  const existingUser = await User.findOne({
    username: newUsername.trim(),
    _id: { $ne: currentUserId },
  });

  if (existingUser) {
    request.flash("error", "Username already taken");
    return response.redirect("/profile/edit");
  }

  // Update the user's username
  const user = await User.findById(currentUserId);
  user.username = newUsername.trim();
  await user.save();

  // Refresh the session to reflect the updated username
  // This ensures the user stays logged in with the new username
  request.login(user, (loginError) => {
    if (loginError) {
      // If session refresh fails, still show success but log the error
      console.error("Error refreshing session after username update:", loginError);
    }

    // Show success message
    request.flash("success", "Username updated successfully!");

    // Redirect to profile page
    response.redirect("/profile");
  });
};

