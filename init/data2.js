const sampleListings = [
  // 2
  {
    title: "Premium Pool Villa in Candolim",
    description:
      "A luxurious villa with private pool, lush patio, and modern interiors in upscale Candolim.",
    image: {
      fileName: "candolim_premium_villa",
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1000&q=60",
    },
    price: 12500,
    location: "Candolim, Goa",
    country: "India",
    reviews: [],
    categories: ["luxury", "amazing pools", "entire homes"],
  },

  // 3
  {
    title: "Boutique Resort in Baga Lane",
    description:
      "A trendy boutique hotel surrounded by cafés, clubs, and Baga’s energetic nightlife.",
    image: {
      fileName: "baga_resort",
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=60",
    },
    price: 3600,
    location: "Baga, Goa",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "trending"],
  },

  // 4

  // 5
  {
    title: "Business-Class Hotel in BKC",
    description:
      "Elegant business hotel with spacious rooms, conference spaces, and quick airport access.",
    image: {
      fileName: "bkc_business_hotel",
      url: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=1000&q=60",
    },
    price: 6900,
    location: "Bandra Kurla Complex, Mumbai",
    country: "India",
    reviews: [],
    categories: ["luxury", "iconic cities"],
  },

  // 10
  {
    title: "Premium Suite in Indiranagar",
    description:
      "A high-end suite with modern design, premium bedding, and easy access to pubs and cafés.",
    image: {
      fileName: "indiranagar_premium_suite",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=60",
    },
    price: 7600,
    location: "Indiranagar, Bengaluru",
    country: "India",
    reviews: [],
    categories: ["luxury", "iconic cities"],
  },

  // 12
  {
    title: "Royal Villa in Banjara Hills",
    description:
      "A palace-style villa featuring traditional motifs, lavish furnishing, and regal ambience.",
    image: {
      fileName: "banjara_royal_villa",
      url: "https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&w=1000&q=60",
    },
    price: 9800,
    location: "Banjara Hills, Hyderabad",
    country: "India",
    reviews: [],
    categories: ["luxury", "entire homes"],
  },

  // 22
  {
    title: "Hilltop View Hotel on Mall Road",
    description:
      "A scenic hilltop hotel with balcony views overlooking the Mussoorie valley.",
    image: {
      fileName: "mussoorie_hilltop_hotel",
      url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=60",
    },
    price: 3300,
    location: "Mall Road, Mussoorie",
    country: "India",
    reviews: [],
    categories: ["mountains", "trending"],
  },

  // 23
  {
    title: "Lakeside Stay beside Naini Lake",
    description:
      "A cozy stay overlooking Naini Lake, with boating access and misty morning views.",
    image: {
      fileName: "nainital_lakeside_stay",
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=60",
    },
    price: 3500,
    location: "Mall Road, Nainital",
    country: "India",
    reviews: [],
    categories: ["lakefront", "mountains"],
  },

  // 30
  {
    title: "Coffee Estate Bungalow in Coorg",
    description:
      "A colonial-style bungalow placed deep inside a lush coffee estate for total serenity.",
    image: {
      fileName: "coorg_coffee_bungalow",
      url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=60",
    },
    price: 3200,
    location: "Madikeri, Coorg",
    country: "India",
    reviews: [],
    categories: ["farms", "mountains"],
  },

  // 40
  {
    title: "Strawberry Farm Stay in Mahabaleshwar",
    description:
      "A charming farmhouse stay located among strawberry plantations and scenic viewpoints.",
    image: {
      fileName: "mahabaleshwar_strawberry_farm",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=60",
    },
    price: 3900,
    location: "Panchgani Road, Mahabaleshwar",
    country: "India",
    reviews: [],
    categories: ["farms", "mountains"],
  },

  // 42
  {
    title: "Beachfront Cottage in Neil Island",
    description:
      "A peaceful oceanfront cottage with hammocks, palm trees, and quiet turquoise shores.",
    image: {
      fileName: "neil_island_beach_cottage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=60",
    },
    price: 5200,
    location: "Bharatpur Beach, Neil Island",
    country: "India",
    reviews: [],
    categories: ["islands", "beachfront"],
  },

  // 44
  {
    title: "Budget Hotel in Connaught Place",
    description:
      "A clean budget stay with AC rooms right in the heart of CP, ideal for city travelers.",
    image: {
      fileName: "cp_budget_delhi_stay",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=60",
    },
    price: 2100,
    location: "Connaught Place, Delhi",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "trending"],
  },

  // 45
  {
    title: "Luxury Airport Hotel in Aerocity",
    description:
      "A premium hotel with upscale interiors and soundproof rooms just minutes from Delhi Airport.",
    image: {
      fileName: "aerocity_luxury_hotel",
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=60",
    },
    price: 6500,
    location: "Aerocity, Delhi",
    country: "India",
    reviews: [],
    categories: ["luxury", "iconic cities"],
  },

  // 49
  {
    title: "Luxury Wildlife Resort in Kabini",
    description:
      "A premium nature lodge with waterfront views, safari access, and serene forest surroundings.",
    image: {
      fileName: "kabini_wildlife_resort",
      url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=60",
    },
    price: 14000,
    location: "Kabini Backwaters, Karnataka",
    country: "India",
    reviews: [],
    categories: ["luxury", "farms", "amazing pools"],
  },

  // 50
];

module.exports = { data: sampleListings };
