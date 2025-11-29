/**
 * Database Initialization Script
 * 
 * This file is a utility script used to initialize the database with sample data.
 * It performs the following tasks:
 * 1. Connects to the MongoDB database
 * 2. Creates an admin user account (if it doesn't already exist)
 * 3. Clears all existing listings from the database
 * 4. Seeds the database with sample listing data from data.js
 * 5. Associates all sample listings with the admin user as the owner
 * 
 * This script is typically run once when setting up the application for the first time,
 * or when you want to reset the database with fresh sample data.
 */

// Import required modules
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing");
const User = require("../model/user");

// MongoDB connection URI - points to the local MongoDB instance
const mongoDatabaseURI = "mongodb://127.0.0.1:27017/nivaas";

/**
 * Connect to MongoDB Database
 * 
 * Establishes a connection to the MongoDB database using the connection URI.
 * This function is called first before any database operations.
 * 
 * @returns {Promise<void>} Promise that resolves when connection is established
 */
async function connectToDatabase() {
  await mongoose.connect(mongoDatabaseURI);
  console.log("DB Connected to nivaas");
}

/**
 * Initialize Database with Sample Data
 * 
 * This function performs the main initialization tasks:
 * 1. Checks if an admin user exists, creates one if it doesn't
 * 2. Deletes all existing listings
 * 3. Creates new listings from sample data and assigns admin as owner
 * 4. Closes the database connection when done
 * 
 * @returns {Promise<void>} Promise that resolves when initialization is complete
 */
const initializeDatabase = async () => {
  try {
    // Step 1: Check if admin user already exists in the database
    let adminUser = await User.findOne({ username: "admin" });

    if (!adminUser) {
      // Admin user doesn't exist, so create a new one
      // User.register() is a method from passport-local-mongoose that:
      // - Creates a new user document
      // - Hashes the password automatically
      // - Saves the user to the database
      adminUser = await User.register(
        new User({
          username: "admin",
          email: "a@gmail.com",
        }),
        "9898" // Password for the admin user
      );
      console.log("✅ Admin user created:", adminUser._id);
    } else {
      // Admin user already exists, use the existing one
      console.log("ℹ️ Admin user already exists:", adminUser._id);
    }

    // Step 2: Clear all previous listings from the database
    // This ensures we start with a clean slate
    await Listing.deleteMany({});

    // Step 3: Attach admin user ID as owner to each sample listing
    // We iterate through each listing in the sample data and add the admin's ID as the owner
    const listingsWithOwner = initData.data.map((listingData) => {
      // Create a new object that includes all properties from the original listing
      // plus the admin user's ID as the owner
      return {
        ...listingData, // Spread operator copies all existing properties
        owner: adminUser._id, // Add the admin user's ID as the owner
      };
    });

    // Step 4: Insert all the listings with owner information into the database
    await Listing.insertMany(listingsWithOwner);

    console.log("✅ Listings seeded with admin as owner");
  } catch (databaseError) {
    // If any error occurs during initialization, log it to the console
    console.error("❌ Error:", databaseError);
  } finally {
    // Always close the database connection, even if an error occurred
    await mongoose.connection.close();
    console.log("🔌 DB Connection Closed");
  }
};

// Execute the initialization process:
// 1. First connect to the database
// 2. Then run the initialization function
connectToDatabase().then(initializeDatabase);
