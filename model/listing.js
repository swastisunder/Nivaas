/**
 * Listing Model
 * 
 * This file defines the database schema and model for property listings.
 * A listing represents a property that can be rented, including its details
 * like title, description, price, location, images, and categories.
 * 
 * The model also includes a post-hook that automatically deletes all reviews
 * associated with a listing when the listing is deleted.
 */

const mongoose = require("mongoose");
const Review = require("./review.js");

const Schema = mongoose.Schema;

/**
 * Listing Schema Definition
 * 
 * Defines the structure of a listing document in the MongoDB database.
 * Each field specifies the data type, whether it's required, and any constraints.
 */
const listingSchema = new Schema({
  // Title of the property listing
  title: {
    type: String,
    required: true,
  },

  // Detailed description of the property
  description: {
    type: String,
    required: true,
  },

  // Image information stored in Cloudinary
  image: {
    url: String, // URL where the image is hosted
    fileName: String, // Cloudinary public ID for the image
  },

  // Price per night in the local currency
  price: {
    type: Number,
    required: true,
  },

  // City or area where the property is located
  location: {
    type: String,
    required: true,
  },

  // Country where the property is located
  country: {
    type: String,
    required: true,
  },

  // Array of references to Review documents
  // These are ObjectIds that reference reviews in the Review collection
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

  // Reference to the User who owns/created this listing
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  // Array of category strings that describe the property type
  // Only values from the enum list are allowed
  categories: {
    type: [String],
    enum: [
      "trending",
      "entire homes",
      "iconic cities",
      "mountains",
      "castles",
      "amazing pools",
      "camping",
      "farms",
      "arctic",
      "beachfront",
      "desert",
      "islands",
      "lakefront",
      "tropical",
      "luxury",
    ],
    default: [], // Default to empty array if no categories provided
  },
});

/**
 * Post-Hook: Delete Associated Reviews When Listing is Deleted
 * 
 * This hook runs after a listing is deleted using findOneAndDelete.
 * It automatically deletes all reviews that were associated with the listing.
 * This prevents orphaned review documents in the database.
 * 
 * @param {Object} deletedListing - The listing document that was just deleted
 */
listingSchema.post("findOneAndDelete", async (deletedListing) => {
  // Check if a listing was actually deleted
  if (deletedListing) {
    // Delete all reviews whose IDs are in the listing's reviews array
    // $in is a MongoDB operator that matches documents where _id is in the array
    await Review.deleteMany({ _id: { $in: deletedListing.reviews } });
  }
});

// Create and export the Listing model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
