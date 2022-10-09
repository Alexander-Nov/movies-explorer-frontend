import React from "react";
import fotoLink from "../../images/aboutme-foto.jpg";

function AboutMe(props) {
  return (
    <div className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info-block">
        <div className="about-me__text-block">
          <h3 className="about-me__info-name">Александр</h3>
          <p className="about-me__info-prof">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__info-description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <p className="about-me__github-link">Github</p>
          <p className="about-me__portfolio-link">Портфолио</p>
        </div>
        <img
          className="about-me__author-foto"
          src={fotoLink}
          alt="фотография создателя сайта"
        />
      </div>
      <ul className="about-me__project-links">
        <li className="about-me__project-link">
          <p className="about-me__project-link-text">Статичный сайт</p>
          <a href="/" className="about-me__project-link-arrow">↗</a>
        </li>
        <li className="about-me__project-link">
          <p className="about-me__project-link-text">Адаптивный сайт</p>
          <a href="/" className="about-me__project-link-arrow">↗</a>
        </li>
        <li className="about-me__project-link">
          <p className="about-me__project-link-text">Одностраничное приложение</p>
          <a href="/" className="about-me__project-link-arrow">↗</a>
        </li>
      </ul>
    </div>
  );
}

export default AboutMe;
