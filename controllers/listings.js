const Listing = require("../model/listing");
const { cloudinary } = require("../cloudConfig");

module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let fileName = req.file.filename;
  const newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  newListing.image = { url, fileName };
  await newListing.save();
  req.flash("success", "New listing created");
  res.redirect(`/listings/${newListing._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  
  // If a new image is uploaded
  if (req.file) {
    // Delete old image from Cloudinary if it exists
    if (listing.image && listing.image.fileName) {
      try {
        await cloudinary.uploader.destroy(listing.image.fileName);
      } catch (error) {
        console.error("Error deleting old image:", error);
      }
    }
    
    // Update with new image
    listing.image = {
      url: req.file.path,
      fileName: req.file.filename,
    };
  }
  
  // Update other fields
  listing.title = req.body.title;
  listing.description = req.body.description;
  listing.price = req.body.price;
  listing.location = req.body.location;
  listing.country = req.body.country;
  
  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destoryListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
