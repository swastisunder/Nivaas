const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing");

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

const intiDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Data Added");
};

intiDB();
