// controllers/listings.js
const Listing = require("../model/listing");
const { cloudinary } = require("../cloudConfig");

// Category name -> Font Awesome icon class
const categoriesIcons = {
  trending: "fa-fire",
  "entire homes": "fa-house",
  "iconic cities": "fa-city",
  mountains: "fa-mountain",
  castles: "fa-fort-awesome",
  "amazing pools": "fa-person-swimming",
  camping: "fa-tree",
  farms: "fa-cow",
  arctic: "fa-snowflake",
  beachfront: "fa-umbrella-beach",
  desert: "fa-sun",
  islands: "fa-water",
  lakefront: "fa-water",
  tropical: "fa-leaf",
  luxury: "fa-gem",
};

// Convert the keys of the object into a simple array of category names
const categoriesList = Object.keys(categoriesIcons);

// Show all listings, or filter by ?category=name
module.exports.index = async (req, res) => {
  const category = req.query.category; // e.g. "trending"

  let listings;
  if (category) {
    listings = await Listing.find({ categories: category });
  } else {
    listings = await Listing.find({});
  }

  res.render("listings/index.ejs", {
    listings: listings,
    categories: categoriesIcons,
    selectedCategory: category || null,
    noResults: listings.length === 0,
  });
};

// Show form to create a new listing
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs", {
    categories: categoriesList,
  });
};

// Show one listing
module.exports.showListings = async (req, res) => {
  const id = req.params.id;

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing: listing });
};

// Create a new listing
module.exports.createListing = async (req, res) => {
  // image from multer + cloudinary
  const url = req.file.path;
  const fileName = req.file.filename;

  // categories from form
  let selectedCategories = req.body.categories || [];
  // If only one checkbox is checked, Express gives a string, not array
  if (!Array.isArray(selectedCategories)) {
    selectedCategories = [selectedCategories];
  }

  const newListing = new Listing({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
    categories: selectedCategories,
    owner: req.user._id,
    image: { url: url, fileName: fileName },
  });

  await newListing.save();
  req.flash("success", "New listing created");
  res.redirect(`/listings/${newListing._id}`);
};

// Show edit form
module.exports.renderEditForm = async (req, res) => {
  const id = req.params.id;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", {
    listing: listing,
    categories: categoriesList,
  });
};

// Update listing
module.exports.updateListing = async (req, res) => {
  const id = req.params.id;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  // If there is a new image
  if (req.file) {
    // Delete old image from cloudinary if it exists
    if (listing.image && listing.image.fileName) {
      try {
        await cloudinary.uploader.destroy(listing.image.fileName);
      } catch (err) {
        console.log("Error deleting old image from Cloudinary:", err);
      }
    }

    listing.image = {
      url: req.file.path,
      fileName: req.file.filename,
    };
  }

  // Handle categories
  let selectedCategories = req.body.categories || [];
  if (!Array.isArray(selectedCategories)) {
    selectedCategories = [selectedCategories];
  }

  // Update simple fields
  listing.title = req.body.title;
  listing.description = req.body.description;
  listing.price = req.body.price;
  listing.location = req.body.location;
  listing.country = req.body.country;
  listing.categories = selectedCategories;

  await listing.save();

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Delete listing
module.exports.destoryListing = async (req, res) => {
  const id = req.params.id;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
