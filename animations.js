const Motion = (() => {
  function init() {
    document.querySelectorAll('.reveal:not([data-motion])').forEach(el => {
      el.dataset.motion = 'true';
      new IntersectionObserver(([entry], observer) => {
        if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); }
      }, { threshold: .12 }).observe(el);
    });
    document.querySelectorAll('.ripple:not([data-ripple])').forEach(el => {
      el.dataset.ripple = 'true';
      el.addEventListener('click', event => {
        const ripple = document.createElement('i'); ripple.className = 'ink';
        const box = el.getBoundingClientRect();
        ripple.style.cssText = `left:${event.clientX-box.left}px;top:${event.clientY-box.top}px`;
        el.append(ripple); setTimeout(() => ripple.remove(), 650);
      });
    });
  }
  return { init };
})();
