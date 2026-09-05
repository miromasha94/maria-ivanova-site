const webinarProgram = document.querySelector('.webinar-program');
if (webinarProgram) webinarProgram.id = 'program';

document.querySelectorAll('.webinar-hero-actions .button, .webinar-final .button').forEach(button => {
  button.href = 'https://t.me/ivanovamashuu/2713';
  button.innerHTML = button.innerHTML.replace('3 900 ₽', '3 900 ₽ или 40 €');
});

// Короткая, легко сканируемая программа — без изменения смысла вебинара.
const webinarProgramCards = [...document.querySelectorAll('.webinar-program .program-card')];
const webinarProgramContent = [
  {
    intro: 'Конфликт — естественная часть близости. Важно не потерять контакт внутри него.',
    points: ['Почему ссор боятся.', 'Какие мифы усиливают тревогу.', 'Как сохранять контакт в разногласиях.']
  },
  {
    intro: 'Привязанность помогает понять, почему в конфликте один давит, а другой закрывается.',
    points: ['Потребность в любви и безопасности.', 'Цикл «давлю — закрываюсь».', 'Злость и чувства за ней.', 'Как перестать бороться друг с другом.']
  },
  {
    intro: 'Практические опоры, которые помогают замечать цикл и возвращаться к разговору.',
    points: ['Как заметить начало ссоры.', 'Вопросы себе и партнёру.', 'Как говорить о чувствах и потребностях.', '«Я-сообщения» как способ остаться в контакте.']
  }
];
webinarProgramCards.forEach((card, index) => {
  const content = webinarProgramContent[index];
  if (!content) return;
  const intro = card.querySelector('h3 + p');
  const list = card.querySelector('ul');
  if (intro) intro.textContent = content.intro;
  if (list) list.innerHTML = content.points.map(point => `<li>${point}</li>`).join('');
});

const webinarSections = [...document.querySelectorAll('main>.section')];
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('has-webinar-reveal');
  webinarSections.forEach(section => section.dataset.webinarReveal = '');
  const webinarObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      webinarObserver.unobserve(entry.target);
    }
  }), { threshold: .12 });
  webinarSections.forEach(section => webinarObserver.observe(section));
}
