/**
 * Map Initialization Script
 * 
 * This file handles the initialization of the Leaflet map on the listing show page.
 * It:
 * 1. Gets the listing's location (city and country) from data attributes
 * 2. Uses OpenStreetMap's geocoding API to find the latitude and longitude
 * 3. Creates a Leaflet map centered on that location
 * 4. Adds a marker showing where the property is located
 * 
 * This script only runs on pages that have an element with id="map" and the required data attributes.
 */

/**
 * Initialize Map for Listing Show Page
 * 
 * This function reads listing data from HTML data attributes and displays
 * a map with a marker at the listing's location.
 */
function initializeListingMap() {
  // Find the map container element
  const mapContainer = document.getElementById("map");

  // Only proceed if the map container exists (this script might be loaded on other pages too)
  if (!mapContainer) {
    return;
  }

  // Get listing data from data attributes on the map container
  const listingLocation = mapContainer.getAttribute("data-location");
  const listingCountry = mapContainer.getAttribute("data-country");
  const listingTitle = mapContainer.getAttribute("data-title");

  // Build the full address string from location and country
  const listingAddress = `${listingLocation}, ${listingCountry}`;

  // Fetch coordinates from OpenStreetMap's geocoding service
  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      listingAddress
    )}`
  )
    .then(function convertResponseToJson(response) {
      // Convert the HTTP response to a JavaScript object
      return response.json();
    })
    .then(function displayMapOnPage(geocodingData) {
      // Check if we got valid location data back
      if (geocodingData && geocodingData.length > 0) {
        // Extract latitude and longitude from the first result
        const latitude = geocodingData[0].lat;
        const longitude = geocodingData[0].lon;

        // Create a Leaflet map centered on the listing's location
        // The number 15 is the zoom level (higher = more zoomed in)
        const map = L.map("map").setView([latitude, longitude], 15);

        // Add the map tiles (the actual map imagery) from OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        // Add a marker at the listing's location
        // The marker shows a popup with the listing title when clicked
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(`<b>${listingTitle}</b>`)
          .openPopup(); // Automatically open the popup when the page loads
      } else {
        // If the location couldn't be found, log an error to the console
        console.error("Location not found:", listingAddress);
      }
    })
    .catch(function handleFetchError(error) {
      // If the fetch request fails, log the error
      console.error("Error fetching map data:", error);
    });
}

// Run the map initialization when the page loads
// This ensures the DOM is ready before we try to access elements
document.addEventListener("DOMContentLoaded", initializeListingMap);

