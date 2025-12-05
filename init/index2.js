/**
 * Database Initialization Script
 *
 * Run:  node init/index.js
 *
 * What it does:
 * 1. Connects to MongoDB (Atlas/local)
 * 2. Deletes existing seed data (bookings, reviews, listings, seed users)
 * 3. Creates 3 users:
 *    - ssb1 / s1@gmail.com / 9898
 *    - ssb2 / s2@gmail.com / 9898
 *    - ssb3 / s3@gmail.com / 9898
 * 4. Inserts 50 listings from data.js and assigns owners (round robin)
 * 5. For each listing, creates 2 reviews by the other 2 users
 * 6. Creates 5–10 bookings per user for random listings
 */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data2");

const Listing = require("../model/listing");
const User = require("../model/user");
const Review = require("../model/review");
const Booking = require("../model/booking");

// Use Atlas URI if provided, else fallback to local
const mongoDatabaseURI = process.env.MONGODB_URI;
// const mongoDatabaseURI = "mongodb://127.0.0.1:27017/nivaas";

async function connectToDatabase() {
  await mongoose.connect(mongoDatabaseURI);
  console.log("✅ Connected to DB:", mongoDatabaseURI);
}

// helper: random int inclusive
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// helper: generate random booking dates
function generateRandomBookingDates() {
  const today = new Date();
  const offset = getRandomInt(-30, 60); // some past, some future
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + offset);

  const nights = getRandomInt(1, 5);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + nights);

  return { checkIn, checkOut, nights };
}

async function initializeDatabase() {
  try {
    console.log("🧹 Clearing old data...");

    // Order matters a bit due to hooks, so clear children first
    await Booking.deleteMany({});
    await Review.deleteMany({});
    await Listing.deleteMany({});
    await User.deleteMany({ username: { $in: ["ssb1", "ssb2", "ssb3"] } });

    console.log("✅ Cleared Listings, Reviews, Bookings, seed Users");

    // 1. Create users
    console.log("👤 Creating users...");

    const usersData = [
      { username: "ssb1", email: "s1@gmail.com", password: "9898" },
      { username: "ssb2", email: "s2@gmail.com", password: "9898" },
      { username: "ssb3", email: "s3@gmail.com", password: "9898" },
    ];

    const users = [];
    for (const userInfo of usersData) {
      const user = await User.register(
        new User({
          username: userInfo.username,
          email: userInfo.email,
        }),
        userInfo.password
      );
      console.log("   → Created user:", user.username, user._id.toString());
      users.push(user);
    }

    // 2. Insert listings, assign owners round-robin
    console.log("🏨 Inserting listings...");

    const listingsWithOwner = initData.data.map((listingData, index) => {
      const owner = users[index % users.length]; // rotate between 3 users
      return {
        ...listingData,
        owner: owner._id,
      };
    });

    const createdListings = await Listing.insertMany(listingsWithOwner);
    console.log("✅ Inserted listings:", createdListings.length);

    // 3. For each listing, create 2 reviews by the other 2 users
    console.log("⭐ Creating reviews for each listing...");

    const reviewComments = [
      "Clean rooms and helpful staff.",
      "Great location and good value for money.",
      "Loved the ambience and food.",
      "Comfortable stay and smooth check-in.",
      "Would definitely stay here again.",
    ];

    for (const listing of createdListings) {
      const ownerId = listing.owner;
      const otherUsers = users.filter(
        (u) => u._id.toString() !== ownerId.toString()
      );

      for (const reviewer of otherUsers) {
        const rating = getRandomInt(3, 5);
        const comment =
          reviewComments[getRandomInt(0, reviewComments.length - 1)];

        const review = new Review({
          comment,
          rating,
          author: reviewer._id,
        });

        await review.save();
        listing.reviews.push(review._id);
      }

      await listing.save();
    }

    console.log("✅ Reviews created and attached to listings");

    // 4. Create 5–10 bookings per user
    console.log("📅 Creating bookings for each user...");

    for (const user of users) {
      const bookingsCount = getRandomInt(5, 10);
      console.log(
        `   → Creating ${bookingsCount} bookings for user ${user.username}`
      );

      for (let i = 0; i < bookingsCount; i++) {
        const randomListing =
          createdListings[getRandomInt(0, createdListings.length - 1)];

        const { checkIn, checkOut, nights } = generateRandomBookingDates();

        const booking = new Booking({
          user: user._id,
          listing: randomListing._id,
          name: `Guest - ${user.username}`,
          mobile: "9876543210",
          checkIn,
          checkOut,
          totalPrice: randomListing.price * nights,
          paymentMethod: "cash",
        });

        await booking.save();
      }
    }

    console.log("✅ Bookings created for all users");
    console.log("🎉 Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Error during initialization:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 DB Connection Closed");
  }
}

connectToDatabase().then(initializeDatabase);
