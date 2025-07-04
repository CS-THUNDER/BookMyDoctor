document.addEventListener("DOMContentLoaded", function () {
  // Check authentication
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || user.role !== "patient") {
    window.location.href = "/Frontend/pages/login.html";
    return;
  }

  // Load user data
  loadUserData();

  // Load appointments
  loadAppointments();

  // Load doctors
  loadDoctors();

  // Setup event listeners
  document.getElementById("logout-btn").addEventListener("click", logout);
  document
    .getElementById("book-appointment-btn")
    .addEventListener("click", bookAppointment);
});

// Load current user data
async function loadUserData() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    // Display user info from local storage first
    document.getElementById("patient-name").textContent = user.name;
    document.getElementById("patient-email").textContent = user.email;
    document.getElementById("greeting-name").textContent = user.name.split(" ")[0];

    // Then try to fetch updated data from server
    const response = await fetch("/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      // Update any additional user data if needed
    }
  } catch (error) {
    console.error("Error loading user data:", error);
  }
}

// ... rest of the patient-dashboard.js code remains the same ...

// Load patient's appointments
async function loadAppointments() {
  try {
    // In a real app, you would fetch from your API
    const mockAppointments = [
      {
        id: 1,
        doctor: "Dr. Smith",
        specialty: "Cardiology",
        date: "2023-12-15",
        time: "10:00 AM",
        status: "Confirmed",
      },
      {
        id: 2,
        doctor: "Dr. Johnson",
        specialty: "Dermatology",
        date: "2023-12-20",
        time: "2:30 PM",
        status: "Pending",
      },
    ];

    const appointmentsList = document.getElementById("upcoming-appointments");
    appointmentsList.innerHTML = mockAppointments
      .map(
        (appt) => `
          <div class="appointment-item">
              <h4>${appt.doctor} (${appt.specialty})</h4>
              <p>${appt.date} at ${appt.time}</p>
              <span class="status ${appt.status.toLowerCase()}">${
          appt.status
        }</span>
          </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error loading appointments:", error);
  }
}

// Load available doctors
async function loadDoctors() {
  try {
    const response = await fetch("http://localhost:5000/api/users/doctors", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

    const doctors = await response.json();

    const doctorsList = document.getElementById("doctors-list");
    doctorsList.innerHTML = doctors
      .map(
        (doctor) => `
          <div class="doctor-card">
              <img src="../Assets/doctor-avatar.png" alt="${
                doctor.name
              }" class="doctor-avatar">
              <h4>${doctor.name}</h4>
              <p>${doctor.specialization || "General Practitioner"}</p>
              <button class="btn small" onclick="viewDoctor('${
                doctor._id
              }')">View Profile</button>
          </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error loading doctors:", error);
    document.getElementById("doctors-list").innerHTML = `
          <p class="error">Unable to load doctors. Please try again later.</p>
      `;
  }
}

function bookAppointment() {
  window.location.href = "../pages/find-doctor.html";
}

function viewDoctor(doctorId) {
  window.location.href = `../pages/doctor-profile.html?id=${doctorId}`;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/Frontend/index.html";
}

// Make functions available globally
window.viewDoctor = viewDoctor;
