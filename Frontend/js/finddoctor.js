// Simple JavaScript for search functionality and interactivity
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");
  const doctorCards = document.querySelectorAll(".doctor-card");
  const appointmentBtns = document.querySelectorAll(".appointment-btn");
  const categoryBtns = document.querySelectorAll(".category-btn");

  // Search functionality (basic filtering)
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    doctorCards.forEach((card) => {
      const doctorName = card
        .querySelector(".doctor-name")
        .textContent.toLowerCase();
      const specialty = card
        .querySelector(".doctor-specialty")
        .textContent.toLowerCase();
      const hospital = card
        .querySelector(".doctor-hospital")
        .textContent.toLowerCase();

      if (
        doctorName.includes(searchTerm) ||
        specialty.includes(searchTerm) ||
        hospital.includes(searchTerm) ||
        searchTerm === ""
      ) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease-in";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Search event listeners
  searchBtn.addEventListener("click", performSearch);

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Real-time search as user types
  searchInput.addEventListener("input", function () {
    setTimeout(performSearch, 300); // Debounce search
  });

  // Appointment button functionality
  appointmentBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const doctorCard = this.closest(".doctor-card");
      const doctorName = doctorCard.querySelector(".doctor-name").textContent;

      // Simple animation
      this.style.transform = "scale(0.95)";
      this.textContent = "Booking...";

      setTimeout(() => {
        this.style.transform = "scale(1)";
        this.textContent = "Book Appointment";
        alert(
          `Appointment request sent for ${doctorName}!\nYou will receive a confirmation shortly.`
        );
      }, 1000);
    });
  });

  // Add fade-in animation for cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  doctorCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // CSS Animation keyframes (added via JavaScript)
  const style = document.createElement("style");
  style.textContent = `
      @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
      }
  `;
  document.head.appendChild(style);

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        categoryBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const specialty = this.dataset.specialty;
        loadDoctors(specialty);
    });
  });

  // Initial load
  loadDoctors('all');
});

async function loadDoctors(specialty) {
try {
  let url = 'http://localhost:5000/api/users/doctors';
  if (specialty !== 'all') {
      url += `?specialty=${specialty}`;
  }

  const response = await fetch(url);
  const doctors = await response.json();

  const doctorsContainer = document.getElementById('doctorsContainer');
  doctorsContainer.innerHTML = doctors.map(doctor => `
      <div class="doctor-card">
          <img src="../Assets/doctor-avatar.png" alt="${doctor.name}">
          <h3>${doctor.name}</h3>
          <p class="specialty">${doctor.specialization || 'General Practitioner'}</p>
          <p class="experience">${doctor.experience || '5'} years experience</p>
          <button class="btn book-btn" onclick="viewDoctor('${doctor._id}')">View Profile</button>
      </div>
  `).join('');
} catch (error) {
  console.error('Error loading doctors:', error);
}
}

function viewDoctor(doctorId) {
  window.location.href = `doctor-profile.html?id=${doctorId}`;
}
