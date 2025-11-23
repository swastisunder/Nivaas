const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const Listing = require("../model/listing");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// READ — Show All Listings +
router.get(
  "/",
  warpAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
  })
);

// CREATE — New Listing Form +
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// READ — Show Single Listing +
router.get(
  "/:id",
  warpAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

// CREATE — Submit New Listing
router.post(
  "/",
  validateListing,
  warpAsync(async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    req.flash("success", "New listing created");
    res.redirect(`/listings/${newListing._id}`);
  })
);

// UPDATE — Edit Listing Form +
router.get(
  "/:id/edit",
  warpAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// UPDATE — Submit Edited Listing +
router.put(
  "/:id",
  validateListing,
  warpAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body, { runValidators: true });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

// DELETE — Remove Listing
router.delete(
  "/:id",
  warpAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;
