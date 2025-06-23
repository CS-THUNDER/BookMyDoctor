document.addEventListener("DOMContentLoaded", function () {
  // Role selection
  const patientBtn = document.getElementById("patientBtn");
  const doctorBtn = document.getElementById("doctorBtn");
  const roleInput = document.getElementById("role");
  const registerTitle = document.getElementById("registerTitle");
  const registerSubtitle = document.getElementById("registerSubtitle");
  const registerBtn = document.getElementById("registerBtn");

  // Toggle between patient and doctor registration
  function setActiveRole(role) {
    patientBtn.classList.toggle("active", role === "patient");
    doctorBtn.classList.toggle("active", role === "doctor");
    roleInput.value = role;

    if (role === "patient") {
      registerTitle.textContent = "Create Patient Account";
      registerSubtitle.textContent = "Join as a patient to book appointments";
    } else {
      registerTitle.textContent = "Create Doctor Account";
      registerSubtitle.textContent = "Join as a doctor to manage appointments";
    }
  }

  patientBtn.addEventListener("click", () => setActiveRole("patient"));
  doctorBtn.addEventListener("click", () => setActiveRole("doctor"));

  // Check URL for role parameter
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get("type");
  if (roleParam === "doctor") {
    setActiveRole("doctor");
  }

  // Password visibility toggle
  window.togglePassword = function (fieldId) {
    const field = document.getElementById(fieldId);
    const icon = field.nextElementSibling.nextElementSibling;
    if (field.type === "password") {
      field.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      field.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  };

  // Form submission
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Disable button during submission
    registerBtn.disabled = true;
    registerBtn.textContent = "Registering...";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    // Validation
    if (password !== confirmPassword) {
      showError("confirmPassword", "Passwords do not match");
      registerBtn.disabled = false;
      registerBtn.textContent = "Register";
      return;
    }

    if (password.length < 6) {
      showError("password", "Password must be at least 6 characters");
      registerBtn.disabled = false;
      registerBtn.textContent = "Register";
      return;
    }

    try {
      const response = await fetch("/api/v1/auth/register", {
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
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific field errors or general error
        if (data.errors) {
          data.errors.forEach((err) => {
            showError(err.param || "registerForm", err.msg);
          });
        } else {
          throw new Error(data.error || "Registration failed");
        }
        return;
      }

      // Save token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "doctor") {
        window.location.href = "/Frontend/pages/doctor-dashboard.html";
      } else {
        window.location.href = "/Frontend/pages/patient-dashboard.html";
      }
    } catch (error) {
      console.error("Registration error:", error);
      showError(
        "registerForm",
        error.message || "Registration failed. Please try again."
      );
    } finally {
      registerBtn.disabled = false;
      registerBtn.textContent = "Register";
    }
  });

  // Helper function to show error messages
  function showError(fieldId, message) {
    // Remove existing error for this field
    const existingError = document.querySelector(
      `#${fieldId} + .error-message`
    );
    if (existingError) existingError.remove();

    const field = document.getElementById(fieldId);
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.style.marginTop = "5px";
    errorElement.textContent = message;

    // Insert after the field or at the form bottom
    if (field) {
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    } else {
      // For general form errors
      registerForm.insertBefore(errorElement, registerForm.firstChild);
    }
  }
});
