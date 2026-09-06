(function () {
  const page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  document.body.classList.add('page-' + page);

  const norm = el => (el && el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const all = sel => Array.from(document.querySelectorAll(sel));
  const closestSection = el => el && (el.closest('section') || el.parentElement);

  /* Mobile menu keeps the brand and booking action visible. */
  const header = document.querySelector('header');
  if (header && !header.querySelector('.mobile-menu-toggle')) {
    document.body.classList.add('mobile-menu-ready');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-menu-toggle';
    button.setAttribute('aria-label', 'Открыть меню');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span></span>';
    button.addEventListener('click', () => {
      const open = document.body.classList.toggle('mobile-menu-open');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });
    header.appendChild(button);
  }

  /* Tag content-driven components without rewriting any final copy. */
  all('h1,h2,h3,p,a,button,div,span').forEach(el => {
    const t = norm(el);
    if (t === 'продолжение терапии') (el.parentElement || el).classList.add('mobile-process-continuation');
    if (/3\s*900/.test(t) && (t.includes('₽') || t.includes('руб'))) (el.closest('div') || el).classList.add('mobile-price');
  });

  if (page === 'group') {
    const maria = all('h2,h3,a,p').find(el => norm(el).includes('мария иванова'));
    const natalia = all('h2,h3,a,p').find(el => norm(el).includes('наталья наконечная'));
    if (maria && natalia) {
      const common = [maria, natalia].map(closestSection).find(s => s && s.contains(maria) && s.contains(natalia));
      if (common) common.classList.add('mobile-leaders');
    }
    all('p').forEach(p => {
      if (norm(p).includes('старт') && norm(p).includes('24') && norm(p).includes('сентябр')) {
        p.innerHTML = p.innerHTML.replace(/Старт\s*[—–-]?\s*24\s*сентября/i, '<br><strong>Старт — 24 сентября</strong>');
      }
    });
  }

  if (page === 'podcast') {
    const awardImgs = all('img').filter(img => /choice|top-100|award|редакц|яндекс/i.test((img.src || '') + ' ' + (img.alt || '')));
    if (awardImgs.length) {
      const parent = awardImgs[0].parentElement;
      if (parent && awardImgs.every(img => parent.contains(img))) parent.classList.add('mobile-awards');
    }
    const reviewsTitle = all('h1,h2,h3').find(el => norm(el).includes('отзывы наших слушателей'));
    const collabTitle = all('h1,h2,h3').find(el => norm(el).includes('для сотрудничества'));
    if (reviewsTitle) closestSection(reviewsTitle)?.classList.add('mobile-reviews');
    if (collabTitle) closestSection(collabTitle)?.classList.add('mobile-collaboration');
  }

  if (page === 'book') {
    const title = all('h1,h2').find(el => norm(el).includes('чуть не развелись'));
    const hero = closestSection(title);
    if (hero) {
      hero.classList.add('mobile-book-hero');
      title?.classList.add('mobile-book-title');
      const img = hero.querySelector('img');
      img?.parentElement?.classList.add('mobile-book-image');
      const cta = all('a,button').find(el => hero.contains(el) && norm(el).includes('купить книгу'));
      cta?.classList.add('mobile-book-cta');
      all('p').filter(el => hero.contains(el)).forEach(el => el.classList.add('mobile-book-copy'));
    }
  }

  if (page === 'index') {
    const projectTitle = all('h1,h2,h3').find(el => norm(el).includes('психолог в блоге'));
    closestSection(projectTitle)?.classList.add('mobile-project-card');
  }
})();
