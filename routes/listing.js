// routes/listings.js
const express = require("express");
const router = express.Router();

const warpAsync = require("../utils/warpAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const {
  index,
  renderNewForm,
  showListings,
  createListing,
  renderEditForm,
  updateListing,
  destoryListing,
} = require("../controllers/listings");

const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage: storage });

// All listings + create new
router
  .route("/")
  .get(warpAsync(index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    warpAsync(createListing)
  );

// New listing form
router.get("/new", isLoggedIn, renderNewForm);

// Show / update / delete single listing
router
  .route("/:id")
  .get(warpAsync(showListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    warpAsync(updateListing)
  )
  .delete(isLoggedIn, isOwner, warpAsync(destoryListing));

// Edit form
router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(renderEditForm));

module.exports = router;
