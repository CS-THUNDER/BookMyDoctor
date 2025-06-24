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
                  <img src="/Frontend/Assets/${userRole}-avatar.png" 
                       alt="Profile" 
                       onerror="this.src='/Frontend/Assets/default-avatar.png'">
                  <span>Profile</span>
              </button>
              <div class="dropdown-menu">
                  <a href="/Frontend/pages/${userRole}-dashboard.html">Dashboard</a>
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
        window.location.href = "/Frontend/pages/login.html";
      });
  } else {
    navButtons.innerHTML = `
          <a href="/Frontend/pages/login.html" class="login-btn" id="loginBtn">Login</a>
      `;
  }
});
