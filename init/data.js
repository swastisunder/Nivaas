const sampleListings = [
  // 1
  {
    title: "Beachside Cottage near Calangute Beach",
    description:
      "A cozy beachside cottage just a short walk from Calangute Beach. Perfect for couples and small families seeking a relaxed Goan vibe.",
    image: {
      fileName: "calangute_cottage",
      url: "https://images.unsplash.com/photo-1568605115459-4b731184f961?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 2800,
    location: "Calangute, Goa",
    country: "India",
    reviews: [],
    categories: ["beachfront", "trending", "entire homes"],
  },

  // 2
  {
    title: "Luxury Pool Villa in Candolim",
    description:
      "A premium private villa with a turquoise pool, lush garden, and elegant interiors. Ideal for large groups exploring North Goa.",
    image: {
      fileName: "candolim_pool_villa",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 11000,
    location: "Candolim, Goa",
    country: "India",
    reviews: [],
    categories: ["luxury", "amazing pools", "beachfront"],
  },

  // 3
  {
    title: "Boutique Hotel in Baga Lane",
    description:
      "Modern boutique rooms with balcony views, located just off the bustling Baga nightlife stretch.",
    image: {
      fileName: "baga_boutique",
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 3300,
    location: "Baga, Goa",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "beachfront", "trending"],
  },

  // 4
  {
    title: "Portuguese Heritage Stay in Fontainhas",
    description:
      "A charming restored Portuguese home with colorful walls, wooden windows, and a courtyard in Goa’s Latin Quarter.",
    image: {
      fileName: "fontainhas_heritage",
      url: "https://images.unsplash.com/photo-1731663044393-96efeef65cd9?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 3600,
    location: "Fontainhas, Goa",
    country: "India",
    reviews: [],
    categories: ["entire homes", "luxury", "iconic cities"],
  },

  // 5
  {
    title: "Business Hotel in Bandra Kurla Complex",
    description:
      "Premium business hotel with meeting rooms, breakfast buffet, and quick airport access.",
    image: {
      fileName: "bkc_business",
      url: "https://images.unsplash.com/photo-1739063273563-bc24c0ee609d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 6200,
    location: "Bandra Kurla Complex, Mumbai",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "luxury", "trending"],
  },

  // 6
  {
    title: "Sea-Facing Apartment in Juhu",
    description:
      "A modern sea-facing apartment with balcony seating, perfect for sunsets over Juhu Beach.",
    image: {
      fileName: "juhu_sea_view",
      url: "https://images.unsplash.com/photo-1649769425782-8cdb757da2b4?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 8500,
    location: "Juhu, Mumbai",
    country: "India",
    reviews: [],
    categories: ["beachfront", "luxury", "entire homes"],
  },

  // 7
  {
    title: "Artistic Hostel in Colaba",
    description:
      "A backpacker-friendly hostel in the heart of Colaba with vibrant common areas and private rooms.",
    image: {
      fileName: "colaba_hostel",
      url: "https://images.unsplash.com/photo-1657282920595-adc2c0736e27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 900,
    location: "Colaba, Mumbai",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "trending"],
  },

  // 8
  {
    title: "Smart Studio Apartment in Koramangala",
    description:
      "A stylish studio in Bangalore’s prime cafe and nightlife hub, ideal for solo travelers and couples.",
    image: {
      fileName: "koramangala_studio",
      url: "https://images.unsplash.com/photo-1723641878279-a79dd56fa460?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 2600,
    location: "Koramangala, Bengaluru",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "entire homes"],
  },

  // 9
  {
    title: "Service Apartment in Whitefield IT Park",
    description:
      "Clean and compact serviced apartment near major IT offices, perfect for long stays.",
    image: {
      fileName: "whitefield_service",
      url: "https://images.unsplash.com/photo-1759264244827-1dde5bee00a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 3100,
    location: "Whitefield, Bengaluru",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "entire homes"],
  },

  // 10
  {
    title: "Premium Suite in Indiranagar",
    description:
      "A high-end suite with chic interiors and quick access to Indiranagar’s trendy cafes and pubs.",
    image: {
      fileName: "indiranagar_suite",
      url: "https://images.unsplash.com/photo-1664227430717-9a62112984cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 7200,
    location: "Indiranagar, Bengaluru",
    country: "India",
    reviews: [],
    categories: ["luxury", "iconic cities"],
  },

  // 11
  {
    title: "IT Park Hotel in HITEC City",
    description:
      "Contemporary hotel close to tech campuses and malls, ideal for business travel.",
    image: {
      fileName: "hitec_hotel",
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 4800,
    location: "HITEC City, Hyderabad",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "luxury"],
  },

  // 12
  {
    title: "Palace-Inspired Villa in Banjara Hills",
    description:
      "A luxurious villa with ornate interiors in upscale Banjara Hills.",
    image: {
      fileName: "banjara_villa",
      url: "https://images.unsplash.com/photo-1763228354340-8b7405f6abf8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 9500,
    location: "Banjara Hills, Hyderabad",
    country: "India",
    reviews: [],
    categories: ["luxury", "entire homes"],
  },

  // 13
  {
    title: "Budget Room in T. Nagar",
    description:
      "AC rooms ideal for shoppers exploring Chennai’s gold and saree markets.",
    image: {
      fileName: "tnagar_budget",
      url: "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 1500,
    location: "T. Nagar, Chennai",
    country: "India",
    reviews: [],
    categories: ["iconic cities"],
  },

  // 14
  {
    title: "Cliffside Sea View Stay in ECR",
    description:
      "A private beach house on East Coast Road with direct shoreline access.",
    image: {
      fileName: "ecr_beachhouse",
      url: "https://images.unsplash.com/photo-1515516969-d465f0de1f60?auto=format&fit=crop&w=800&q=60",
    },
    price: 7200,
    location: "East Coast Road, Chennai",
    country: "India",
    reviews: [],
    categories: ["beachfront", "entire homes"],
  },

  // 15
  {
    title: "Art Boutique Stay on Park Street",
    description:
      "A stylish boutique hotel surrounded by iconic restaurants and nightlife.",
    image: {
      fileName: "parkstreet_boutique",
      url: "https://images.unsplash.com/photo-1543489816-c87b0f5f7dd2?auto=format&fit=crop&w=800&q=60",
    },
    price: 4100,
    location: "Park Street, Kolkata",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "luxury"],
  },

  // 16
  {
    title: "Serviced Apartment in Salt Lake Sector V",
    description:
      "Quiet serviced stay close to Kolkata’s IT hub. Ideal for business travellers.",
    image: {
      fileName: "saltlake_service",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 2900,
    location: "Salt Lake, Kolkata",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "entire homes"],
  },

  // 17
  {
    title: "Heritage Haveli near Hawa Mahal",
    description:
      "A Rajasthani haveli with courtyard, frescoes and rooftop dining.",
    image: {
      fileName: "jaipur_haveli",
      url: "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=800&q=60",
    },
    price: 3900,
    location: "Johari Bazar, Jaipur",
    country: "India",
    reviews: [],
    categories: ["castles", "entire homes"],
  },

  // 18
  {
    title: "Royal Palace Stay in C-Scheme",
    description:
      "A beautifully restored palace residence with royal decor and spacious rooms.",
    image: {
      fileName: "cscheme_palace",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 12000,
    location: "C-Scheme, Jaipur",
    country: "India",
    reviews: [],
    categories: ["castles", "luxury"],
  },

  // 19
  {
    title: "Lake View Haveli at Lake Pichola",
    description:
      "Rooms overlooking Lake Pichola with sunset views and rooftop dining.",
    image: {
      fileName: "pichola_haveli",
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=60",
    },
    price: 5200,
    location: "Lake Pichola, Udaipur",
    country: "India",
    reviews: [],
    categories: ["lakefront", "luxury"],
  },

  // 20
  {
    title: "Resort near Fateh Sagar Lake",
    description:
      "A family-friendly resort with gardens, pool, and lake access.",
    image: {
      fileName: "fatehsagar_resort",
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=60",
    },
    price: 6800,
    location: "Fateh Sagar, Udaipur",
    country: "India",
    reviews: [],
    categories: ["lakefront", "amazing pools"],
  },

  // 21
  {
    title: "Riverside Cottage in Tapovan",
    description:
      "A wooden riverside cottage with mountain views and peaceful surroundings.",
    image: {
      fileName: "tapovan_riverside",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Tapovan, Rishikesh",
    country: "India",
    reviews: [],
    categories: ["camping", "mountains", "entire homes"],
  },

  // 22
  {
    title: "Hill View Hotel on Mall Road",
    description:
      "Rooms overlooking the Doon valley with balcony seating and cool breeze.",
    image: {
      fileName: "mussoorie_hillhotel",
      url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Mall Road, Mussoorie",
    country: "India",
    reviews: [],
    categories: ["mountains", "trending"],
  },

  // 23
  {
    title: "Lakeside Stay at Naini Lake",
    description: "A cozy hotel beside Naini Lake with boat ride access.",
    image: {
      fileName: "nainital_lake",
      url: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Mall Road, Nainital",
    country: "India",
    reviews: [],
    categories: ["lakefront", "mountains"],
  },

  // 24
  {
    title: "Tea Garden Homestay in Darjeeling",
    description:
      "A peaceful homestay overlooking tea gardens with misty mornings.",
    image: {
      fileName: "darjeeling_teagarden",
      url: "https://images.unsplash.com/photo-1523906630133-f6934a1ab1b4?auto=format&fit=crop&w=800&q=60",
    },
    price: 2700,
    location: "Happy Valley, Darjeeling",
    country: "India",
    reviews: [],
    categories: ["farms", "mountains"],
  },

  // 25
  {
    title: "Mountain Lodge in Old Manali",
    description:
      "A wooden lodge offering snow-capped mountain views and apple orchards.",
    image: {
      fileName: "oldmanali_lodge",
      url: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Old Manali, Manali",
    country: "India",
    reviews: [],
    categories: ["mountains", "camping"],
  },

  // 26
  {
    title: "Ski Retreat in Gulmarg",
    description:
      "Premium rooms offering snow views and proximity to ski slopes.",
    image: {
      fileName: "gulmarg_ski",
      url: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=60",
    },
    price: 9200,
    location: "Gulmarg, Jammu & Kashmir",
    country: "India",
    reviews: [],
    categories: ["arctic", "mountains", "luxury"],
  },

  // 27
  {
    title: "Houseboat Stay in Dal Lake",
    description:
      "Traditional houseboat with carved wooden interiors and serene lake views.",
    image: {
      fileName: "kashmir_houseboat",
      url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=60",
    },
    price: 5400,
    location: "Dal Lake, Srinagar",
    country: "India",
    reviews: [],
    categories: ["lakefront", "luxury"],
  },

  // 28
  {
    title: "Desert Camp at Sam Sand Dunes",
    description:
      "Swiss tents with cultural Rajasthani programs and camel rides.",
    image: {
      fileName: "sam_camp",
      url: "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=800&q=60",
    },
    price: 3900,
    location: "Sam Sand Dunes, Jaisalmer",
    country: "India",
    reviews: [],
    categories: ["desert", "camping"],
  },

  // 29
  {
    title: "Fort View Hotel in Jaisalmer",
    description: "Rooms with direct views of the golden Jaisalmer Fort.",
    image: {
      fileName: "jaisalmer_fort",
      url: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=800&q=60",
    },
    price: 2700,
    location: "Dhibba Para, Jaisalmer",
    country: "India",
    reviews: [],
    categories: ["desert", "castles"],
  },

  // 30
  {
    title: "Coffee Estate Homestay in Coorg",
    description: "A serene homestay located inside a lush coffee estate.",
    image: {
      fileName: "coorg_estate",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    },
    price: 3100,
    location: "Madikeri, Coorg",
    country: "India",
    reviews: [],
    categories: ["farms", "mountains"],
  },

  // 31
  {
    title: "Tea Estate Bungalow in Munnar",
    description: "Colonial bungalow surrounded by rolling tea gardens.",
    image: {
      fileName: "munnar_tea",
      url: "https://images.unsplash.com/photo-1523906630133-f6934a1ab1b4?auto=format&fit=crop&w=800&q=60",
    },
    price: 4900,
    location: "Munnar Town, Munnar",
    country: "India",
    reviews: [],
    categories: ["mountains", "farms"],
  },

  // 32
  {
    title: "Backwater Resort in Alleppey",
    description:
      "A luxurious backwater resort with boat rides and sunset decks.",
    image: {
      fileName: "alleppey_backwaters",
      url: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=60",
    },
    price: 6300,
    location: "Punnamada, Alappuzha",
    country: "India",
    reviews: [],
    categories: ["lakefront", "tropical", "amazing pools"],
  },

  // 33
  {
    title: "Cliffside Boho Stay in Varkala",
    description: "Boho rooms overlooking the Arabian Sea from the North Cliff.",
    image: {
      fileName: "varkala_cliff",
      url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=60",
    },
    price: 2900,
    location: "North Cliff, Varkala",
    country: "India",
    reviews: [],
    categories: ["beachfront", "tropical"],
  },

  // 34
  {
    title: "French Colonial Villa in White Town",
    description:
      "A restored French villa with arches, courtyards and pastel interiors.",
    image: {
      fileName: "pondy_white_town",
      url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=60",
    },
    price: 5200,
    location: "White Town, Puducherry",
    country: "India",
    reviews: [],
    categories: ["entire homes", "iconic cities"],
  },

  // 35
  {
    title: "Forest Resort in Jim Corbett",
    description: "A wildlife resort with cottages surrounded by dense forest.",
    image: {
      fileName: "corbett_resort",
      url: "https://images.unsplash.com/photo-1518831959410-48a934f51e86?auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Dhikuli, Ramnagar",
    country: "India",
    reviews: [],
    categories: ["farms", "camping"],
  },

  // 36
  {
    title: "High-Altitude Campsite in Spiti Valley",
    description:
      "A scenic campsite with tents offering panoramic Himalayan views.",
    image: {
      fileName: "spiti_camp",
      url: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=60",
    },
    price: 2300,
    location: "Kaza, Spiti Valley",
    country: "India",
    reviews: [],
    categories: ["arctic", "camping"],
  },

  // 37
  {
    title: "Luxury Tent in Ranthambore",
    description:
      "Jungle luxury tents with all modern amenities near Ranthambore National Park.",
    image: {
      fileName: "ranthambore_luxury",
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=60",
    },
    price: 7800,
    location: "Ranthambore Road, Sawai Madhopur",
    country: "India",
    reviews: [],
    categories: ["luxury", "camping"],
  },

  // 38
  {
    title: "Hill Resort in Ooty",
    description:
      "A scenic hill resort surrounded by tea estates and cool breezes.",
    image: {
      fileName: "ooty_hillresort",
      url: "https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?auto=format&fit=crop&w=800&q=60",
    },
    price: 3400,
    location: "Charing Cross, Ooty",
    country: "India",
    reviews: [],
    categories: ["mountains"],
  },

  // 39
  {
    title: "Monsoon Retreat in Lonavala",
    description:
      "Private retreat surrounded by greenery, perfect for monsoon getaways.",
    image: {
      fileName: "lonavala_retreat",
      url: "https://images.unsplash.com/photo-1590496793130-42a996133562?auto=format&fit=crop&w=800&q=60",
    },
    price: 5600,
    location: "Tiger Point Road, Lonavala",
    country: "India",
    reviews: [],
    categories: ["mountains", "entire homes"],
  },

  // 40
  {
    title: "Strawberry Farm Stay in Mahabaleshwar",
    description: "A homestay surrounded by strawberry farms and valley views.",
    image: {
      fileName: "mahabaleshwar_farm",
      url: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=800&q=60",
    },
    price: 3800,
    location: "Panchgani Road, Mahabaleshwar",
    country: "India",
    reviews: [],
    categories: ["farms", "mountains"],
  },

  // 41
  {
    title: "Island Resort in Havelock",
    description: "A tropical resort near pristine beaches with coral reefs.",
    image: {
      fileName: "havelock_resort",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 9200,
    location: "Govind Nagar, Havelock Island",
    country: "India",
    reviews: [],
    categories: ["islands", "tropical", "beachfront"],
  },

  // 42
  {
    title: "Beachfront Cottage in Neil Island",
    description:
      "Cozy beachfront cottage with hammocks and quiet ocean breeze.",
    image: {
      fileName: "neil_beach_cottage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
    },
    price: 5200,
    location: "Bharatpur Beach, Neil Island",
    country: "India",
    reviews: [],
    categories: ["islands", "beachfront"],
  },

  // 43
  {
    title: "Ghat View Homestay in Varanasi",
    description:
      "Peaceful homestay with Ganga ghat views and walkable distance to evening aarti.",
    image: {
      fileName: "varanasi_ghat_homestay",
      url: "https://images.unsplash.com/photo-1582571352032-448f7928eca5?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Assi Ghat, Varanasi",
    country: "India",
    reviews: [],
    categories: ["iconic cities"],
  },

  // 44
  {
    title: "Budget Hotel in Connaught Place",
    description:
      "Clean AC rooms in the heart of CP with metro access and shopping hubs nearby.",
    image: {
      fileName: "cp_budget_hotel",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Connaught Place, Delhi",
    country: "India",
    reviews: [],
    categories: ["iconic cities", "trending"],
  },

  // 45
  {
    title: "Airport Hotel in Aerocity",
    description: "Modern hotel with soundproof rooms near Delhi Airport.",
    image: {
      fileName: "aerocity_airport",
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
    },
    price: 6500,
    location: "Aerocity, Delhi",
    country: "India",
    reviews: [],
    categories: ["luxury", "iconic cities"],
  },

  // 46
  {
    title: "IT Corridor Stay in Gachibowli",
    description: "A serviced apartment located in Hyderabad’s IT corridor.",
    image: {
      fileName: "gachibowli_service",
      url: "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=800&q=60",
    },
    price: 3300,
    location: "Gachibowli, Hyderabad",
    country: "India",
    reviews: [],
    categories: ["entire homes", "iconic cities"],
  },

  // 47
  {
    title: "Studio Apartment in Hinjewadi",
    description: "A smart studio apartment near Pune’s IT Park.",
    image: {
      fileName: "hinjewadi_studio",
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Hinjewadi, Pune",
    country: "India",
    reviews: [],
    categories: ["entire homes", "iconic cities"],
  },

  // 48
  {
    title: "Heritage Haveli in Old City",
    description: "A traditional haveli surrounded by Udaipur’s historic lanes.",
    image: {
      fileName: "udaipur_oldcity_haveli",
      url: "https://images.unsplash.com/photo-1562184760-262fdd53b05e?auto=format&fit=crop&w=800&q=60",
    },
    price: 3600,
    location: "Old City, Udaipur",
    country: "India",
    reviews: [],
    categories: ["castles", "entire homes"],
  },

  // 49
  {
    title: "Luxury Wildlife Resort in Kabini",
    description:
      "A premium wildlife resort near Kabini backwaters with safari tours.",
    image: {
      fileName: "kabini_luxury",
      url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=60",
    },
    price: 14000,
    location: "Kabini Backwaters, Karnataka",
    country: "India",
    reviews: [],
    categories: ["luxury", "farms", "amazing pools"],
  },

  // 50
  {
    title: "Eco Jungle Lodge in Kanha",
    description:
      "An eco-friendly lodge surrounded by pristine forest near Kanha National Park.",
    image: {
      fileName: "kanha_jungle",
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=60",
    },
    price: 5300,
    location: "Mukki Gate, Kanha",
    country: "India",
    reviews: [],
    categories: ["farms", "camping", "mountains"],
  },
];

module.exports = { data: sampleListings };
