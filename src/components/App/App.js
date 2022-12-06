import React from "react";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import { MovieContext } from "../../contexts/MovieContext";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "../Login/Login.js";
import Page404 from "../Page404/Page404.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import InfoTooltipPopup from "../InfoTooltipPopup/InfoTooltipPopup";
import * as constants from "../../utils/constants";

function App() {
  let moviesIsPresent = JSON.parse(
    localStorage.getItem("movieArrayAfterSearch")
  );
  let movies = JSON.parse(localStorage.getItem("films")) || [];
  const [isLoading, setIsLoading] = React.useState(true); // изменение надписей кнопок при ожидании ответа от сервера
  const [movieIsFound, setMovieIsFound] = React.useState(moviesIsPresent ? true : false); // управляет заглушкой "Ничего не найдено"
  const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]); // массив фильмов для страницы сохраненных фильмов
  const [filteredMovies, setFilteredMovies] = React.useState(
    JSON.parse(localStorage.getItem("movieArrayAfterSearch")) || []
  ); // массив фильмов по результатам поиска
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]); // массив фильмов по результатам поиска на стр. сохраненных
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState("");
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isResultSuccess, setIsResultSuccess] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("token") ? true : false
  );
  const [currentUser, setCurrentUser] = React.useState({});
  const [moviesArrayForRender, setMoviesArrayForRender] = React.useState(
    JSON.parse(localStorage.getItem("moviesArrayForRender")) || []
  );
  const [renderedMoviesQuantity, setRenderedMoviesQuantity] =
    React.useState(12);
  const [moreMoviesQuantity, setMoreMoviesQuantity] = React.useState(3);
  const [allMoviesAreShown, setAllMoviesAreShown] = React.useState(true);
  const [lastSearchingString, setLastSearchingString] = React.useState(
    localStorage.getItem("stringToSearch") || ""
  );
  const [shortFilmsOnlyStatus, setShortFilmsOnlyStatus] = React.useState(
    Boolean(localStorage.getItem("shortMovieOnly"))
  );
  const [currentWidth, setCurrentWidth] = React.useState(window.innerWidth);
  const baseUrl = "https://api.nomoreparties.co";
  const history = useHistory();
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);
  const [searchStringIsMissed, setSearchStringIsMissed] = React.useState(
    localStorage.getItem("stringToSearch") ? false : true
  );

  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res); //обновление данных пользователя в случае обновления страницы при наличии токена
          setLoggedIn(true);
        })
        .catch((err) => {

          handleSignOut();

          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (currentWidth >= constants.DESKTOP.width) {
      setRenderedMoviesQuantity(constants.DESKTOP.startingCount);
      setMoreMoviesQuantity(constants.DESKTOP.moreCount);
    } else if (currentWidth <= constants.TABLET.width) {
      setRenderedMoviesQuantity(constants.MOBILE.startingCount);
      setMoreMoviesQuantity(constants.MOBILE.moreCount);
    } else {
      setRenderedMoviesQuantity(constants.TABLET.startingCount);
      setMoreMoviesQuantity(constants.TABLET.moreCount);
    }
  }, [currentWidth]);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.updateToken();
      mainApi
        .getMovies()
        .then((resMovies) => {
          setSavedMovies(resMovies);
          setFilteredSavedMovies(resMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const lastMovieIsShown =
      moviesArrayForRender.length === filteredMovies.length ? true : false;
    setAllMoviesAreShown(lastMovieIsShown);
    localStorage.setItem("allMoviesAreShown", lastMovieIsShown ? true : "");
  }, [moviesArrayForRender]);

  const handleFindMovies = (stringToSearch, shortMovieOnly) => {
    setLastSearchingString(stringToSearch);
    let localMovies = JSON.parse(localStorage.getItem("films"));
    if (localMovies) {
      const movieArrayAfterSearch = movies.filter((item) => {
        return shortMovieOnly
          ? (item.duration <= 40 &&
              item.nameRU
                .toLowerCase()
                .includes(stringToSearch.toLowerCase())) ||
              (item.duration <= 40 &&
                item.nameEN
                  .toLowerCase()
                  .includes(stringToSearch.toLowerCase()))
          : item.nameRU.toLowerCase().includes(stringToSearch.toLowerCase()) ||
              item.nameEN.toLowerCase().includes(stringToSearch.toLowerCase());
      });
      setFilteredMovies(movieArrayAfterSearch);
      const tempArrayForRender = movieArrayAfterSearch.slice(
        0,
        renderedMoviesQuantity
      );
      setMoviesArrayForRender(tempArrayForRender);
      localStorage.setItem(
        "movieArrayAfterSearch",
        JSON.stringify(movieArrayAfterSearch)
      );
      localStorage.setItem("stringToSearch", stringToSearch);
      localStorage.setItem(
        "shortMovieOnly",
        shortMovieOnly ? shortMovieOnly : ""
      );
      localStorage.setItem(
        "moviesArrayForRender",
        JSON.stringify(tempArrayForRender)
      );
    } else {
      setIsLoading(true); // включил показ компоненты прелоадера
      setMovieIsFound(false); //отключил показ результатов, чтобы мог отобразиться прелоадер
      mainApi.updateToken();
      mainApi
        .getMovies()
        .then((resMovies) => {
          setSavedMovies(resMovies);
        })
        .catch((err) => {
          console.log(err);
        });
      moviesApi
        .getMovies()
        .then((resMovies) => {
          localStorage.setItem("films", JSON.stringify(resMovies));
          movies = resMovies;
          const movieArrayAfterSearch = movies.filter((item) => {
            return shortMovieOnly
              ? (item.duration <= 40 &&
                  item.nameRU
                    .toLowerCase()
                    .includes(stringToSearch.toLowerCase())) ||
                  (item.duration <= 40 &&
                    item.nameEN
                      .toLowerCase()
                      .includes(stringToSearch.toLowerCase()))
              : item.nameRU
                  .toLowerCase()
                  .includes(stringToSearch.toLowerCase()) ||
                  item.nameEN
                    .toLowerCase()
                    .includes(stringToSearch.toLowerCase());
          });
          setFilteredMovies(movieArrayAfterSearch);
          const tempArrayForRender = movieArrayAfterSearch.slice(
            0,
            renderedMoviesQuantity
          );
          setMoviesArrayForRender(tempArrayForRender);
          localStorage.setItem(
            "movieArrayAfterSearch",
            JSON.stringify(movieArrayAfterSearch)
          );
          localStorage.setItem("stringToSearch", stringToSearch);
          localStorage.setItem(
            "shortMovieOnly",
            shortMovieOnly ? shortMovieOnly : ""
          );
          localStorage.setItem(
            "moviesArrayForRender",
            JSON.stringify(tempArrayForRender)
          );
        })
        .catch((err) => {
          setInfoTooltipMessage(constants, constants.commonServerError);
          setIsPopupOpen(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
          setMovieIsFound(true);
        });
    }
  };

  const handleShowMoreMovies = () => {
    const newMaxMoviesQuantity =
      moviesArrayForRender.length + moreMoviesQuantity;
    setMoviesArrayForRender(filteredMovies.slice(0, newMaxMoviesQuantity));
    localStorage.setItem("renderedMoviesQuantity", newMaxMoviesQuantity);
  };

  const handleFindSavedMovies = (stringToSearch, shortMovieOnly) => {
    const movieArrayAfterSearch = savedMovies.filter((item) => {
      return shortMovieOnly
        ? (item.duration <= 40 &&
            item.nameRU.toLowerCase().includes(stringToSearch.toLowerCase())) ||
            (item.duration <= 40 &&
              item.nameEN.toLowerCase().includes(stringToSearch.toLowerCase()))
        : item.nameRU.toLowerCase().includes(stringToSearch.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(stringToSearch.toLowerCase());
    });
    setFilteredSavedMovies(movieArrayAfterSearch);
  };

  const handleLikeClick = (newMovie) => {
    mainApi
      .postNewMovie(newMovie) //записываем фильм в нашу БД
      .then((movie) => {
        const newSavedMovies = [movie, ...savedMovies];
        setSavedMovies(newSavedMovies);
        setFilteredSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipMessage(`Ошибка создания карточки: ${err}`);
        setIsPopupOpen(true);
      });
  };

  function findMovieForDelete(movie) {
    const movieForDelete = savedMovies.filter(
      (item) => item.movieId === movie.id
    );
    return movieForDelete[0];
  }

  function handleDislikeClick(movie) {
    const deletingMovie = findMovieForDelete(movie);
    mainApi.deleteMovie(deletingMovie)
      .then(() => {
        mainApi
          .getMovies()
            .then((resMovies) => {
              setSavedMovies(resMovies);
              setFilteredSavedMovies((state) =>state.filter((m) => m.movieId !== movie.id));
            })
            .catch((err) => {
              console.log(err);
            });
      })
      .catch((err) => {
      console.log(err);
    });
  }

  function handleDislikeClickFromSaved(movie) {
    mainApi
      .deleteMovie(movie)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
        setFilteredSavedMovies((state) =>
          state.filter((m) => m._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onPopupClose = () => {
    setInfoTooltipMessage("");
    setIsPopupOpen(false);
  };

  const handleSignInSubmit = ({ email, password }) => {
    mainApi
      .signin(password, email)
      .then((data) => {
        if (data) {
          mainApi
            .checkToken(data.token)
            .then((res) => {
              setCurrentUser(res);
              setLoggedIn(true);
            })
            .then(() => {
              history.push("/movies");
            });
        }
      })
      .catch((err) => {
        setInfoTooltipMessage(
          `Ошибка входа: ${err}. Проверьте вводимые данные и попробуйте еще раз.`
        );
        setIsPopupOpen(true);
      });
  };

  const handleRegisterSubmit = ({ name, email, password }) => {
    const pass = password;
    setIsInputDisabled(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        handleSignInSubmit({
          email: res.email,
          password: pass,
        });
      })
      .catch((err) => {
        setInfoTooltipMessage(`Ошибка при регистрации: ${err}`);
        setIsPopupOpen(true);
      })
      .finally((res) => {
        setIsInputDisabled(false);
      });
  };

  const handleUpdateUser = (newUserData) => {
    mainApi
      .setUserInfo(newUserData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignOut = () => {
    history.push("/");
    setLoggedIn(false);
    setLastSearchingString("");
    setMoviesArrayForRender([]);
    setAllMoviesAreShown(true);
    setMovieIsFound(false);
    setTimeout(() => {
      localStorage.clear();
    }, 500);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MovieContext.Provider
        value={{
          moviesCards: movies,
          savedMovies: savedMovies,
        }}
      >
        <main className="page">
          <Switch>
            <Route exact path="/">
              <Header
                loggedIn={loggedIn}
                isMobileMenuOpened={isMobileMenuOpened}
                setIsMobileMenuOpened={setIsMobileMenuOpened}
              />
              <Main />
              <Footer />
            </Route>

            <Route path="/signup">
              <Register
                onAddUser={handleRegisterSubmit}
                isInputDisabled={isInputDisabled}
              />
            </Route>

            <Route path="/signin">
              <Login
                onEnterUser={handleSignInSubmit}
                isInputDisabled={isInputDisabled}
              />
            </Route>

            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              isMobileMenuOpened={isMobileMenuOpened}
              setIsMobileMenuOpened={setIsMobileMenuOpened}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              movieIsFound={movieIsFound}
              setMovieIsFound={setMovieIsFound}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              movieList={moviesArrayForRender}
              baseUrl={baseUrl}
              onLike={handleLikeClick}
              onDislike={handleDislikeClick}
              onMoreMoviesClick={handleShowMoreMovies}
              onSearch={handleFindMovies}
              allMoviesAreShown={allMoviesAreShown}
              lastSearchingString={lastSearchingString}
              setLastSearchingString={setLastSearchingString}
              shortFilmsOnlyStatus={shortFilmsOnlyStatus}
              setShortFilmsOnlyStatus={setShortFilmsOnlyStatus}
              searchStringIsMissed={searchStringIsMissed}
              setSearchStringIsMissed={setSearchStringIsMissed}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              isMobileMenuOpened={isMobileMenuOpened}
              setIsMobileMenuOpened={setIsMobileMenuOpened}
              setMovieIsFound={setMovieIsFound}
              savedMovies={savedMovies}
              movieList={filteredSavedMovies}
              baseUrl={baseUrl}
              onLike={handleLikeClick}
              onDislike={handleDislikeClickFromSaved}
              onSearch={handleFindSavedMovies}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              isMobileMenuOpened={isMobileMenuOpened}
              setIsMobileMenuOpened={setIsMobileMenuOpened}
              onUpdateUser={handleUpdateUser}
              onSignOut={handleSignOut}
              setInfoTooltipMessage={setInfoTooltipMessage}
              setIsPopupOpen={setIsPopupOpen}
              setIsResultSuccess={setIsResultSuccess}
            ></ProtectedRoute>

            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
          <InfoTooltipPopup
            isPopupOpen={isPopupOpen}
            messageText={infoTooltipMessage}
            isResultSuccess={isResultSuccess}
            onClose={onPopupClose}
          />
        </main>
      </MovieContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
