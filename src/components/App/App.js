import React from "react";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";

import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login.js";
import Page404 from "../Page404/Page404.js";
import MobileMenu from "../MobileMenu/MobileMenu.js";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [movieIsFound, setMovieIsFound] = React.useState(true);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header
          isMobileMenuOpened={isMobileMenuOpened}
          setIsMobileMenuOpened={setIsMobileMenuOpened}
          />
          {/* <MobileMenu /> */}
          <Movies
            isLoading={isLoading}
            movieIsFound={movieIsFound}
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
        <Header
          isMobileMenuOpened={isMobileMenuOpened}
          setIsMobileMenuOpened={setIsMobileMenuOpened}
          />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
        <Header
          isMobileMenuOpened={isMobileMenuOpened}
          setIsMobileMenuOpened={setIsMobileMenuOpened}
          />
          <Profile />
          {/* <Footer /> */}
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
