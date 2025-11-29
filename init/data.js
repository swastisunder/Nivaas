const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    reviews: [],
    categories: ["beachfront", "tropical", "trending"],
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    reviews: [],
    categories: ["iconic cities", "luxury", "trending"],
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    reviews: [],
    categories: ["mountains", "camping", "lakefront"],
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    reviews: [],
    categories: ["entire homes", "castles", "luxury"],
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true paradise.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    reviews: [],
    categories: ["farms", "camping", "trending"],
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach in this relaxing paradise.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    reviews: [],
    categories: ["beachfront", "amazing pools", "tropical"],
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Perfect cabin for outdoor lovers with fishing and kayaking options.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    reviews: [],
    categories: ["lakefront", "mountains", "entire homes"],
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this penthouse.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    reviews: [],
    categories: ["luxury", "iconic cities"],
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this Swiss Alps chalet.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    reviews: [],
    categories: ["arctic", "mountains", "luxury"],
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild with luxury safari accommodation.",
    image: {
      fileName: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    reviews: [],
    categories: ["desert", "farms", "islands"],
  },
];

module.exports = { data: sampleListings };
