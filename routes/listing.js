const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync");
const Listing = require("../model/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

// READ — Show All Listings +
router.get(
  "/",
  warpAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
  })
);

// CREATE — New Listing Form +
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// READ — Show Single Listing +
router.get(
  "/:id",
  warpAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
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
  isLoggedIn,
  validateListing,
  warpAsync(async (req, res) => {
    const newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing created");
    res.redirect(`/listings/${newListing._id}`);
  })
);

// UPDATE — Edit Listing Form +
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
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
  isLoggedIn,
  isOwner,
  validateListing,
  warpAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id, req.body, { runValidators: true });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

// DELETE — Remove Listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  warpAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;
