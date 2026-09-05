/* ===== Balaji portfolio — shared behavior ===== */
(function () {
  'use strict';

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

  /* ---------- Highlight the current portfolio page ---------- */
  function initPageNav() {
    var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('[data-nav-path]').forEach(function (link) {
      var active = link.getAttribute('data-nav-path') === currentPath;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  /* ---------- Keep the one-page navigation in sync with scroll ---------- */
  function initSectionNav() {
    var sections = document.querySelectorAll('[data-page-section]');
    var links = document.querySelectorAll('[data-nav-link]');
    if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

    function markActive(id) {
      links.forEach(function (link) {
        var active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markActive(entry.target.id);
      });
    }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
    markActive((window.location.hash || '#home').slice(1));
  }

  /* ---------- Persistent light / dark theme toggle ---------- */
  function initTheme() {
    var root = document.documentElement;
    var button = document.querySelector('[data-theme-toggle]');
    if (!button) return;

    var storedTheme = null;
    try { storedTheme = window.localStorage.getItem('portfolio-theme'); } catch (err) {}
    if (storedTheme === 'light' || storedTheme === 'dark') {
      root.setAttribute('data-theme', storedTheme);
    } else {
      root.setAttribute('data-theme', 'light');
    }

    function currentTheme() {
      var explicitTheme = root.getAttribute('data-theme');
      return explicitTheme || 'light';
    }

    function updateLabel() {
      var activeTheme = currentTheme();
      var nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      var label = 'Switch to ' + nextTheme + ' mode';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
        meta.setAttribute('content', activeTheme === 'dark' ? '#151214' : '#faf9f6');
      });
    }

    button.addEventListener('click', function () {
      var nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      try { window.localStorage.setItem('portfolio-theme', nextTheme); } catch (err) {}
      updateLabel();
    });

    updateLabel();
  }

  /* ---------- Professional / personal portfolio views ---------- */
  function initPortfolioView() {
    var buttons = document.querySelectorAll('[data-view-toggle]');
    var panels = document.querySelectorAll('[data-view-panel]');
    var navItems = document.querySelectorAll('[data-view-nav]');
    if (!buttons.length || !panels.length) return;

    function setView(view, moveToTop) {
      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-view-panel') !== view;
      });
      navItems.forEach(function (item) {
        item.hidden = item.getAttribute('data-view-nav') !== view;
      });
      buttons.forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-view-toggle') === view ? 'true' : 'false');
      });

      try { window.localStorage.setItem('portfolio-view', view); } catch (err) {}

      if (moveToTop) {
        window.history.replaceState(null, '', '#home');
        document.getElementById('home').scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
      }
    }

    var storedView = null;
    try { storedView = window.localStorage.getItem('portfolio-view'); } catch (err) {}
    setView(storedView === 'personal' ? 'personal' : 'professional', false);

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        setView(button.getAttribute('data-view-toggle'), true);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initPageNav();
    initTheme();
    initPortfolioView();
    initSectionNav();
    var year = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
  });
})();
