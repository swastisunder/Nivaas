const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing");
const User = require("../model/user"); // import User model

const mongoURI = "mongodb://127.0.0.1:27017/nivaas";

async function main() {
  await mongoose.connect(mongoURI);
  console.log("DB Connected to nivaas");
}

const initDB = async () => {
  try {
    // 1️⃣ Check if admin user already exists
    let adminUser = await User.findOne({ username: "admin" });

    if (!adminUser) {
      // Create admin user
      adminUser = await User.register(
        new User({
          username: "admin",
          email: "a@gmail.com",
        }),
        "9898"
      );
      console.log("✅ Admin user created:", adminUser._id);
    } else {
      console.log("ℹ️ Admin user already exists:", adminUser._id);
    }

    // 2️⃣ Clear previous listings
    await Listing.deleteMany({});

    // 3️⃣ Attach admin id as owner to each listing
    const dataWithOwner = initData.data.map((obj) => ({
      ...obj,
      owner: adminUser._id,
    }));

    // 4️⃣ Insert the updated listings
    await Listing.insertMany(dataWithOwner);

    console.log("✅ Listings seeded with admin as owner");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 DB Connection Closed");
  }
};

main().then(initDB);
