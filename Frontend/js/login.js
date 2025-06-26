// Frontend/js/login.js
document.addEventListener("DOMContentLoaded", () => {
  const patientBtn = document.getElementById("patientBtn");
  const doctorBtn = document.getElementById("doctorBtn");
  const patientForm = document.getElementById("patientForm");
  const doctorForm = document.getElementById("doctorForm");

  patientBtn.addEventListener("click", () => {
    patientBtn.classList.add("active");
    doctorBtn.classList.remove("active");
    patientForm.style.display = "block";
    doctorForm.style.display = "none";
  });

  doctorBtn.addEventListener("click", () => {
    doctorBtn.classList.add("active");
    patientBtn.classList.remove("active");
    doctorForm.style.display = "block";
    patientForm.style.display = "none";
  });

  window.togglePassword = (id) => {
    const inp = document.getElementById(id);
    const icon = inp.nextElementSibling.nextElementSibling;
    if (inp.type === "password") {
      inp.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      inp.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  };

  const loginPatient = document.getElementById("patientLoginForm");
  const loginDoctor = document.getElementById("doctorLoginForm");

  loginPatient.addEventListener("submit", (e) => handleLogin(e, "patient"));
  loginDoctor.addEventListener("submit", (e) => handleLogin(e, "doctor"));
});

async function handleLogin(e, role) {
  e.preventDefault();
  const email = document.getElementById(`${role}Email`).value.trim();
  const password = document.getElementById(`${role}Password`).value.trim();

  const btn = document.querySelector(
    `#${role}LoginForm button[type="submit"]`
  );
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

  try {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Login failed");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "doctor") {
      window.location.href = "/Frontend/pages/doctor-dashboard.html";
    } else {
      window.location.href = "/Frontend/pages/patient-dashboard.html";
    }
  } catch (err) {
    alert(err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "Login";
  }
}

// document.addEventListener("DOMContentLoaded", function () {
//   // Toggle between patient and doctor forms
//   const patientBtn = document.getElementById("patientBtn");
//   const doctorBtn = document.getElementById("doctorBtn");
//   const patientForm = document.getElementById("patientForm");
//   const doctorForm = document.getElementById("doctorForm");

//   patientBtn.addEventListener("click", function () {
//     patientBtn.classList.add("active");
//     doctorBtn.classList.remove("active");
//     patientForm.style.display = "block";
//     doctorForm.style.display = "none";
//   });

//   doctorBtn.addEventListener("click", function () {
//     doctorBtn.classList.add("active");
//     patientBtn.classList.remove("active");
//     doctorForm.style.display = "block";
//     patientForm.style.display = "none";
//   });

//   // Form submission
//   const patientLoginForm = document.getElementById("patientLoginForm");
//   const doctorLoginForm = document.getElementById("doctorLoginForm");

//   patientLoginForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const email = document.getElementById("patientEmail").value;
//     const password = document.getElementById("patientPassword").value;
//     loginUser(email, password, "patient");
//   });

//   doctorLoginForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const email = document.getElementById("doctorEmail").value;
//     const password = document.getElementById("doctorPassword").value;
//     loginUser(email, password, "doctor");
//   });

//   // Toggle password visibility
//   window.togglePassword = function (inputId) {
//     const input = document.getElementById(inputId);
//     const icon = input.nextElementSibling.nextElementSibling;

//     if (input.type === "password") {
//       input.type = "text";
//       icon.classList.remove("fa-eye");
//       icon.classList.add("fa-eye-slash");
//     } else {
//       input.type = "password";
//       icon.classList.remove("fa-eye-slash");
//       icon.classList.add("fa-eye");
//     }
//   };

//   // Login function (simulated)
//   function loginUser(email, password, userType) {
//     // In a real app, you would send this to your backend
//     console.log(`Logging in as ${userType} with email: ${email}`);

//     // Show loading state
//     const btn =
//       userType === "patient"
//         ? patientLoginForm.querySelector("button[type='submit']")
//         : doctorLoginForm.querySelector("button[type='submit']");

//     btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
//     btn.disabled = true;

//     // Simulate API call
//     setTimeout(() => {
//       btn.innerHTML = "Login";
//       btn.disabled = false;

//       // Redirect based on user type
//       if (userType === "patient") {
//         window.location.href = "../pages/patient-dashboard.html"; // Redirect to patient dashboard
//       } else {
//         window.location.href = "../pages/doctor-dashboard.html"; // Redirect to doctor dashboard
//       }
//     }, 1500);
//   }
// });

// // Replace the existing loginUser function with this:
// async function loginUser(email, password, userType) {
//   try {
//     const btn = userType === "patient" 
//       ? patientLoginForm.querySelector("button[type='submit']") 
//       : doctorLoginForm.querySelector("button[type='submit']");
    
//     btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
//     btn.disabled = true;

//     const response = await fetch('http://localhost:5000/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//         role: userType
//       })
//     });

//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.msg || 'Login failed');
//     }

//     // Save token in localStorage and redirect
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('userRole', userType);
    
//     if (userType === 'patient') {
//       window.location.href = "../index.html";
//     } else {
//       window.location.href = "../pages/doctor-dashboard.html";
//     }
//   } catch (error) {
//     alert(error.message);
//     const btn = userType === "patient" 
//       ? patientLoginForm.querySelector("button[type='submit']") 
//       : doctorLoginForm.querySelector("button[type='submit']");
//     btn.innerHTML = 'Login';
//     btn.disabled = false;
//   }
// }

// // After successful login
// localStorage.setItem("token", data.token);
// localStorage.setItem("userRole", userType);

// // Update navbar
// if (window.updateNavbar) {
//     updateNavbar();
// }