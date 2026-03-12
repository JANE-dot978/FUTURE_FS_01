
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.8)';
    cursorFollower.style.borderColor = 'rgba(245,166,35,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.borderColor = 'rgba(245,166,35,0.4)';
  });
});
const themeBtn = document.getElementById('themeBtn');
const themeIcon = themeBtn.querySelector('.theme-icon');
let isDark = true;
if (localStorage.getItem('theme') === 'light') {
  isDark = false;
  document.body.classList.add('light');
  themeIcon.textContent = '🌙';
}
themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('light');
  themeIcon.textContent = isDark ? '☀' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.padding = window.scrollY > 50 ? '12px 0' : '18px 0';
});
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); }
    else { el.textContent = Math.floor(start); }
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => animateCounter(el, parseInt(el.dataset.target)));
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 80);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);
const contactForm = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('.btn-text');
    btnText.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        feedback.textContent = '✓ Message sent! I\'ll get back to you shortly.';
        feedback.className = 'form-feedback success';
        contactForm.reset();
      } else { throw new Error('error'); }
    } catch {
      feedback.textContent = '✗ Something went wrong. Email me at gathujane97@gmail.com';
      feedback.className = 'form-feedback error';
    }
    feedback.classList.remove('hidden');
    btnText.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => feedback.classList.add('hidden'), 6000);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});



