import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__project-links">
        <li className="portfolio__project-link-item">
          <a href="https://alexander-nov.github.io/how-to-learn/" className="portfolio__project-link" target="_blanc">
            <p className="portfolio__project-link-text">Статичный сайт</p>
            <span className="portfolio__project-link-arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__project-link-item">
          <a href="https://alexander-nov.github.io/russian-travel/index.html" className="portfolio__project-link" target="_blanc">
            <p className="portfolio__project-link-text">Адаптивный сайт</p>
            <span className="portfolio__project-link-arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__project-link-item">
          <a href="https://novoselov.nomorepartiesxyz.ru/" className="portfolio__project-link" target="_blanc">
            <p className="portfolio__project-link-text">Одностраничное приложение</p>
            <span className="portfolio__project-link-arrow">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
