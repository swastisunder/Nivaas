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
const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");

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

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

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
