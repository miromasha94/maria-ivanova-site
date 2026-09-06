(function () {
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  function textOf(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); }

  function setupHeader() {
    const header = document.querySelector('header, .site-header, .header');
    if (!header || header.dataset.mobileReady) return;
    const nav = header.querySelector('nav, .nav-links, .header-links, .menu-links');
    if (!nav) return;
    const button = document.createElement('button');
    button.className = 'mobile-menu-toggle';
    button.type = 'button';
    button.setAttribute('aria-label', 'Открыть меню');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span aria-hidden="true">☰</span>';
    header.appendChild(button);
    button.addEventListener('click', () => {
      const open = header.classList.toggle('mobile-menu-open');
      button.setAttribute('aria-expanded', String(open));
      button.innerHTML = '<span aria-hidden="true">' + (open ? '×' : '☰') + '</span>';
    });
    header.dataset.mobileReady = 'true';
  }

  function fixGroupSchedule() {
    document.querySelectorAll('p, div').forEach((el) => {
      if (el.children.length) return;
      const t = textOf(el);
      if (/Старт\s*[-—]?\s*24\s+сентября\s+2026/i.test(t)) {
        el.innerHTML = el.innerHTML.replace(/Старт\s*[-—]?\s*24\s+сентября\s+2026\s+года\.?/i,
          '<span style="white-space:nowrap">Старт — 24 сентября 2026 года</span>');
      }
    });
  }

  function markPages() {
    const path = location.pathname.toLowerCase();
    if (path.endsWith('/individual.html')) document.body.classList.add('individual-page');
    if (path.endsWith('/couples.html')) document.body.classList.add('couples-page');
    if (path.endsWith('/group.html')) document.body.classList.add('group-page');
  }

  function init() {
    markPages();
    setupHeader();
    fixGroupSchedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
