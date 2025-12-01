const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const Listing = require("./listing");
const Review = require("./review");
const Booking = require("./booking");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose);

// CASCADE DELETE: If user is deleted
userSchema.post("findOneAndDelete", async (deletedUser) => {
  if (deletedUser) {
    const userId = deletedUser._id;

    // delete all listings owned by user (and their reviews/bookings via listing hook)
    const userListings = await Listing.find({ owner: userId });
    for (let listing of userListings) {
      await Listing.findByIdAndDelete(listing._id);
    }

    // delete all reviews written by user
    await Review.deleteMany({ author: userId });

    // delete all bookings made by user
    await Booking.deleteMany({ user: userId });
  }
});

module.exports = mongoose.model("User", userSchema);
