const express = require("express");
const router = express.Router({ mergeParams: true });
const warpAsync = require("../utils/warpAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema.js");
const Review = require("../model/review");
const Listing = require("../model/listing");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router.post("/", validateReview, async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  let review = await newReview.save();
  let list = await listing.save();
  req.flash("success", "Review Added!");
  res.redirect(`/listings/${listing._id}`);
});

router.delete(
  "/:reviewId",
  warpAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
