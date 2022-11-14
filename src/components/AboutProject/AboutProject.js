import React from 'react';

function AboutProject (props)  {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__info-list">
        <li className="about-project__info-item">
          <h4 className="about-project__info-title">Дипломный проект включал 5 этапов</h4>
          <p className="about-project__info-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__info-item">
          <h4 className="about-project__info-title">На выполнение диплома ушло 5 недель</h4>
          <p className="about-project__info-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="about-project__data-list">
        <li className="about-project__data-item about-project__data-item_theme_blue">1 неделя</li>
        <li className="about-project__data-item about-project__data-item_theme_grey">4 недели</li>
        <li className="about-project__data-item">Back-end</li>
        <li className="about-project__data-item">Front-end</li>
      </ul>

    </section>
  );
}

export default AboutProject;
