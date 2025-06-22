// Check authentication and role
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const currentPage = window.location.pathname.split("/").pop();

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // Role-based redirection logic
  if (currentPage === "doctor-dashboard.html" && userRole !== "doctor") {
    window.location.href = "patient-dashboard.html";
  } else if (
    currentPage === "patient-dashboard.html" &&
    userRole !== "patient"
  ) {
    window.location.href = "doctor-dashboard.html";
  }

  // Logout functionality
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });
});

// If doctor tries to access patient dashboard:
if (userRole === "doctor" && currentPage === "patient-dashboard.html") {
  window.location.href = "doctor-dashboard.html";
}