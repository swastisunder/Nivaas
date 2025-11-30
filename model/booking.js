/**
 * Booking Model
 * 
 * This file defines the database schema and model for bookings.
 * A booking represents a reservation made by a user for a listing,
 * including check-in/check-out dates, guest information, and payment details.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Booking Schema Definition
 * 
 * Defines the structure of a booking document in the MongoDB database.
 * Each field specifies the data type, whether it's required, and any constraints.
 */
const bookingSchema = new Schema({
  // Reference to the User who made this booking
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Reference to the Listing being booked
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },

  // Full name of the guest making the booking
  name: {
    type: String,
    required: true,
  },

  // Mobile number of the guest
  mobile: {
    type: String,
    required: true,
  },

  // Check-in date
  checkIn: {
    type: Date,
    required: true,
  },

  // Check-out date
  checkOut: {
    type: Date,
    required: true,
  },

  // Total price for the booking (nights × listing.price)
  totalPrice: {
    type: Number,
    required: true,
  },

  // Payment method (default: "cash" for Cash on Counter)
  paymentMethod: {
    type: String,
    default: "cash",
    enum: ["cash"], // Currently only cash payment is supported
  },

  // Timestamp when the booking was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Booking model
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

