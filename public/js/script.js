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
    alert.classList.remove("show");
    alert.style.opacity = "0";
    setTimeout(() => alert.remove(), 500);
  }
}, 3000); // 3 seconds
