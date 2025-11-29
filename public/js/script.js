/**
 * Client-Side JavaScript for Nivaas Application
 * 
 * This file contains all the client-side JavaScript functionality that runs in the browser.
 * It handles:
 * 1. Bootstrap form validation - validates forms before submission
 * 2. Auto-hide flash messages - automatically hides success/error messages after 3 seconds
 * 3. Theme toggler - allows users to switch between light and dark themes
 * 
 * All code runs when the page loads to enhance user experience.
 */

// ===============================
// BOOTSTRAP FORM VALIDATION
// ===============================
/**
 * Form Validation Handler
 * 
 * This code sets up Bootstrap's built-in form validation for all forms
 * that have the "needs-validation" class. When a user tries to submit
 * an invalid form, it prevents submission and shows validation errors.
 * 
 * The code uses an IIFE (Immediately Invoked Function Expression) to
 * avoid polluting the global scope with variables.
 */
(function initializeFormValidation() {
  "use strict"; // Use strict mode to catch common JavaScript errors

  // Find all forms on the page that need validation
  // The selector ".needs-validation" matches any form element with this class
  const formsNeedingValidation = document.querySelectorAll(".needs-validation");

  // Convert the NodeList to an array and process each form
  Array.from(formsNeedingValidation).forEach((formElement) => {
    // Add an event listener to each form that triggers when the user tries to submit
    formElement.addEventListener(
      "submit",
      function handleFormSubmission(submitEvent) {
        // Check if the form is valid using Bootstrap's validation API
        const isFormValid = formElement.checkValidity();

        if (!isFormValid) {
          // If the form is invalid:
          // 1. Prevent the form from being submitted (stops the default browser behavior)
          submitEvent.preventDefault();

          // 2. Stop the event from bubbling up to parent elements
          submitEvent.stopPropagation();
        }

        // Add the "was-validated" class to the form
        // This class triggers Bootstrap to display validation error messages
        // It's added regardless of validity so users can see what fields need fixing
        formElement.classList.add("was-validated");
      },
      false // Use event capturing (false = use bubbling phase)
    );
  });
})();

// ===============================
// AUTO-HIDE FLASH / TOAST MESSAGE
// ===============================
/**
 * Auto-Hide Flash Messages
 * 
 * This code automatically hides flash messages (success/error notifications)
 * after 3 seconds. Flash messages appear at the top of the page to inform
 * users about actions they've taken (e.g., "Listing created successfully").
 * 
 * The hiding process happens in two steps:
 * 1. After 3 seconds, add a "hide" class to trigger a fade-out animation
 * 2. After the animation completes (500ms later), remove the element from the page
 */
setTimeout(function hideFlashMessage() {
  // Find the flash message element on the page
  const flashMessageElement = document.getElementById("flashAlert");

  // Only proceed if the flash message element exists
  if (flashMessageElement) {
    // Add the "hide" class to trigger the CSS slide-out animation
    flashMessageElement.classList.add("hide");

    // Wait for the animation to complete, then remove the element from the DOM
    setTimeout(function removeFlashMessage() {
      flashMessageElement.remove(); // Remove the element from the page
    }, 500); // Wait 500 milliseconds (0.5 seconds) for animation to complete
  }
}, 3000); // Wait 3 seconds before starting to hide the message

// ===============================
// THEME TOGGLER (WORKING VERSION)
// ===============================
/**
 * Theme Toggle Functionality
 * 
 * This code allows users to switch between light and dark themes.
 * The theme preference is saved in the browser's localStorage so it
 * persists across page reloads.
 * 
 * The code:
 * 1. Loads the saved theme when the page loads
 * 2. Sets up click handlers on theme toggle buttons
 * 3. Switches between light and dark themes when buttons are clicked
 * 4. Saves the new theme preference to localStorage
 */
document.addEventListener("DOMContentLoaded", function initializeThemeToggle() {
  // Get the root HTML element so we can set the theme attribute
  // Note: Theme is already applied in the head script to prevent flash
  // This code just sets up the toggle button functionality
  const htmlRootElement = document.documentElement;

  // Find both theme toggle buttons (desktop and mobile versions)
  const themeToggleButtons = [
    document.getElementById("themeToggle"), // Desktop theme toggle button
    document.getElementById("themeToggleMobile"), // Mobile theme toggle button
  ];

  /**
   * Toggle Between Light and Dark Theme
   * 
   * This function switches the current theme to the opposite one.
   * If the current theme is dark, it switches to light, and vice versa.
   * It also saves the new preference to localStorage.
   */
  function toggleTheme() {
    // Get the current theme from the HTML element's data-theme attribute
    const currentTheme = htmlRootElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      // Currently dark, so switch to light theme
      htmlRootElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light"); // Save preference
    } else {
      // Currently light (or no theme), so switch to dark theme
      htmlRootElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); // Save preference
    }
  }

  // Add click event listeners to both theme toggle buttons
  themeToggleButtons.forEach(function setupButtonListener(buttonElement) {
    // Only add listener if the button exists (prevents errors if button is missing)
    if (buttonElement) {
      buttonElement.addEventListener("click", toggleTheme);
    }
  });
});


const input = document.getElementById("image");
const fileName = document.querySelector(".file-name");

input.addEventListener("change", () => {
  fileName.textContent = input.files.length
    ? input.files[0].name
    : "No file chosen";
});
