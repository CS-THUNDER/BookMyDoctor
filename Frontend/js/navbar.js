document.addEventListener("DOMContentLoaded", function () {
  console.log("Navbar script loaded");

  const token = localStorage.getItem("token");
  const navButtons = document.getElementById("navButtons");

  if (!navButtons) {
    console.error("navButtons element not found!");
    return;
  }

  if (token) {
    const userRole = localStorage.getItem("userRole") || "patient";
    navButtons.innerHTML = `
          <div class="profile-dropdown">
              <button class="profile-btn">
                  <img src="./Assets/${userRole}-avatar.png" 
                       alt="Profile" 
                       onerror="this.src='./Assets/default-avatar.png'">
                  <span>Profile</span>
              </button>
              <div class="dropdown-menu">
                  <a href="./pages/${userRole}-dashboard.html">Dashboard</a>
                  <a href="#" id="logoutBtn">Logout</a>
              </div>
          </div>
      `;

    document
      .getElementById("logoutBtn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        window.location.href = "./pages/login.html";
      });
  }
  // Else case is already handled in HTML fallback
});
