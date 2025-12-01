const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Listing = require("./listing");

const reviewSchema = new Schema({
  comment: String,

  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// If review is deleted → remove reference from listing
reviewSchema.post("findOneAndDelete", async (deletedReview) => {
  if (deletedReview) {
    await Listing.updateMany(
      { reviews: deletedReview._id },
      { $pull: { reviews: deletedReview._id } }
    );
  }
});

module.exports = mongoose.model("Review", reviewSchema);
