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
import MobileMenu from "../MobileMenu/MobileMenu.js";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";

function App() {
  const [isLoading, setIsLoading] = React.useState(false); // изменение аънадписей кнопок при ожидании ответа от сервера
  const [movieIsFound, setMovieIsFound] = React.useState(false); // управляет заглушкой "Ничего не найдено"
  const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);
  const [movies, setMovies] = React.useState([]); // массив фильмов для основной страницы
  const [savedMovies, setSavedMovies] = React.useState([]); // массив фильмов для страницы сохраненных фильмов
  const [filteredMovies, setFilteredMovies] = React.useState([]); // массив фильмов по результатам поиска
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("token") ? true : false
  );
  const [currentUser, setCurrentUser] = React.useState({});
  const baseUrl = "https://api.nomoreparties.co";
  const history = useHistory();
  const [moviesArrayForRender, setMoviesArrayForRender] = React.useState([]);
  // const startingMoviesQuantity = 12;
  // const [renderedMoviesQuantity, setRenderedMoviesQuantity] = React.useState(localStorage.getItem('renderedMoviesQuantity') || 12);
  const [renderedMoviesQuantity, setRenderedMoviesQuantity] =
    React.useState(12);
  const [allMoviesAreShown, setAllMoviesAreShown] = React.useState(false);
  const [lastSearchingString] = React.useState("");


  // React.useEffect(() => {
  //   setMoviesArrayForRender(slicedMoviesArray);
  // }, []);

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

  // React.useEffect(() => {
  //   const savedMoviesAtLocalStorage= localStorage.getItem('currentlySavedMovies');
  //   if (savedMoviesAtLocalStorage) {
  //     setSavedMovies(savedMoviesAtLocalStorage);
  //   }
  // }, []);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.updateToken();

      moviesApi
        .getMovies()
        .then((resMovies) => {
          setMovies(resMovies);
          // setMoviesArrayForRender(resMovies.slice(0, renderedMoviesQuantity));
          // console.log(resMovies);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // localStorage.setItem('allMovies', JSON.stringify(movies)); //записываем сохраненные фильмы в локалсторейдж
          // setIsLoading(false);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    setAllMoviesAreShown(moviesArrayForRender.length === filteredMovies.length);
  }, [moviesArrayForRender]);

  React.useEffect(() => {
    if (filteredMovies.length > 0) {setMovieIsFound(true)};
  }, [filteredMovies]);

  const handleFindMovies = (stringToSearch, shortMovieOnly) => {
    const movieArrayAfterSearch = movies.filter(item => {
      return (
        shortMovieOnly ? (
          item.duration <= 40 && (item.nameRU.toLowerCase().includes(stringToSearch.toLowerCase())) || (item.nameEN.toLowerCase().includes(stringToSearch.toLowerCase()))
          ) : (
            (item.nameRU.toLowerCase().includes(stringToSearch.toLowerCase())) || (item.nameEN.toLowerCase().includes(stringToSearch.toLowerCase()))
            )
      );
    });

    setFilteredMovies(movieArrayAfterSearch);
    setMoviesArrayForRender(movieArrayAfterSearch.slice(0, renderedMoviesQuantity));
    localStorage.setItem("movieArrayAfterSearch", movieArrayAfterSearch);
  };

  const handleShowMoreMovies = () => {
    const newMaxMoviesQuantity = moviesArrayForRender.length + 3;
    setMoviesArrayForRender(filteredMovies.slice(0, newMaxMoviesQuantity));
    localStorage.setItem("renderedMoviesQuantity", newMaxMoviesQuantity);
  };

  const handleLikeClick = (newMovie) => {
    // setIsLoading(true);
    mainApi
      .postNewMovie(newMovie) //записываем фильм в нашу БД
      .then((movie) => {
        const newSavedMovies = [movie, ...savedMovies];
        setSavedMovies(newSavedMovies); //сохраняем в локальный стейт
        // setSavedMovies([movie, ...savedMovies]);
        localStorage.setItem("currentlySavedMovies", newSavedMovies); //записываем сохраненные фильмы в локалсторейдж
        // closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        //   setInfoTooltipMessage(`Ошибка создания карточки: ${err}`);
        // setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        // setIsLoading(false);
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
    // setIsLoading(true);
    mainApi
      .deleteMovie(deletingMovie)
      // .then(() => {
      //   setCards((state) => state.filter((c) => !(c._id === card._id)));
      // })
      // .then(() => {
      //   closeAllPopups();
      // })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }

  function handleDislikeClickFromSaved(movie) {
    // console.log(movie._id);
    const deletingMovie = findMovieForDelete(movie._id);
    // setIsLoading(true);
    mainApi
      .deleteMovie(movie)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
      })
      // .then(() => {
      //   closeAllPopups();
      // })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }

  const handleRegisterSubmit = ({ name, email, password }) => {
    // setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        setIsRegistered(true);
        setInfoTooltipMessage("Вы успешно зарегистрировались!");
        // setIsInfoTooltipOpen(true);
        history.push("/signin");
        // setIsLoading(false);
      })
      .catch((err) => {
        setInfoTooltipMessage(`Ошибка при регистрации: ${err}`);
        // setIsInfoTooltipOpen(true);
        // setIsLoading(false);
      });
  };

  const handleSignInSubmit = ({ email, password }) => {
    // setIsLoading(true);
    mainApi
      .signin(password, email)
      .then((data) => {
        if (data) {
          mainApi
            .checkToken(data.token)
            .then((res) => {
              setCurrentUser(res);
              // setUserEmail(res.email);
              // setUserName(res.name);
              setLoggedIn(true);
              // history.push('/movies');
              // setIsLoading(false);
            })
            .then(() => {
              history.push("/movies");
            });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsRegistered(false);
        setInfoTooltipMessage(
          `Ошибка входа: ${err}. Проверьте вводимые данные и попробуйте еще раз.`
        );
        // setIsInfoTooltipOpen(true);
      });
  };

  const handleUpdateUser = (newUserData) => {
    setIsLoading(true);
    mainApi
      .setUserInfo(newUserData)
      .then((res) => {
        setCurrentUser(res);
        // setUserName(res.name);
        // setUserEmail(res.email);
        // closeAllPopups();
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
    // setIsMobileMenuVisible(false);
    localStorage.removeItem("token");
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
                isMobileMenuOpened={isMobileMenuOpened}
                setIsMobileMenuOpened={setIsMobileMenuOpened}
              />
              <Main />
              <Footer />
            </Route>
            <Route path="/movies">
              <Header
                isMobileMenuOpened={isMobileMenuOpened}
                setIsMobileMenuOpened={setIsMobileMenuOpened}
              />
              <Movies
                isLoading={isLoading}
                movieIsFound={movieIsFound}
                setMovieIsFound={setMovieIsFound}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                movieList={moviesArrayForRender}
                // movieList={filteredMovies}
                baseUrl={baseUrl}
                onLike={handleLikeClick}
                onDislike={handleDislikeClick}
                onMoreMoviesClick={handleShowMoreMovies}
                onSearch={handleFindMovies}
                allMoviesAreShown={allMoviesAreShown}
                lastSearchingString={lastSearchingString}
              />
              <Footer />
            </Route>
            <Route path="/saved-movies">
              <Header
                isMobileMenuOpened={isMobileMenuOpened}
                setIsMobileMenuOpened={setIsMobileMenuOpened}
              />
              <SavedMovies
                isLoading={isLoading}
                movieIsFound={movieIsFound}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                movieList={savedMovies}
                baseUrl={baseUrl}
                onLike={handleLikeClick}
                onDislike={handleDislikeClickFromSaved}
              />
              <Footer />
            </Route>
            <Route path="/profile">
              <Header
                isMobileMenuOpened={isMobileMenuOpened}
                setIsMobileMenuOpened={setIsMobileMenuOpened}
              />
              <Profile
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
              />
            </Route>
            <Route path="/signup">
              <Register onAddUser={handleRegisterSubmit} />
            </Route>
            <Route path="/signin">
              <Login onEnterUser={handleSignInSubmit} />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </main>
      </MovieContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
