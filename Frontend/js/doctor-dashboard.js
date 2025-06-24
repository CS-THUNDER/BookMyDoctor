document.addEventListener("DOMContentLoaded", function () {
  // Check authentication
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // if (!token || !user || user.role !== "doctor") {
  //   window.location.href = "/Frontend/pages/login.html";
  //   return;
  // }

  // Load doctor data
  loadDoctorData();

  // Load today's appointments
  loadTodaysAppointments();

  // Load statistics
  loadStatistics();

  // Setup event listeners
  document.getElementById("logout-btn").addEventListener("click", logout);
  document
    .getElementById("add-schedule-btn")
    .addEventListener("click", addSchedule);
});

// Load doctor data
async function loadDoctorData() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    // Display doctor info from local storage first
    document.getElementById("doctor-name").textContent = user.name;
    document.getElementById("greeting-name").textContent =
      user.name.split(" ")[0];

    // Then try to fetch updated data from server
    const response = await fetch("/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const doctorData = await response.json();
      document.getElementById("doctor-specialization").textContent =
        doctorData.specialization || "General Practitioner";
    } else {
      document.getElementById("doctor-specialization").textContent =
        "General Practitioner";
    }
  } catch (error) {
    console.error("Error loading doctor data:", error);
    document.getElementById("doctor-specialization").textContent =
      "General Practitioner";
  }
}


// Load today's appointments
async function loadTodaysAppointments() {
  try {
    // In a real app, you would fetch from your API
    const mockAppointments = [
      {
        id: 1,
        patient: "John Doe",
        time: "10:00 AM",
        purpose: "Regular Checkup",
      },
      {
        id: 2,
        patient: "Jane Smith",
        time: "11:30 AM",
        purpose: "Consultation",
      },
      {
        id: 3,
        patient: "Robert Johnson",
        time: "2:00 PM",
        purpose: "Follow-up",
      },
    ];

    const appointmentsList = document.getElementById("todays-appointments");
    appointmentsList.innerHTML = mockAppointments
      .map(
        (appt) => `
          <div class="appointment-item">
              <h4>${appt.patient}</h4>
              <p>${appt.time} - ${appt.purpose}</p>
              <div class="actions">
                  <button class="btn small" onclick="startAppointment(${appt.id})">Start</button>
                  <button class="btn small outline" onclick="cancelAppointment(${appt.id})">Cancel</button>
              </div>
          </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error loading appointments:", error);
  }
}

// Load statistics
async function loadStatistics() {
  try {
    // In a real app, you would fetch from your API
    document.getElementById("total-appointments").textContent = "24";
    document.getElementById("total-patients").textContent = "18";
  } catch (error) {
    console.error("Error loading statistics:", error);
  }
}

function addSchedule() {
  window.location.href = "add-schedule.html";
}

function startAppointment(appointmentId) {
  console.log("Starting appointment:", appointmentId);
  // In a real app, you would navigate to appointment page
}

function cancelAppointment(appointmentId) {
  console.log("Canceling appointment:", appointmentId);
  // In a real app, you would call API to cancel
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/Frontend/index.html";
}

// Make functions available globally
window.startAppointment = startAppointment;
window.cancelAppointment = cancelAppointment;
