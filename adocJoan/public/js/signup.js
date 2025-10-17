const form = document.getElementById("signupForm");
const inputs = document.querySelectorAll(".form-input");

// Real-time validation
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim()) {
      input.classList.remove("invalid");
      input.classList.add("valid");
    } else {
      input.classList.remove("valid");
    }
  });
});

// Form submission
form.addEventListener("submit", (e) => {
  let isValid = true;

  // Validate all inputs
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("invalid");
      input.classList.remove("valid");
      isValid = false;
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
    }
  });

  // Password check
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (password !== confirmPassword) {
    document.getElementById("confirmPassword").classList.add("invalid");
    document.getElementById("confirmPassword").classList.remove("valid");
    alert("Passwords do not match!");
    isValid = false;
  }

  // Stop if validation fails
  if (!isValid) {
    e.preventDefault(); // prevent submission only if invalid
  }
});
