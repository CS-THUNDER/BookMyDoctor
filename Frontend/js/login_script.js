document.addEventListener("DOMContentLoaded", function () {
  // Toggle between patient and doctor forms
  const patientBtn = document.getElementById("patientBtn");
  const doctorBtn = document.getElementById("doctorBtn");
  const patientForm = document.getElementById("patientForm");
  const doctorForm = document.getElementById("doctorForm");

  patientBtn.addEventListener("click", function () {
    patientBtn.classList.add("active");
    doctorBtn.classList.remove("active");
    patientForm.style.display = "block";
    doctorForm.style.display = "none";
  });

  doctorBtn.addEventListener("click", function () {
    doctorBtn.classList.add("active");
    patientBtn.classList.remove("active");
    doctorForm.style.display = "block";
    patientForm.style.display = "none";
  });

  // Form submission
  const patientLoginForm = document.getElementById("patientLoginForm");
  const doctorLoginForm = document.getElementById("doctorLoginForm");

  patientLoginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("patientEmail").value;
    const password = document.getElementById("patientPassword").value;
    loginUser(email, password, "patient");
  });

  doctorLoginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("doctorEmail").value;
    const password = document.getElementById("doctorPassword").value;
    loginUser(email, password, "doctor");
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

  // Login function (simulated)
  function loginUser(email, password, userType) {
    // In a real app, you would send this to your backend
    console.log(`Logging in as ${userType} with email: ${email}`);

    // Show loading state
    const btn =
      userType === "patient"
        ? patientLoginForm.querySelector("button[type='submit']")
        : doctorLoginForm.querySelector("button[type='submit']");

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      btn.innerHTML = "Login";
      btn.disabled = false;

      // Redirect based on user type
      if (userType === "patient") {
        window.location.href = "../index.html"; // Redirect to patient dashboard
      } else {
        window.location.href = "../pages/doctor-dashboard.html"; // Redirect to doctor dashboard
      }
    }, 1500);
  }
});
