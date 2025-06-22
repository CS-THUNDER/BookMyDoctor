document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  // Sample search data (replace with your actual data)
  const searchData = [
    {
      title: "Find Doctors",
      url: "/Frontend/pages/find-doctor.html",
      category: "Page",
    },
    {
      title: "Book Appointment",
      url: "/Frontend/pages/Appointment.html",
      category: "Page",
    },
    {
      title: "Cardiologists",
      url: "/Frontend/pages/find-doctor.html?specialty=cardiology",
      category: "Specialty",
    },
    {
      title: "Dermatologists",
      url: "/Frontend/pages/find-doctor.html?specialty=dermatology",
      category: "Specialty",
    },
    {
      title: "Pediatricians",
      url: "/Frontend/pages/find-doctor.html?specialty=pediatrics",
      category: "Specialty",
    },
    { title: "Login", url: "/Frontend/pages/login.html", category: "Page" },
  ];

  // Debounce function for better performance
  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Search function
  const performSearch = debounce(function () {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";

    if (query.length < 2) {
      searchResults.classList.remove("show");
      return;
    }

    const results = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      results.forEach((item) => {
        const resultItem = document.createElement("a");
        resultItem.href = item.url;
        resultItem.innerHTML = `
            <strong>${item.title}</strong>
            <span>${item.category}</span>
          `;
        searchResults.appendChild(resultItem);
      });
      searchResults.classList.add("show");
    } else {
      const noResults = document.createElement("div");
      noResults.className = "no-results";
      noResults.textContent = "No results found";
      searchResults.appendChild(noResults);
      searchResults.classList.add("show");
    }
  }, 300);

  // Event listeners
  searchInput.addEventListener("input", performSearch);

  // Close search results when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-search")) {
      searchResults.classList.remove("show");
    }
  });

  // Handle keyboard navigation
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      searchResults.classList.remove("show");
    }
  });
});
