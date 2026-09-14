/** Non-modal navigation disclosure; plain links remain available without JavaScript. */
export {};
const header = document.querySelector<HTMLElement>('.site-header');
const toggle = header?.querySelector<HTMLButtonElement>('.menu-toggle');
const menu = header?.querySelector<HTMLElement>('.site-menu');
if (header && toggle && menu) {
  const compact = matchMedia('(max-width: 800px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const label = toggle.querySelector<HTMLElement>('[data-menu-label]')!;
  let open = false;
  let animation: Animation | undefined;
  const setOpen = (next: boolean, play = true) => {
    open = compact.matches && next;
    animation?.cancel();
    animation = undefined;
    if (compact.matches && !open && menu.contains(document.activeElement)) toggle.focus({preventScroll:true});
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation');
    label.textContent = open ? 'Close' : 'Menu';
    menu.hidden = false;
    menu.inert = compact.matches && !open;
    if (!compact.matches || reduced.matches || !play) {
      menu.hidden = compact.matches && !open;
      return;
    }
    const concealed = {opacity:0,transform:'translateY(-8px)'};
    const revealed = {opacity:1,transform:'translateY(0)'};
    const current = menu.animate(open ? [concealed,revealed] : [revealed,concealed],{
      duration:open ? 240 : 160,easing:'cubic-bezier(.22,1,.36,1)',fill:'both',
    });
    animation = current;
    current.finished.then(() => {
      if (animation !== current) return;
      menu.hidden = compact.matches && !open;
      current.cancel();
      animation = undefined;
    },() => {});
  };
  const updateViewport = () => {
    const toggleFocused = document.activeElement === toggle;
    toggle.hidden = !compact.matches;
    setOpen(false,false);
    if (!compact.matches && toggleFocused) menu.querySelector<HTMLAnchorElement>('a')?.focus({preventScroll:true});
  };
  header.dataset.navEnhanced = 'true';
  updateViewport();
  toggle.addEventListener('click',() => setOpen(!open));
  menu.addEventListener('click',event => {
    if (open && event.target instanceof Element && event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown',event => {
    if (open && event.key === 'Escape') {
      event.preventDefault();
      toggle.focus({preventScroll:true});
      setOpen(false);
    }
  });
  document.addEventListener('pointerdown',event => {
    if (open && event.target instanceof Node && !header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('focusin',event => {
    if (open && event.target instanceof Node && !header.contains(event.target)) setOpen(false);
  });
  compact.addEventListener('change',updateViewport);
  reduced.addEventListener('change',() => setOpen(open,false));
}
