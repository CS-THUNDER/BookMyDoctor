// Enhanced Feedback Form Functionality
document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackThankYou = document.querySelector(".feedback-thankyou");
  const btnBackToForm = document.querySelector(".btn-back-to-form");

  // Floating label functionality
  const floatingInputs = document.querySelectorAll(
    ".floating input, .floating textarea"
  );

  floatingInputs.forEach((input) => {
    // Add placeholder with space to trigger floating effect
    if (!input.placeholder) input.placeholder = " ";

    input.addEventListener("focus", function () {
      this.parentNode.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentNode.classList.remove("focused");
      }
    });

    // Initialize labels based on existing values
    if (input.value) {
      input.parentNode.classList.add("focused");
    }
  });

  // Form submission
  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    const name = document.getElementById("feedbackName").value.trim();
    const email = document.getElementById("feedbackEmail").value.trim();
    const message = document.getElementById("feedbackMessage").value.trim();
    const rating =
      document.querySelector('input[name="rating"]:checked')?.value || 0;

    if (!name || !email || !message || rating === 0) {
      showNotification("Please fill all fields and provide a rating", "error");
      return;
    }

    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
      // Show thank you message
      feedbackForm.style.display = "none";
      feedbackThankYou.style.display = "block";

      // Show success notification
      showNotification("Thank you for your valuable feedback!", "success");

      // You would typically send the data to your server here
      console.log("Feedback submitted:", { name, email, message, rating });
    }, 1000);
  });

  // Back to form button
  btnBackToForm.addEventListener("click", function () {
    feedbackThankYou.style.display = "none";
    feedbackForm.style.display = "block";
    feedbackForm.reset();
    document
      .querySelectorAll('.rating-stars input[type="radio"]')
      .forEach((radio) => {
        radio.checked = false;
      });
  });
});

// Enhanced Notification System
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  const icon = type === "success" ? "fa-check-circle" : "fa-exclamation-circle";
  notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Hide after 4 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}
