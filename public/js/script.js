// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
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

setTimeout(() => {
  const alert = document.getElementById("flashAlert");
  if (alert) {
    alert.classList.add("hide"); // triggers slide-out animation
    setTimeout(() => alert.remove(), 500); // wait for animation to finish
  }
}, 3000); // auto close after 3 sec