import React from "react";
import logoPath from "../../images/header-logo.png";
import Navigation from "../Navigation/Navigation";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  // function handleMenuOpen() {
  //   props.onMenuOpen();
  // }

  const userLocationPath = useLocation().pathname;

    return (
      <header
        className={`header ${
          userLocationPath === "/" ? "header_dark-background" : ""
        }`}
      >
        <Link to="/" className="header__logo-link">
          <img
            className="header__logo"
            src={logoPath}
            alt="Логотип проекта Movies Explorer"
          />
        </Link>

        <Navigation />
      </header>
    );

}

export default Header;
