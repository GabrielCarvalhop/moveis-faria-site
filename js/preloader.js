document.addEventListener('DOMContentLoaded', function () {
  var preloader = document.getElementById('preloader');
  if (!preloader) return;

  var heroEls = document.querySelectorAll('.hero-anim');

  function unlockScroll() {
    document.documentElement.classList.remove('is-loading');
  }

  function showSiteInstantly() {
    preloader.style.display = 'none';
    unlockScroll();
    heroEls.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || typeof gsap === 'undefined') {
    showSiteInstantly();
    return;
  }

  var paths = preloader.querySelectorAll('.pl-path');
  var finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(safety);
    tl.kill();
    showSiteInstantly();
  }

  // Nunca deixa a página travada: se algo impedir a animação de
  // terminar (fonte lenta, aba em segundo plano, etc.), força o fim.
  var safety = setTimeout(finish, 3800);

  try {
    paths.forEach(function (p) {
      var len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
  } catch (e) {
    finish();
    return;
  }

  gsap.set(heroEls, { opacity: 0, y: 24 });

  var tl = gsap.timeline({
    onComplete: function () {
      finished = true;
      clearTimeout(safety);
    },
  });

  tl.to(paths, {
    strokeDashoffset: 0,
    duration: 1.1,
    ease: 'power2.inOut',
    stagger: 0.16,
  })
    .to(
      paths,
      {
        fillOpacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.15'
    )
    .to({}, { duration: 0.4 }) // segura a logo completa por um instante
    .to(preloader, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: function () {
        preloader.style.display = 'none';
        unlockScroll();
      },
    })
    .to(
      heroEls,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
      },
      '-=0.35'
    );
});
