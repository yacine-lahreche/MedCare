
/* ---- Mobile menu toggle ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---- Navbar scroll shadow ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

/* ---- Scroll reveal ---- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

/* ---- Counter animation ---- */
const counters = document.querySelectorAll('[data-count]');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'), 10);
        const suffix = target >= 100 ? '+' : '+';
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;

        const tick = () => {
          current += step;
          if (current >= target) {
            counter.textContent = target.toLocaleString() + suffix;
            return;
          }
          counter.textContent = current.toLocaleString() + suffix;
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ---- Dark mode toggle ---- */
const darkToggle = document.getElementById('darkToggle');
const darkToggleMobile = document.getElementById('darkToggleMobile');
const darkIcon = document.getElementById('darkIcon');
const darkIconMobile = document.getElementById('darkIconMobile');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const iconClass = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
  darkIcon.className = iconClass;
  darkIconMobile.className = iconClass;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// Initialize from localStorage or system preference
const saved = localStorage.getItem('theme');
if (saved) {
  setTheme(saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
}

darkToggle.addEventListener('click', toggleTheme);
darkToggleMobile.addEventListener('click', toggleTheme);

/* ---- Testimonials Carousel ---- */
const testimonialsWrapper = document.getElementById('testimonialsWrapper');
const testimonialsTrack = document.getElementById('testimonialsTrack');

if (testimonialsWrapper && testimonialsTrack) {
  // First, multiply original cards within main track to ensure one track is wider than any screen
  const cards = Array.from(testimonialsTrack.children);
  // Add 2 more sets for a total of 18 cards per track (approx 6800px width for 6 cards)
  for (let i = 0; i < 2; i++) {
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.remove('reveal');
      clone.classList.add('visible');
      testimonialsTrack.appendChild(clone);
    });
  }

  // Clone the entire track for the seamless CSS transform scroll
  const trackClone = testimonialsTrack.cloneNode(true);
  trackClone.setAttribute('aria-hidden', 'true');
  // Make sure original cards inside track clone are also visible
  trackClone.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('reveal');
    el.classList.add('visible');
  });
  testimonialsWrapper.appendChild(trackClone);
}
