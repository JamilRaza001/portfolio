/** Stateful UI for skill exploration, career chapters and contact intent. */
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
const transitions = new Set<Animation>();
function transition(element: Element, frames: Keyframe[], duration = 500) {
  if (preference.matches) return;
  const animation = element.animate(frames, { duration, easing: 'cubic-bezier(.16,1,.3,1)' });
  transitions.add(animation);
  animation.finished.then(() => transitions.delete(animation), () => transitions.delete(animation));
}
preference.addEventListener('change', () => {
  if (preference.matches) { transitions.forEach(animation => animation.cancel()); transitions.clear(); }
  requestTick();
});

document.querySelectorAll<HTMLElement>('[data-panel-group]').forEach(group => {
  const tabs = group.querySelector<HTMLElement>('[data-panel-tabs]')!;
  const buttons = [...tabs.querySelectorAll<HTMLButtonElement>('[data-panel-choice]')];
  const panels = [...group.querySelectorAll<HTMLElement>('[data-panel]')];
  let current = 0;
  const indicator = document.createElement('span');
  indicator.className = 'selection-indicator';
  indicator.setAttribute('aria-hidden','true');
  tabs.append(indicator);
  const placeIndicator = () => {
    const button = buttons[current];
    indicator.style.width = `${button.offsetWidth}px`;
    indicator.style.height = `${button.offsetHeight}px`;
    indicator.style.transform = `translate(${button.offsetLeft}px,${button.offsetTop}px)`;
  };
  new ResizeObserver(placeIndicator).observe(tabs);
  tabs.setAttribute('role', 'tablist');
  const updateOrientation = () => tabs.setAttribute('aria-orientation', getComputedStyle(tabs).flexDirection === 'column' ? 'vertical' : 'horizontal');
  updateOrientation();
  window.addEventListener('resize', updateOrientation, { passive: true });
  buttons.forEach((button,index) => {
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', button.id);
    panels[index].tabIndex = 0;
  });
  const select = (index: number, play = true) => {
    const direction = index >= current ? 1 : -1;
    panels.forEach((panel,i) => { panel.hidden = i !== index; });
    buttons.forEach((button,i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    if (play && index !== current) {
      transitions.forEach(animation => { if ((animation.effect as KeyframeEffect)?.target === panels[index]) animation.cancel(); });
      transition(panels[index], [{ opacity: .3, transform: `translateX(${direction*36}px) scale(.98)` }, { opacity: 1, transform: 'translateX(0) scale(1)' }]);
      panels[index].querySelectorAll('.skill-tools li').forEach((tool,i) => transition(tool, [{ transform: `translateY(${16+i*5}px)`, opacity: .2 }, { transform: 'translateY(0)', opacity: 1 }], 450+i*60));
    }
    current = index;
    placeIndicator();
  };
  buttons.forEach((button,index) => {
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', event => {
      let next = index;
      if (['ArrowRight','ArrowDown'].includes(event.key)) next = (index+1)%buttons.length;
      else if (['ArrowLeft','ArrowUp'].includes(event.key)) next = (index-1+buttons.length)%buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length-1;
      else return;
      event.preventDefault(); select(next); buttons[next].focus();
    });
  });
  select(0,false); tabs.hidden = false; group.dataset.enhanced = 'true';
  placeIndicator();
  const hint = group.querySelector<HTMLElement>('[data-panel-hint]'); if (hint) hint.hidden = false;
  if (group.dataset.panelGroup === 'career') {
    const followHash = () => {
      const index = panels.findIndex(panel => `#${panel.id}` === location.hash);
      if (index >= 0) select(index,false);
    };
    document.querySelectorAll<HTMLAnchorElement>('[data-career-link]').forEach(link => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const index = panels.findIndex(panel => `#${panel.id}` === link.hash);
      if (index >= 0) select(index);
    }));
    addEventListener('hashchange',followHash);
    followHash();
  }
});

const email = document.querySelector<HTMLAnchorElement>('.email-link');
const intentButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-contact-intent]')];
const intentCopy = document.querySelector<HTMLElement>('[data-intent-copy]');
const intents: Record<string,{subject:string;body:string;description:string}> = {
  project: {subject:'Project collaboration',body:'Hi Jamil,\n\nI am building: \nI need help with: \nTimeline: \n\n',description:'Tell me about the product or workflow, what you need help with, and your timeline.'},
  role: {subject:'AI and data engineering opportunity',body:'Hi Jamil,\n\nCompany: \nRole: \nLocation / remote setup: \n\n',description:'Share the role, team and working arrangement. I am open to remote opportunities and relocation.'},
  hello: {subject:'Hello Jamil',body:'Hi Jamil,\n\n',description:'A question, an idea or a conversation about engineering. My inbox is open.'},
};
if (email && intentCopy && intentButtons.length) {
  document.querySelector<HTMLElement>('.contact-intents')!.hidden = false;
  intentButtons.forEach(button => button.addEventListener('click', () => {
    const intent = intents[button.dataset.contactIntent || 'hello'];
    email.href = `mailto:jamilraza001@gmail.com?subject=${encodeURIComponent(intent.subject)}&body=${encodeURIComponent(intent.body)}`;
    intentButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    intentCopy.textContent = intent.description;
    transition(intentCopy,[{opacity:.3,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],350);
  }));
}

// One frame per scroll event, no permanent animation loop and no scroll interception.
const hero = document.querySelector<HTMLElement>('.hero-personal');
const work = document.querySelector<HTMLElement>('.work-story');
const scenes = [...document.querySelectorAll<HTMLElement>('[data-work-scene]')];
const workLinks = [...document.querySelectorAll<HTMLAnchorElement>('.work-chapters a')];
const statement = document.querySelector<HTMLElement>('.about-statement');
const header = document.querySelector<HTMLElement>('.site-header');
// Reserve real measured copy height before allocating space to the project image.
// A short viewport gets a smaller image, never a clipped title or internal scrollbar.
function fitWorkCards() {
  scenes.forEach(scene => {
    const copy = scene.querySelector<HTMLElement>('.project-card-copy')!;
    const top = 118 + Number(scene.style.getPropertyValue('--scene-index'))*10;
    const style = getComputedStyle(scene);
    const frame = parseFloat(style.paddingTop)+parseFloat(style.paddingBottom)+2;
    const available = innerHeight-top-24-frame-copy.offsetHeight;
    scene.style.setProperty('--work-image-height', `${Math.max(100,Math.min(innerHeight*.46,available))}px`);
    scene.classList.toggle('work-scene-unpinned', innerWidth > 800 && available < 100);
  });
}
if (scenes.length) {
  const fitObserver = new ResizeObserver(fitWorkCards);
  scenes.forEach(scene => fitObserver.observe(scene.querySelector('.project-card-copy')!));
  document.fonts.ready.then(fitWorkCards);
  addEventListener('resize',fitWorkCards,{passive:true});
  fitWorkCards();
}
let scheduled = false;
const clamp = (n: number) => Math.min(1,Math.max(0,n));
function drawScroll() {
  scheduled = false;
  header?.classList.toggle('header-scrolled', scrollY > 40);
  document.documentElement.style.setProperty('--reading-progress',String(clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))));
  if (hero) {
    const progress = clamp(-hero.getBoundingClientRect().top/hero.offsetHeight);
    hero.style.setProperty('--hero-travel',preference.matches ? '0px' : `${progress*65}px`);
    hero.style.setProperty('--hero-turn',preference.matches ? '0deg' : `${progress*-3}deg`);
  }
  if (work && scenes.length) {
    const rect = work.getBoundingClientRect();
    work.style.setProperty('--work-progress',String(clamp((innerHeight*.3-rect.top)/Math.max(1,rect.height-innerHeight*.5))));
    let active = 0;
    scenes.forEach((scene,index) => {
      const top = scene.getBoundingClientRect().top;
      if (top < innerHeight*.55) active = index;
      const progress = clamp((innerHeight-top)/(innerHeight+scene.offsetHeight));
      scene.style.setProperty('--cover-scale',preference.matches ? '1' : String(1.12-progress*.12));
    });
    scenes.forEach((scene,index) => scene.classList.toggle('work-scene-active',index === active));
    workLinks.forEach((link,index) => {
      if (index === active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
  }
  if (statement) {
    const rect = statement.getBoundingClientRect();
    const progress = clamp((innerHeight*.85-rect.top)/(innerHeight*.65));
    statement.querySelectorAll<HTMLElement>('span').forEach((span,index) => span.style.setProperty('--word-progress',String(preference.matches ? 1 : clamp(progress*3-index*.65))));
  }
}
function requestTick() { if (!scheduled) { scheduled = true; requestAnimationFrame(drawScroll); } }
addEventListener('scroll',requestTick,{passive:true});
addEventListener('resize',requestTick,{passive:true});
requestTick();
