const express = require("express");
const mongoose = require("mongoose");
const port = 8080;
const app = express();
const Listing = require("./model/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const warpAsync = require("./utils/warpAsync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema } = require("./schema");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const mongoURI = "mongodb://127.0.0.1:27017/nivaas";

main()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoURI);
}

// HOME Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// READ — Show All Listings
app.get(
  "/listings",
  warpAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
  })
);

// CREATE — New Listing Form
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// CREATE — Submit New Listing
app.post(
  "/listings",
  validateListing,
  warpAsync(async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
  })
);

// READ — Show Single Listing
app.get(
  "/listings/:id",
  warpAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing Not Found");
    res.render("listings/show.ejs", { listing });
  })
);

// UPDATE — Edit Listing Form
app.get(
  "/listings/:id/edit",
  warpAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing Not Found");
    res.render("listings/edit.ejs", { listing });
  })
);

// UPDATE — Submit Edited Listing
app.put(
  "/listings/:id",
  validateListing,
  warpAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/listings/${id}`);
  })
);

// DELETE — Remove Listing
app.delete(
  "/listings/:id",
  warpAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

// 404 — Page Not Found
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { statusCode, message });
});

// SERVER START
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
