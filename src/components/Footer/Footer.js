import React from "react";
import { useLocation } from "react-router-dom";

function Footer(props) {

  const userLocationPath = useLocation().pathname;

    return (
      <footer className={`footer ${userLocationPath === "/" ? "footer_spaced" : ""}`}>
        <h4 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h4>
        <div className="footer__info-links">
          <p className="footer__copyright">© 2022</p>
          <div className="footer__linksBlock">
            <a href="/" className="footer__link">
              Яндекс.Практикум
            </a>
            <a href="/" className="footer__link">
              Github
            </a>
          </div>
        </div>
      </footer>
    );

}

export default Footer;
