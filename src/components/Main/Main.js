import React from 'react';
import Promo from "../Promo/Promo.js";
import Techs from "../Techs/Techs.js";
import AboutProject from "../AboutProject/AboutProject.js";
import AboutMe from "../AboutMe/AboutMe.js";



function Main (props)  {
  return (
    <div className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </div>
  );
}

export default Main;
