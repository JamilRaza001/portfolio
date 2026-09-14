/** Progressive enhancement: readable content is never hidden while waiting for JS. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const running = new Set<Animation>();
function animate(element: Element, frames: Keyframe[], duration: number) {
  if (reducedMotion.matches || !element.animate) return;
  const animation = element.animate(frames, { duration, easing: 'cubic-bezier(.22,1,.36,1)' });
  running.add(animation);
  animation.finished.then(() => running.delete(animation), () => running.delete(animation));
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) { running.forEach(animation => animation.cancel()); running.clear(); }
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in-view');
      if (entry.target.matches('.project-artwork')) {
        animate(entry.target, [{ clipPath: 'inset(0 0 8% 0)', opacity: .65 }, { clipPath: 'inset(0)', opacity: 1 }], 850);
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: .16 });
  document.querySelectorAll('.section-heading,.project-artwork,.timeline article,.architecture-flow li').forEach(element => observer.observe(element));
  const caseLinks = [...document.querySelectorAll<HTMLAnchorElement>('.case-nav a')];
  const caseObserver = new IntersectionObserver(entries => {
    const current = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!current) return;
    caseLinks.forEach(link => {
      if (link.hash === `#${current.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('.case-prose>section,#walkthrough').forEach(section => caseObserver.observe(section));
}
// Animate the new results after the category handler has updated hidden states.
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  requestAnimationFrame(() => document.querySelectorAll('.project-card:not([hidden])').forEach(card => animate(card, [{ opacity: .55, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], 350)));
}));
