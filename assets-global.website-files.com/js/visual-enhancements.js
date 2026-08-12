(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('[data-w-id], .card, .section > .container-default > *');

  revealTargets.forEach((element, index) => {
    if (!element.classList.contains('hero-bg-image-wrapper')) element.classList.add('reveal');
    element.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  });

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }

  if (!reduceMotion) {
    const hero = document.querySelector('.top-bg-image');
    if (hero) {
      hero.addEventListener('pointermove', (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;
        hero.style.setProperty('--pointer-x', `${x}px`);
        hero.style.setProperty('--pointer-y', `${y}px`);
        const image = hero.querySelector('.hero-bg-image-wrapper');
        if (image) image.style.transform = `translate3d(var(--pointer-x), var(--pointer-y), 0)`;
      }, { passive: true });
    }
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) link.classList.add('w--current');
  });
})();
