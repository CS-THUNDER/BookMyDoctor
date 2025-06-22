document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target"); // new attribute for consistency
    const speed = 100;
    const increment = Math.ceil(target / speed);
    let count = 0;

    const tick = () => {
      count += increment;
      if (count < target) {
        counter.textContent = count.toLocaleString() + "+";
        requestAnimationFrame(tick);
      } else {
        counter.textContent = target.toLocaleString() + "+";
      }
    };

    tick();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.textContent = "0+";
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    const target = counter.textContent.replace(/\D/g, "");
    counter.setAttribute("data-target", target); // store original number
    observer.observe(counter);
  });
});
