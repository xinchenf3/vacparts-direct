// VacParts Direct - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {

  // ===== MOBILE MENU =====
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      if (isOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close menu when clicking a nav link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.innerHTML = '&#9776;';
        toggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.innerHTML = '&#9776;';
        toggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var wasOpen = item.classList.contains('open');

      // Close all other FAQs
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) openItem.classList.remove('open');
      });

      // Toggle current
      if (wasOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== ACTIVE NAV HIGHLIGHT =====
  var current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });

  // ===== FLOATING WHATSAPP BUTTON =====
  // Inject floating button into every page
  var floatingHTML = '<div class="floating-contact">'
    + '<span class="floating-contact-label">Chat on WhatsApp</span>'
    + '<a href="https://wa.me/8615625155368" class="floating-contact-btn" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">'
    + '<span class="pulse"></span>'
    + '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>'
    + '</a>'
    + '</div>';
  document.body.insertAdjacentHTML('beforeend', floatingHTML);

  // ===== CONTACT FORM =====
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#22c55e';
        form.reset();
        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }, 1000);
    });
  }

  // ===== HEADER SCROLL SHADOW =====
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
      }
    });
  }

  // ===== LANGUAGE SWITCHER =====
  var langBar = document.querySelector('.lang-bar');
  if (langBar) {
    langBar.addEventListener('click', function(e) {
      var link = e.target.closest('a[data-lang]');
      if (!link) return;
      e.preventDefault();

      var lang = link.getAttribute('data-lang');

      // Update active state
      langBar.querySelectorAll('a').forEach(function(a) { a.classList.remove('active'); });
      link.classList.add('active');

      if (lang === 'en') {
        // Show English, hide Arabic
        document.querySelectorAll('.lang-en').forEach(function(el) { el.classList.remove('hidden'); });
        document.querySelectorAll('.lang-ar').forEach(function(el) { el.classList.remove('visible'); });
      } else if (lang === 'ar') {
        // Show Arabic, hide English
        document.querySelectorAll('.lang-ar').forEach(function(el) { el.classList.add('visible'); });
        document.querySelectorAll('.lang-en').forEach(function(el) { el.classList.add('hidden'); });
      }
    });
  }
});
