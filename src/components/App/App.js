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
  let moviesIsPresent = (JSON.parse(localStorage.getItem("movieArrayAfterSearch")));
  const [isLoading, setIsLoading] = React.useState(true); // изменение аънадписей кнопок при ожидании ответа от сервера
  const [movieIsFound, setMovieIsFound] = React.useState(moviesIsPresent ? true : false); // управляет заглушкой "Ничего не найдено"
  const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);
  const [movies, setMovies] = React.useState([]); // массив фильмов для основной страницы
  const [savedMovies, setSavedMovies] = React.useState([]); // массив фильмов для страницы сохраненных фильмов
  const [filteredMovies, setFilteredMovies] = React.useState([]); // массив фильмов по результатам поиска
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]); // массив фильмов по результатам поиска на стр. сохраненных
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState("Начальное сообщение - потом удалить");
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isResultSuccess, setIsResultSuccess] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("token") ? true : false
  );
  const [currentUser, setCurrentUser] = React.useState({});
  const [moviesArrayForRender, setMoviesArrayForRender] = React.useState([]);
  const [renderedMoviesQuantity, setRenderedMoviesQuantity] = React.useState(12);
  const [moreMoviesQuantity, setMoreMoviesQuantity] = React.useState(3);
  const [allMoviesAreShown, setAllMoviesAreShown] = React.useState(localStorage.getItem("stringToSearch") ? true : false);
  const [lastSearchingString, setLastSearchingString] = React.useState(localStorage.getItem("stringToSearch") || "");
  const [shortFilmsOnlyStatus, setShortFilmsOnlyStatus] = React.useState(Boolean(localStorage.getItem("shortMovieOnly")));
  const [currentWidth, setCurrentWidth] = React.useState(window.innerWidth);
  const baseUrl = "https://api.nomoreparties.co";
  const history = useHistory();
  const [movieArrayFromLocalStorage, setMovieArrayFromLocalStorage] = React.useState(JSON.parse(localStorage.getItem("movieArrayAfterSearch")));
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res); //обновление данных пользователя в случае обновления страницы при наличии токена
          setLoggedIn(true);
          history.push("/movies");
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
  }, [history]);

  React.useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth)
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
  }
}, [])

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
      setIsLoading(true);
      mainApi.updateToken();

      moviesApi
        .getMovies()
        .then((resMovies) => {
          setMovies(resMovies);
          setMoviesArrayForRender(JSON.parse(localStorage.getItem("movieArrayAfterSearch")) || []);
          setLastSearchingString(localStorage.getItem("stringToSearch") || "");
        })
        .catch((err) => {
          setInfoTooltipMessage(constants,constants.commonServerError);
          setIsPopupOpen(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    setAllMoviesAreShown(moviesArrayForRender.length === filteredMovies.length);
  }, [moviesArrayForRender]);

  const handleFindMovies = (stringToSearch, shortMovieOnly) => {
    setIsLoading(true);
    setLastSearchingString(stringToSearch);

    const movieArrayAfterSearch = movies.filter((item) => {
      return shortMovieOnly
        ? ((item.duration <= 40 &&
            item.nameRU.toLowerCase().includes(stringToSearch.toLowerCase())) ||
            (item.duration <= 40 &&
            item.nameEN.toLowerCase().includes(stringToSearch.toLowerCase())))
        : (item.nameRU.toLowerCase().includes(stringToSearch.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(stringToSearch.toLowerCase()));
    });
    setFilteredMovies(movieArrayAfterSearch);
    setMoviesArrayForRender(
      movieArrayAfterSearch.slice(0, renderedMoviesQuantity)
    );
    localStorage.setItem("movieArrayAfterSearch", JSON.stringify(movieArrayAfterSearch));
    localStorage.setItem("stringToSearch", stringToSearch);
    localStorage.setItem("shortMovieOnly", shortMovieOnly ? shortMovieOnly : "");
    setIsLoading(false);
  };

  const handleShowMoreMovies = () => {
    const newMaxMoviesQuantity = moviesArrayForRender.length + moreMoviesQuantity;
    setMoviesArrayForRender(filteredMovies.slice(0, newMaxMoviesQuantity));
    localStorage.setItem("renderedMoviesQuantity", newMaxMoviesQuantity);
  };

  const handleFindSavedMovies = (stringToSearch, shortMovieOnly) => {
    const movieArrayAfterSearch = savedMovies.filter((item) => {
      return shortMovieOnly
        ? ((item.duration <= 40 &&
            item.nameRU.toLowerCase().includes(stringToSearch.toLowerCase())) ||
            (item.duration <= 40 &&
            item.nameEN.toLowerCase().includes(stringToSearch.toLowerCase())))
        : (item.nameRU.toLowerCase().includes(stringToSearch.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(stringToSearch.toLowerCase()));
    });
    setFilteredSavedMovies(movieArrayAfterSearch);
  };

  const handleLikeClick = (newMovie) => {
    mainApi
      .postNewMovie(newMovie) //записываем фильм в нашу БД
      .then((movie) => {
        const newSavedMovies = [movie, ...savedMovies];
        setSavedMovies(newSavedMovies); //сохраняем в локальный стейт
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
    mainApi
      .deleteMovie(deletingMovie)
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDislikeClickFromSaved(movie) {
    const deletingMovie = findMovieForDelete(movie._id);
    mainApi
      .deleteMovie(movie)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
        setFilteredSavedMovies((state) => state.filter((m) => m._id !== movie._id));
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
        setIsLoading(false);
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
        setIsLoading(false);
        setIsInputDisabled(false);
      });
  };

  const handleUpdateUser = (newUserData) => {
    setIsLoading(true);
    mainApi
      .setUserInfo(newUserData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setLastSearchingString("");
    setMoviesArrayForRender([]);
    setAllMoviesAreShown(true);
    setMovieIsFound(false);
    localStorage.removeItem("token");
    localStorage.removeItem("movieArrayAfterSearch");
    localStorage.removeItem("stringToSearch");
    localStorage.removeItem("shortMovieOnly");
    localStorage.removeItem("renderedMoviesQuantity")
    history.push("/");
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
              setMoviesArrayForRender={setMoviesArrayForRender}
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
              movieArrayFromLocalStorage={movieArrayFromLocalStorage}
              setMovieArrayFromLocalStorage={setMovieArrayFromLocalStorage}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              isMobileMenuOpened={isMobileMenuOpened}
              setIsMobileMenuOpened={setIsMobileMenuOpened}
              isLoading={isLoading}
              movieIsFound={movieIsFound}
              setMovieIsFound={setMovieIsFound}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              setFilteredSavedMovies={setFilteredSavedMovies}
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
