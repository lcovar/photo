/* ============================================
   LC PHOTO — 90s Retro Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initStars();
  initCursorTrail();
  initNavToggle();
  initScrollTop();
  initHitCounter();
  initLightbox();
});

/* --- STAR BACKGROUND --- */
function initStars() {
  const container = document.querySelector('.stars');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  const count = 40;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    const size = Math.random() > 0.8 ? 3 : Math.random() > 0.5 ? 2 : 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    fragment.appendChild(star);
  }

  container.appendChild(fragment);
}

/* --- CURSOR TRAIL --- */
function initCursorTrail() {
  if (window.innerWidth < 768) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const colors = ['#00ff41', '#ff2a00', '#ffd700', '#00e5ff', '#ff69b4'];
  let lastTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 60) return;
    lastTime = now;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(dot);

    setTimeout(() => {
      dot.style.opacity = '0';
      setTimeout(() => dot.remove(), 400);
    }, 150);
  }, { passive: true });
}

/* --- MOBILE NAV TOGGLE --- */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.textContent = isOpen ? '[X]' : '[=]';
  });
}

/* --- SCROLL TO TOP --- */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- FAKE HIT COUNTER --- */
function initHitCounter() {
  const counter = document.querySelector('.hit-counter');
  if (!counter) return;
  const base = 4827;
  const days = Math.floor((Date.now() - new Date('2024-01-01').getTime()) / 86400000);
  const hits = base + days * 3 + Math.floor(Math.random() * 5);
  counter.textContent = String(hits).padStart(7, '0');
}

/* --- LOADING SCREEN --- */
function initLoadingScreen() {
  const screen = document.querySelector('.loading-screen');
  if (!screen) return;

  setTimeout(() => {
    screen.classList.add('fade-out');
    setTimeout(() => screen.remove(), 400);
  }, 1000);
}

/* --- LIGHTBOX --- */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector('img');
  if (!lightboxImg) return;

  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  gallery.addEventListener('click', (e) => {
    const img = e.target.closest('.gallery-item img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });
}
