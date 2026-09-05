(function () {
  'use strict';

  var page = location.pathname.split('/').pop() || 'index.html';
  document.body.classList.add('mobile-polish-ready', 'page-' + page.replace('.html', ''));

  function textNodesContaining(text) {
    return Array.from(document.querySelectorAll('h1,h2,h3,h4,p,div,span,a,li')).filter(function (el) {
      var own = (el.textContent || '').trim().replace(/\s+/g, ' ');
      return own.indexOf(text) !== -1 && !Array.from(el.children).some(function (child) {
        return (child.textContent || '').trim().replace(/\s+/g, ' ').indexOf(text) !== -1;
      });
    });
  }

  function firstText(text) {
    return textNodesContaining(text)[0] || null;
  }

  function sectionFor(el) {
    if (!el) return null;
    return el.closest('section, article, main > div') || el.parentElement;
  }

  function compactAncestor(el, maxLength) {
    var p = el && el.parentElement;
    var limit = maxLength || 1200;
    while (p && p !== document.body) {
      if (((p.innerText || '').trim().length) <= limit) return p;
      p = p.parentElement;
    }
    return el && el.parentElement;
  }

  function enableMobileMenu() {
    var header = document.querySelector('header');
    if (!header || header.querySelector('.mp-mobile-menu')) return;
    var nav = header.querySelector('nav');
    if (!nav) return;
    var links = Array.from(nav.querySelectorAll('a[href]'));
    if (!links.length) return;

    var menu = document.createElement('details');
    menu.className = 'mp-mobile-menu';
    var summary = document.createElement('summary');
    summary.setAttribute('aria-label', 'Открыть меню');
    var panel = document.createElement('div');
    panel.className = 'mp-mobile-menu__panel';
    links.forEach(function (link) {
      var copy = link.cloneNode(true);
      copy.addEventListener('click', function () { menu.removeAttribute('open'); });
      panel.appendChild(copy);
    });
    menu.appendChild(summary);
    menu.appendChild(panel);
    header.appendChild(menu);
  }

  function individualFixes() {
    var hero = sectionFor(firstText('Индивидуальная терапия') || firstText('Индивидуальная'));
    if (hero) hero.classList.add('mp-hero');
    var query = sectionFor(firstText('С чем можно прийти'));
    if (query) query.classList.add('mp-query-section');
    Array.from(document.querySelectorAll('a[href]')).forEach(function (a) {
      if (/←|назад|все/i.test((a.textContent || '').trim())) a.classList.add('mp-back');
    });
  }

  function couplesFixes() {
    var continuation = firstText('Продолжение терапии');
    if (continuation) {
      var block = compactAncestor(continuation, 900);
      if (block) block.classList.add('mp-continuation');
    }
  }

  function groupFixes() {
    var hero = sectionFor(firstText('Открыт набор в новую группу'));
    var leadersTitle = firstText('На каждой встрече работают два терапевта');
    var leaders = sectionFor(leadersTitle);

    if (hero && leaders && hero !== leaders && window.matchMedia('(max-width: 767px)').matches) {
      hero.insertAdjacentElement('afterend', leaders);
    }
    if (leaders) leaders.classList.add('mp-group-leaders');

    var schedule = firstText('Старт');
    if (schedule && /24\s+сентябр/i.test(schedule.textContent || '')) {
      schedule.innerHTML = schedule.innerHTML.replace(/Старт\s*—?\s*24\s+сентября/i, '<span class="mp-group-date">Старт — 24 сентября</span>');
    }
  }

  function educationFixes() {
    var education = sectionFor(firstText('Образование'));
    if (!education) return;
    education.classList.add('mp-education');
    requestAnimationFrame(function () {
      Array.from(education.querySelectorAll('div,ul')).forEach(function (el) {
        if (el.scrollWidth > el.clientWidth + 30 && el.children.length > 1) el.classList.add('mp-scrollable');
      });
    });
  }

  function podcastFixes() {
    var imgs = Array.from(document.images);
    var awards = imgs.filter(function (img) {
      return /choice[-_]?2023|top[-_]?100[-_]?2023|выбор.*2023|топ.*100/i.test(img.src + ' ' + img.alt);
    });
    if (awards.length >= 2 && !document.querySelector('.mp-awards')) {
      var wrap = document.createElement('div');
      wrap.className = 'mp-awards';
      awards.slice(0, 2).forEach(function (img) {
        var clone = img.cloneNode(true);
        clone.className = 'mp-award-img';
        wrap.appendChild(clone);
        img.classList.add('mp-award-source');
      });
      var first = awards[0];
      var host = sectionFor(first) || first.parentElement;
      host.insertBefore(wrap, host.firstChild);
    }
    var reviews = sectionFor(firstText('Отзывы наших слушателей'));
    if (reviews) reviews.classList.add('mp-podcast-review-section');
  }

  function bookFixes() {
    var buy = Array.from(document.querySelectorAll('a,button')).find(function (el) {
      return /купить книгу/i.test((el.textContent || '').trim());
    });
    if (!buy) return;
    buy.classList.add('mp-book-buy');
    var intro = sectionFor(firstText('Две правды, один брак') || firstText('Чуть не развелись'));
    if (intro) {
      intro.classList.add('mp-book-intro');
      var image = Array.from(intro.querySelectorAll('img')).find(function (img) {
        return /book|книг/i.test(img.src + ' ' + img.alt);
      });
      if (image) image.classList.add('mp-book-image');
      intro.appendChild(buy);
    }
  }

  function webinarPriceFixes() {
    var price = firstText('3 900') || firstText('3900');
    if (!price) return;
    price.classList.add('mp-webinar-price');
    if (!price.querySelector('.mp-euro') && /40\s*€/i.test(price.textContent || '')) {
      price.innerHTML = price.innerHTML.replace(/(или\s*40\s*€)/i, '<span class="mp-euro">$1</span>');
    }
  }

  function psychologistsPromoFixes() {
    var promo = sectionFor(firstText('Поддерживающая группа для психологов'));
    if (!promo) return;
    promo.classList.add('mp-psychologists-promo');
    var sticker = Array.from(promo.querySelectorAll('*')).find(function (el) {
      return /^проект для психологов$/i.test((el.textContent || '').trim());
    });
    if (sticker) sticker.classList.add('mp-project-sticker');
  }

  function run() {
    enableMobileMenu();
    if (page === 'individual.html') individualFixes();
    if (page === 'couples.html') couplesFixes();
    if (page === 'group.html') groupFixes();
    if (page === 'index.html' || page === '') {
      educationFixes();
      webinarPriceFixes();
      psychologistsPromoFixes();
    }
    if (page === 'podcast.html') podcastFixes();
    if (page === 'book.html') bookFixes();
    if (page === 'webinar.html') webinarPriceFixes();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
}());
