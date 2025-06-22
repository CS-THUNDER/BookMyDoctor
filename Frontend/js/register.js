document.addEventListener("DOMContentLoaded", function () {
  // Set user type from URL
  const urlParams = new URLSearchParams(window.location.search);
  const userType = urlParams.get("type") || "patient";
  document.getElementById("userType").value = userType;

  // Update title based on user type
  if (userType === "doctor") {
    document.getElementById("registerTitle").textContent =
      "Doctor Registration";
    document.getElementById("registerSubtitle").textContent =
      "Join our platform to connect with patients";
  }

  // Form submission
  document
    .getElementById("registerForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const role = document.getElementById("userType").value;

      // Validation
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      try {
        const btn = document.getElementById("registerBtn");
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';

        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              role,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || "Registration failed");
        }

        // Save token and redirect
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", role);

        alert("Registration successful!");
        window.location.href =
          role === "patient"
            ? "../index.html"
            : "../pages/doctor-dashboard.html";
      } catch (error) {
        alert(error.message);
        const btn = document.getElementById("registerBtn");
        btn.disabled = false;
        btn.innerHTML = "Register";
      }
    });

  // Toggle password visibility
  window.togglePassword = function (inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.nextElementSibling;

    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  };
});
