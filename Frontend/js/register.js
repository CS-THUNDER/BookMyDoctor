document.addEventListener("DOMContentLoaded", function () {
  // Set user type from URL or default to patient
  const urlParams = new URLSearchParams(window.location.search);
  let userType = urlParams.get("type") || "patient";

  // DOM Elements
  const registerForm = document.getElementById("registerForm");
  const patientBtn = document.getElementById("patientBtn");
  const doctorBtn = document.getElementById("doctorBtn");
  const userTypeInput = document.getElementById("userType");
  const registerTitle = document.getElementById("registerTitle");
  const registerSubtitle = document.getElementById("registerSubtitle");
  const registerBtn = document.getElementById("registerBtn");

  // Initialize form based on user type
  function initForm() {
    userTypeInput.value = userType;

    if (userType === "doctor") {
      doctorBtn.classList.add("active");
      patientBtn.classList.remove("active");
      registerTitle.textContent = "Doctor Registration";
      registerSubtitle.textContent =
        "Join our platform to connect with patients";
    } else {
      patientBtn.classList.add("active");
      doctorBtn.classList.remove("active");
      registerTitle.textContent = "Patient Registration";
      registerSubtitle.textContent = "Join us to book appointments easily";
    }
  }

  // Toggle user type
  patientBtn.addEventListener("click", () => {
    userType = "patient";
    initForm();
  });

  doctorBtn.addEventListener("click", () => {
    userType = "doctor";
    initForm();
  });

  // Form submission
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      // Show loading state
      registerBtn.disabled = true;
      registerBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Registering...';

      // Send registration request
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Registration failed");
      }

      // Auto-login after registration
      const loginResponse = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            role: userType,
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.msg || "Auto-login failed");
      }

      // Save token and redirect
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("userRole", userType);

      // Redirect to appropriate dashboard
      if (userType === "patient") {
        window.location.href = "../pages/patient-dashboard.html";
      } else {
        window.location.href = "../pages/doctor-dashboard.html";
      }
    } catch (error) {
      alert(error.message);
      registerBtn.disabled = false;
      registerBtn.innerHTML = "Register";
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

  // Initialize form on load
  initForm();
});

function validateForm() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return false;
  }
  
  if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
  }
  
  return true;
}