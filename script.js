/* ---- Phone Number Input Masking ---- */
const PHONE = '213XXXXXXXXX';
document.querySelectorAll('[data-phone-whatsapp]')
  .forEach(el => el.href = `https://wa.me/${PHONE}`);
document.querySelectorAll('[data-phone-call]')
  .forEach(el => el.href = `tel:${PHONE}`);

/* ---- Dark Mode Toggle ---- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('liquid_theme', theme);
  themeIcon.className = theme === 'dark' ? 'ph-fill ph-sun' : 'ph ph-moon';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

const saved = localStorage.getItem('liquid_theme');
if (saved) {
  setTheme(saved);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
}

themeToggle.addEventListener('click', toggleTheme);

/* ---- Seamless Infinite Scroll Carousel ---- */
const experiencesTrack = document.getElementById('experiencesTrack');
if (experiencesTrack) {
  const cards = Array.from(experiencesTrack.children);
  // Duplicate cards a few times to fill the track
  for(let i=0; i<3; i++) {
    cards.forEach(card => {
      experiencesTrack.appendChild(card.cloneNode(true));
    });
  }
  
  // Clone the entire track placing it side-by-side
  const trackClone = experiencesTrack.cloneNode(true);
  trackClone.setAttribute('aria-hidden', 'true');
  experiencesTrack.parentElement.appendChild(trackClone);
  
  // Update parent styling to ensure correct flex layout for tracks
  experiencesTrack.parentElement.style.display = 'flex';
  experiencesTrack.parentElement.style.gap = '24px';
}

/* ---- Sticky Navbar Shadow ---- */
const header = document.querySelector('.header-sticky');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ---- Scroll Reveal Animation ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); 
    } else {
      entry.target.classList.remove('visible'); // Makes the animation re-trigger when scrolling back up
    }
  });
}, { threshold: 0.15 });

// Dynamically add reveal class to important elements if they don't have it
const elementsToReveal = document.querySelectorAll('.hero-content, .hero-image-wrapper, .bento-card, .specialist-card, .visit-info-card, .visit-map');
elementsToReveal.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ---- Active Nav Link Updates ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

// Click logic to ensure instant feedback
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Handle both index.html#id and #id formats
        if (href === `#${currentId}` || href.endsWith(`#${currentId}`)) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-20% 0px -60% 0px', threshold: 0.15 }); 

sections.forEach(section => {
  scrollObserver.observe(section);
});
