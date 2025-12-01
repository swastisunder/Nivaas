const mongoose = require("mongoose");
const Review = require("./review");
const Booking = require("./booking");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    url: String,
    fileName: String,
  },

  price: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

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
    default: [],
  },
});

// When listing deleted → delete reviews + bookings
listingSchema.post("findOneAndDelete", async (deletedListing) => {
  if (deletedListing) {
    // delete reviews of this listing
    await Review.deleteMany({ _id: { $in: deletedListing.reviews } });

    // delete bookings for this listing
    await Booking.deleteMany({ listing: deletedListing._id });
  }
});

module.exports = mongoose.model("Listing", listingSchema);
