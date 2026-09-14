/** Finite type reveals and transient multicolor light. Resting UI stays neutral. */
export {};
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const running = new Set<Animation>();
const neon = document.documentElement.dataset.theme === 'black-studio';
const colors = ['#8CF5C6', '#C5A0FF', '#FF9FCB'];
const selectors = '.hero-personal h1, .hero-description, .background-heading h2, #work-title, .skills-heading h2, .career-intro h2, .career-company, .contact h2';
const reveal = (element: HTMLElement) => {
  if (reduced.matches) return;
  element.querySelectorAll<HTMLElement>('.text-glyph').forEach((word, index) => {
    const animation = word.animate([
      { transform: 'translateY(105%) rotate(2deg)', opacity: .15, textShadow: '0 0 0 transparent' },
      { offset: .4, opacity: 1, textShadow: neon ? `0 0 12px ${colors[index%colors.length]}80` : 'none' },
      { transform: 'translateY(0) rotate(0deg)', opacity: 1, textShadow: '0 0 0 transparent' },
    ], { duration: 850, delay: Math.min(index*38,380), easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    running.add(animation);
    animation.finished.then(() => running.delete(animation), () => running.delete(animation));
  });
};
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      reveal(entry.target as HTMLElement);
      observer.unobserve(entry.target);
    });
  }, { threshold: .35 });
  document.querySelectorAll<HTMLElement>(selectors).forEach(element => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      (node.textContent || '').split(/(\s+)/).forEach(token => {
        if (!token.trim()) { fragment.append(document.createTextNode(token)); return; }
        const mask = document.createElement('span');
        mask.className = 'text-mask';
        const glyph = document.createElement('span');
        glyph.className = 'text-glyph'; glyph.textContent = token;
        mask.append(glyph); fragment.append(mask);
      });
      node.replaceWith(fragment);
    });
    element.dataset.textReady = 'true';
    observer.observe(element);
  });
}
const pulses = new WeakMap<Element, Animation>();
function pulse(element: Element, frames: Keyframe[]) {
  if (reduced.matches || !neon) return;
  pulses.get(element)?.cancel();
  const animation = element.animate(frames, {duration:1100,easing:'ease-out'});
  pulses.set(element,animation); running.add(animation);
  animation.finished.then(() => running.delete(animation), () => running.delete(animation));
}
// Feedback is finite even while a pointer remains over a control. No fill persists.
document.querySelectorAll<HTMLElement>('.button, .role-card, [data-panel-choice], [data-contact-intent]').forEach(control => {
  const feedback = () => {
    const resting = getComputedStyle(control).boxShadow;
    pulse(control, [
      {boxShadow:resting},
      {offset:.25,boxShadow:'0 0 18px #8CF5C638'},
      {offset:.55,boxShadow:'0 0 20px #C5A0FF38'},
      {offset:.8,boxShadow:'0 0 12px #FF9FCB28'},
      {boxShadow:resting},
    ]);
  };
  control.addEventListener('pointerenter',feedback);
  control.addEventListener('focus',feedback);
  control.addEventListener('click',feedback);
});
const portrait = document.querySelector<HTMLElement>('.portrait-frame');
if (portrait && neon) {
  const light = document.createElement('span');
  light.className = 'portrait-motion-light'; light.setAttribute('aria-hidden','true');
  portrait.append(light);
  portrait.addEventListener('pointerenter', () => pulse(light,[{opacity:0},{offset:.35,opacity:.8},{opacity:0}]));
}
reduced.addEventListener('change', () => {
  if (reduced.matches) {
    running.forEach(animation => animation.cancel()); running.clear();
  }
});
