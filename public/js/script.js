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
