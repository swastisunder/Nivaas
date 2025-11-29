// ===============================
// BOOTSTRAP FORM VALIDATION
// ===============================
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// ===============================
// AUTO-HIDE FLASH / TOAST MESSAGE
// ===============================
setTimeout(() => {
  const alert = document.getElementById("flashAlert");
  if (alert) {
    alert.classList.add("hide"); // add slide-out animation class

    setTimeout(() => {
      alert.remove(); // remove it after animation
    }, 500);
  }
}, 3000); // 3 seconds

// ===============================
// THEME TOGGLER (WORKING VERSION)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // Load previous theme
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    html.setAttribute("data-theme", "dark");
  }

  const buttons = [
    document.getElementById("themeToggle"),
    document.getElementById("themeToggleMobile"),
  ];

  function toggleTheme() {
    const current = html.getAttribute("data-theme");
    if (current === "dark") {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }

  buttons.forEach((btn) => {
    if (btn) btn.addEventListener("click", toggleTheme);
  });
});
