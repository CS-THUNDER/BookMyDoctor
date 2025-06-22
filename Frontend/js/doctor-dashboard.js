document.addEventListener("DOMContentLoaded", function () {
  // Check authentication
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token || userRole !== "doctor") {
    window.location.href = "login.html";
    return;
  }

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
    const response = await fetch("http://localhost:5000/api/users/me", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctor data");
    }

    const doctorData = await response.json();

    // Display doctor info
    document.getElementById("doctor-name").textContent = doctorData.name;
    document.getElementById("greeting-name").textContent =
      doctorData.name.split(" ")[0];

    // In a real app, you would fetch doctor details
    document.getElementById("doctor-specialization").textContent =
      "Cardiologist";
  } catch (error) {
    console.error("Error loading doctor data:", error);
    alert("Error loading doctor data. Please login again.");
    logout();
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
  window.location.href = "login.html";
}

// Make functions available globally
window.startAppointment = startAppointment;
window.cancelAppointment = cancelAppointment;
