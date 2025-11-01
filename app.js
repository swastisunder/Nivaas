const express = require("express");
const mongoose = require("mongoose");
const port = 8080;
const app = express();
const Listing = require("./model/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const mongoURI = "mongodb://127.0.0.1:27017/nivaas";

main()
  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoURI);
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/listings", async (req, res) => {
  await Listing.find({})
    .then((listings) => {
      res.render("listings/index.ejs", { listings });
    })
    .catch((err) => {
      res.status(500).send("Error retrieving listings: " + err);
    });
});

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body);
  newListing
    .save()
    .then(() => {
      res.redirect(`/listings/${newListing._id}`);
    })
    .catch((err) => {
      res.status(500).send("Error saving listing: " + err);
    });
});

app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body, { runValidators: true });
  res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.deleteOne({ _id: id });
  res.redirect("/listings");
});

/*
app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "Sample Listing",
    description: "This is a sample listing description.",
    image:
      "https://i.pinimg.com/736x/69/5a/3a/695a3a4fb624529f4853d793cc2e3a51.jpg",
    price: 100,
    location: "Sample Location",
    country: "Sample Country",
  });

  await sampleListing
    .save()
    .then(() => {
      res.json(sampleListing);
    })
    .catch((err) => {
      res.status(500).send("Error saving listing: " + err);
    });
});
*/

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
