const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// track if the input was invalid
[emailInput, passwordInput].forEach((input) => {
  input.wasInvalid = false;

  // Real-time validation
  input.addEventListener("input", () => {
    if (input.wasInvalid) {
      // Only apply green if previously invalid
      if (input.value.trim()) {
        input.classList.remove("invalid");
        input.classList.add("valid"); // Green
      } else {
        input.classList.add("invalid"); // Keep red if empty
        input.classList.remove("valid");
      }
    }
  });
});

// Form submission
form.addEventListener("submit",  (e) => {
    let isValid = true;


  [emailInput, passwordInput].forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("invalid");
      input.classList.remove("valid");
      input.wasInvalid = true; // Mark that it was invalid
      isValid = false;
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
      input.wasInvalid = false; // Clear invalid flag
    }
  });

  if (!isValid) {
    e.preventDefault(); // Stop submission if invalid
  }


});