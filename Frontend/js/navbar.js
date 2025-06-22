document.addEventListener("DOMContentLoaded", function () {
  // Check authentication status
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // DOM Elements
  const authButtons = document.getElementById("authButtons");
  const userProfile = document.getElementById("userProfile");
  const mainNavLinks = document.getElementById("mainNavLinks");
  const profileToggle = document.getElementById("profileToggle");
  const profileDropdown = document.getElementById("profileDropdown");

  // Update UI based on authentication
  if (token) {
    // Hide auth buttons and show profile
    authButtons.style.display = "none";
    userProfile.style.display = "flex";

    // Load user data
    loadUserProfile();

    // Add role-specific links
    addRoleSpecificLinks(userRole);
  } else {
    // Show auth buttons and hide profile
    authButtons.style.display = "flex";
    userProfile.style.display = "none";
  }

  // Profile dropdown toggle
  if (profileToggle) {
    profileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.style.display =
        profileDropdown.style.display === "block" ? "none" : "block";
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function () {
    if (profileDropdown) {
      profileDropdown.style.display = "none";
    }
  });

  // Logout functionality
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }

  // Search functionality
  setupSearch();
});

async function loadUserProfile() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://localhost:5000/api/users/me", {
      headers: {
        "x-auth-token": token,
      },
    });

    if (response.ok) {
      const userData = await response.json();

      // Update profile elements
      document.getElementById("profileName").textContent =
        userData.name.split(" ")[0];
      document.getElementById("dropdownProfileName").textContent =
        userData.name;

      const role = localStorage.getItem("userRole");
      document.getElementById("dropdownProfileRole").textContent =
        role === "doctor" ? "Doctor" : "Patient";

      // Set profile image based on role
      const profileImage = document.getElementById("profileImage");
      const dropdownProfileImage = document.getElementById(
        "dropdownProfileImage"
      );
      const imagePath = `../Assets/${role}-avatar.png`;

      profileImage.src = imagePath;
      dropdownProfileImage.src = imagePath;

      // Set dashboard link based on role
      const dashboardLink = document.getElementById("dashboardLink");
      if (dashboardLink) {
        dashboardLink.href =
          role === "doctor"
            ? "/Frontend/pages/doctor-dashboard.html"
            : "/Frontend/pages/patient-dashboard.html";
      }
    } else {
      // Fallback UI if user data cannot be loaded
      document.getElementById("profileName").textContent = "Guest";
      document.getElementById("dropdownProfileImage").src =
        "/Assets/default-avatar.png";
    }
  } catch (error) {
    console.error("Error loading user profile:", error);
    // Fallback UI
    document.getElementById("profileName").textContent = "Guest";
    document.getElementById("dropdownProfileImage").src =
      "/Assets/default-avatar.png";
  }
}

function addRoleSpecificLinks(userRole) {
  if (!mainNavLinks) return;

  if (userRole === "doctor") {
    mainNavLinks.innerHTML += `
            <li><a href="/Frontend/pages/doctor-appointments.html"><i class="fas fa-calendar-check"></i> My Appointments</a></li>
            <li><a href="/Frontend/pages/doctor-schedule.html"><i class="fas fa-clock"></i> My Schedule</a></li>
        `;
  } else {
    mainNavLinks.innerHTML += `
            <li><a href="/Frontend/pages/my-appointments.html"><i class="fas fa-calendar-alt"></i> My Appointments</a></li>
            <li><a href="/Frontend/pages/prescriptions.html"><i class="fas fa-prescription-bottle-alt"></i> Prescriptions</a></li>
        `;
  }
}

function setupSearch() {
  const searchInput = document.getElementById("globalSearch");
  const searchResults = document.getElementById("searchResults");

  if (!searchInput || !searchResults) return;

  searchInput.addEventListener(
    "input",
    debounce(function () {
      const query = searchInput.value.trim();

      if (query.length < 2) {
        searchResults.style.display = "none";
        return;
      }

      // In a real app, you would fetch search results from your API
      const mockResults = [
        {
          type: "doctor",
          name: "Dr. Smith (Cardiologist)",
          url: "/Frontend/pages/doctor-profile.html?id=1",
        },
        {
          type: "specialty",
          name: "Cardiology",
          url: "/Frontend/pages/find-doctor.html?specialty=cardiology",
        },
        {
          type: "service",
          name: "Online Consultation",
          url: "/Frontend/pages/services.html",
        },
      ];

      displaySearchResults(mockResults);
    }, 300)
  );
}

function displaySearchResults(results) {
  const searchResults = document.getElementById("searchResults");

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found</div>';
    searchResults.style.display = "block";
    return;
  }

  searchResults.innerHTML = results
    .map(
      (result) => `
        <a href="${result.url}" class="search-result-item">
            <i class="fas ${
              result.type === "doctor" ? "fa-user-md" : "fa-tag"
            }"></i>
            <span>${result.name}</span>
        </a>
    `
    )
    .join("");

  searchResults.style.display = "block";
}

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/Frontend/pages/login.html";
}

if (module.hot) {
  module.hot.accept();
}
// (Removed duplicate imagePath declaration as it is already handled in loadUserProfile)