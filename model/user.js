/**
 * User Model
 * 
 * This file defines the database schema and model for users.
 * Users can create listings, write reviews, and manage their accounts.
 * 
 * The model uses passport-local-mongoose plugin which automatically adds:
 * - username field (with uniqueness constraint)
 * - password field (with hashing)
 * - Authentication methods (register, authenticate, etc.)
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

/**
 * User Schema Definition
 * 
 * Defines the structure of a user document in the MongoDB database.
 * Note: username and password fields are added automatically by passport-local-mongoose.
 */
const userSchema = new Schema({
  // User's email address
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

/**
 * Plugin: Passport Local Mongoose
 * 
 * This plugin automatically adds the following to the schema:
 * - username field (unique, required)
 * - password field (hashed automatically)
 * - Methods: register(), authenticate(), serializeUser(), deserializeUser()
 * 
 * This simplifies user authentication without having to manually hash passwords.
 */
userSchema.plugin(passportLocalMongoose);

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
