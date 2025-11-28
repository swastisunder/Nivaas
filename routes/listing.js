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
const { cloudinary, storage } = require("../cloudConfig");
const upload = multer({ storage });

router
  .route("/")
  .get(warpAsync(index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    warpAsync(createListing)
  );

router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(warpAsync(showListings))
  .put(isLoggedIn, isOwner, validateListing, warpAsync(updateListing))
  .delete(isLoggedIn, isOwner, warpAsync(destoryListing));

router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(renderEditForm));

module.exports = router;
