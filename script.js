// Mobile menu toggle only
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Optional: Slightly shrink nav on scroll (premium feel) - still visible
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Subtle parallax effect on portfolio section
window.addEventListener('scroll', () => {
  const parallax = document.querySelector('.parallax');
  if (parallax) {
    let scrollPosition = window.pageYOffset;
    parallax.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  }
});

// Periodic logo pulse: after the initial LTG letter-reveal animation finishes,
// trigger a subtle pulse every 5 seconds.
(function() {
  const logo = document.querySelector('.logo');
  if (!logo) return;
  const spans = logo.querySelectorAll('span');
  if (!spans.length) return;
  const lastSpan = spans[spans.length - 1];

  const startPulseCycle = () => {
    const pulse = () => {
      logo.classList.add('logo-pulse');
      // remove class after animation duration (slightly longer than 800ms to be safe)
      setTimeout(() => logo.classList.remove('logo-pulse'), 900);
    };

    // first pulse 5s after initial reveal, then every 5s
    setTimeout(pulse, 5000);
    setInterval(pulse, 5000);
  };

  // Wait for the last span's reveal animation to finish, then start the cycle
  lastSpan.addEventListener('animationend', startPulseCycle, { once: true });
})();