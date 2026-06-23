// VacParts Direct - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile Menu Toggle ---
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('open');
    });
  });

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Active Nav Highlight ---
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });

  // --- Contact Form (demo) ---
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#22c55e';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }, 1000);
    });
  }
});
