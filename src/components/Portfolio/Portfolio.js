import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__project-links">
        <li className="portfolio__project-link">
          <p className="portfolio__project-link-text">Статичный сайт</p>
          <a href="/" className="portfolio__project-link-arrow">↗</a>
        </li>
        <li className="portfolio__project-link">
          <p className="portfolio__project-link-text">Адаптивный сайт</p>
          <a href="/" className="portfolio__project-link-arrow">↗</a>
        </li>
        <li className="portfolio__project-link">
          <p className="portfolio__project-link-text">Одностраничное приложение</p>
          <a href="/" className="portfolio__project-link-arrow">↗</a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
