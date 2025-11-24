// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Optional: shrink nav on scroll (you already have this
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Subtle parallax on .parallax section
window.addEventListener('scroll', () => {
  const parallax = document.querySelector('.parallax');
  if (parallax) {
    let scrollPosition = window.pageYOffset;
    parallax.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  }
});

// Logo pulse after letter reveal (your beautiful code – untouched)
(function() {
  const logo = document.querySelector('.logo');
  if (!logo) return;
  const spans = logo.querySelectorAll('span');
  if (!spans.length) return;
  const lastSpan = spans[spans.length - 1];

  const startPulseCycle = () => {
    const pulse = () => {
      logo.classList.add('logo-pulse');
      setTimeout(() => logo.classList.remove('logo-pulse'), 900);
    };
    setTimeout(pulse, 5000);
    setInterval(pulse, 5000);
  };

  lastSpan.addEventListener('animationend', startPulseCycle, { once: true });
})();

// =======================================================
// UPDATED PORTFOLIO VIDEO PLAYER – NOW WORKS WITH VERTICAL REELS
// =======================================================
document.querySelectorAll('.portfolio-item-vertical').forEach(item => {
  const video = item.querySelector('video');
  const playBtn = item.querySelector('.play-button');

  item.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      item.classList.add('playing');
      video.controls = true;           // shows native controls after play
    } else {
      video.pause();
      video.controls = false;
      item.classList.remove('playing');
    }
  });

  // Clean up when video ends
  video.addEventListener('ended', () => {
    item.classList.remove('playing');
    video.controls = false;
  });
});

// Apply data-poster fallback: set container background from `data-poster` so
// a thumbnail appears even when the <video> poster isn't loaded on some hosts.
(function() {
  document.querySelectorAll('.portfolio-item-vertical').forEach(item => {
    const dp = item.dataset.poster;
    if (dp) {
      item.style.backgroundImage = `url(${dp})`;
    } else {
      // fallback: use inner video's poster attribute if present
      const v = item.querySelector('video');
      if (v && v.getAttribute('poster')) item.style.backgroundImage = `url(${v.getAttribute('poster')})`;
    }

    // Ensure background is hidden when playing (in addition to the CSS rule)
    const vid = item.querySelector('video');
    if (vid) {
      vid.addEventListener('play', () => { item.style.backgroundImage = 'none'; });
      vid.addEventListener('pause', () => {
        // only restore poster if video ended or paused at start
        if (vid.currentTime < 0.5) {
          const dp2 = item.dataset.poster || vid.getAttribute('poster');
          if (dp2) item.style.backgroundImage = `url(${dp2})`;
        }
      });
    }
  });
})();