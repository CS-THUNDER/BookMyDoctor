// Simple JavaScript for search functionality and interactivity
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");
  const doctorCards = document.querySelectorAll(".doctor-card");
  const appointmentBtns = document.querySelectorAll(".appointment-btn");

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
