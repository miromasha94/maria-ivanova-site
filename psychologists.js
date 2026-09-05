document.addEventListener('DOMContentLoaded',()=>{
  const fitHeading=document.querySelector('.psychologists-fit h2 em');
  if(fitHeading) fitHeading.textContent='если вам это знакомо';
  const signupTitle=document.querySelector('.psychologists-signup h2');
  if(signupTitle) signupTitle.innerHTML='С 23 октября<br><em>по 18 декабря</em>';
  const program=document.querySelector('.psychologists-weeks');
  if(program) program.innerHTML=`
    <article class="psychologists-week"><span>01</span><div><h3>Идентификация и границы</h3><p>Разбираемся со страхом оценки и определяем, о чём вы как специалист. Исследуем ваши темы в блоге, для кого вы, границу между искренностью и «обнажёнкой», этику в контенте.</p><p><b>Результат:</b> понятное позиционирование и меньше тревоги о том, «что скажут коллеги или родственники».</p></div></article>
    <article class="psychologists-week"><span>02</span><div><h3>Упаковка профиля и смысловые хайлайты</h3><p>Собираем профиль так, чтобы клиент понимал, кто вы, как работаете и как к вам записаться, за несколько секунд. Проектируем путь от просмотра контента до записи на консультацию.</p><p><b>Результат:</b> готовая структура профиля и понятная простая воронка записи.</p></div></article>
    <article class="psychologists-week"><span>03</span><div><h3>Форматы и контент без надрыва</h3><p>Учимся говорить о профессиональном живым языком, ищем комфортный стиль, разбираем карусели, Reels и работу с ИИ. Собираем реалистичный контент-план из вашего текущего ресурса.</p><p><b>Результат:</b> первые готовые материалы и понятная связка форматов.</p></div></article>
    <article class="psychologists-week"><span>04</span><div><h3>Продвижение и клиенты</h3><p>Обсуждаем алгоритмы Instagram, этичное продвижение и продажи. Собираем стратегию привлечения своей аудитории и записи на консультации.</p><p><b>Результат:</b> план действий на ближайший месяц.</p></div></article>
    <article class="psychologists-week"><span>05</span><div><h3>Собираем всё в единую систему</h3><p>Соединяем позиционирование, профиль, контент, продвижение и путь клиента в работающую систему блога.</p><p><b>Результат:</b> целостная стратегия, на которую можно опираться дальше.</p></div></article>
    <article class="psychologists-week"><span>06–07</span><div><h3>Реализация с поддержкой</h3><p>Воплощаем планы: публикуем контент, дорабатываем профиль, тестируем форматы и разбираем возникающие сложности вместе с группой и со мной.</p><p><b>Результат:</b> не просто идеи, а первые сделанные шаги и поддержка в процессе.</p></div></article>
    <article class="psychologists-week"><span>08</span><div><h3>Итоги и следующий этап</h3><p>Подводим итоги, фиксируем работающие решения, собираем контент-план и систему ведения блога, которую вы сможете поддерживать дальше.</p><p><b>Результат:</b> выстроенный блог, контент-план и понимание, как продолжать проявляться и набирать клиентов.</p></div></article>`;
  const carousel=document.querySelector('.psychologists-carousel');
  if(!carousel)return;
  document.querySelectorAll('[data-carousel-direction]').forEach(button=>button.addEventListener('click',()=>{
    const card=carousel.querySelector('figure');
    const gap=parseFloat(getComputedStyle(carousel).gap)||0;
    const step=(card?.getBoundingClientRect().width||300)+gap;
    carousel.scrollBy({left:step*Number(button.dataset.carouselDirection),behavior:'smooth'});
  }));
});
