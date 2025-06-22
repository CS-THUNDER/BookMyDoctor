// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Booking modal function
function openBookingModal() {
  window.location.href = "/Frontend/pages/Appointment.html";
}

// Section animations
gsap.utils.toArray(".section").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".carousel-indicator");
const track = document.getElementById("carouselTrack");

function updateCarousel() {
  gsap.to(track, {
    x: `-${currentSlide * 100}%`,
    duration: 0.6,
    ease: "power2.out"
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

function moveCarousel(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

// Auto-play carousel
let carouselInterval = setInterval(() => moveCarousel(1), 5000);

// Pause on hover
document.querySelector(".carousel").addEventListener("mouseenter", () => {
  clearInterval(carouselInterval);
});

document.querySelector(".carousel").addEventListener("mouseleave", () => {
  carouselInterval = setInterval(() => moveCarousel(1), 5000);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});