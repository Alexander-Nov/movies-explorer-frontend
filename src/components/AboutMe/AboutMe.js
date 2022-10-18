import React from "react";
import { Link } from "react-router-dom";
import fotoLink from "../../images/aboutme-foto.jpg";
import Portfolio from "../Portfolio/Portfolio";

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
          <Link to="https://github.com/Alexander-Nov" className="about-me__github-link">Github</Link>
        </div>
        <img
          className="about-me__author-foto"
          src={fotoLink}
          alt="фотография создателя сайта"
        />
      </div>

      <Portfolio />

    </div>
  );
}

export default AboutMe;
