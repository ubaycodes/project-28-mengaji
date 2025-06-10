document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("active");

    // Toggle scroll lock
    body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  // Close menu when clicking on links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove("open");
        navLinks.classList.remove("active");
        body.style.overflow = "auto";
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav") && !e.target.classList.contains("hamburger")) {
      hamburger.classList.remove("open");
      navLinks.classList.remove("active");
      body.style.overflow = "auto";
    }
  });

  // Close menu on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("open");
      navLinks.classList.remove("active");
      body.style.overflow = "auto";
    }
  });
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Countdown Timer
  function updateCountdown() {
    // Set the date we're counting down to (Ramadan end date example)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 10); // 10 days from now

    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    // If the countdown is finished
    if (distance < 0) {
      clearInterval(countdownTimer);
      document.querySelector(".countdown-timer").innerHTML =
        '<div class="expired">Promo telah berakhir!</div>';
    }
  }

  // Update the countdown every 1 second
  updateCountdown();
  const countdownTimer = setInterval(updateCountdown, 1000);

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector("textarea").value;

      // Here you would typically send the form data to a server
      console.log("Form submitted:", { name, email, message });

      // Show success message
      alert(
        "Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda."
      );

      // Reset form
      this.reset();
    });
  }
});
