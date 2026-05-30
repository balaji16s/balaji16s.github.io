/* ===== Balaji portfolio — shared behavior ===== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Floating nav hamburger ---------- */
  function initNav() {
    var nav = document.querySelector('[data-nav]');
    var btn = document.querySelector('[data-nav-toggle]');
    if (!nav || !btn) return;

    function toggle() {
      var open = nav.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', toggle);

    // Close when a link is tapped (mobile)
    nav.querySelectorAll('[data-nav-link]').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Hero typewriter ---------- */
  function initTypewriter() {
    var el = document.querySelector('[data-typewriter]');
    if (!el) return;

    var roles;
    try {
      roles = JSON.parse(el.getAttribute('data-typewriter'));
    } catch (err) {
      roles = [el.textContent.trim()];
    }
    if (!roles || !roles.length) return;

    // Reduced motion: show first role statically, no caret animation.
    if (reduceMotion) {
      el.textContent = roles[0];
      el.classList.remove('caret');
      return;
    }

    var roleIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var word = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          return setTimeout(tick, 1400); // hold full word
        }
        return setTimeout(tick, 90);
      } else {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          return setTimeout(tick, 250);
        }
        return setTimeout(tick, 45);
      }
    }
    tick();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initTypewriter();
    var year = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
  });
})();
