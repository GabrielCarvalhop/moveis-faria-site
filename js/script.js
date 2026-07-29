document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('topo');
  var mobileMenu = document.getElementById('mobile-menu');
  var menuToggleBtn = document.getElementById('menu-toggle-btn');
  var menuCloseBtn = document.getElementById('menu-close-btn');

  function updateHeaderState() {
    var scrolled = window.scrollY > 40;
    var menuOpen = mobileMenu.classList.contains('is-open');
    header.classList.toggle('is-active', scrolled || menuOpen);
  }

  function openMenu() {
    mobileMenu.classList.add('is-open');
    updateHeaderState();
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    updateHeaderState();
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
  document.querySelectorAll('#mobile-menu a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  // FAQ accordion — apenas um item aberto por vez
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-toggle');
    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('is-open');
      faqItems.forEach(function (i) { i.classList.remove('is-open'); });
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-revealed'); });
  }
});
