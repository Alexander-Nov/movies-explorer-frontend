import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { mainApi } from "../../utils/MainApi";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";

function SavedMovies({
  loggedIn,
  isMobileMenuOpened,
  setIsMobileMenuOpened,
  isLoading,
  movieIsFound,
  setMovieIsFound,
  movieList,
  savedMovies,
  setSavedMovies,
  setFilteredSavedMovies,
  baseUrl,
  onLike,
  onDislike,
  onSearch,
}) {
  // const { moviesCards, savedMovies } = React.useContext(MovieContext);
  const [shortSavedFilmsOnlyStatus, setShortSavedFilmsOnlyStatus] = React.useState(false);

  React.useEffect(() => {
    mainApi.updateToken();
    mainApi
      .getMovies()
      .then((resMovies) => {
        setSavedMovies(resMovies);
        setFilteredSavedMovies(resMovies);
        // console.log(resMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // React.useEffect(() => {
  //   return () => {
  //     setSavedMovies(JSON.parse(localStorage.getItem('currentlySavedMovies')));
  //   };
  // }, []);

  return (
    <section className="movies">
      <Header
        loggedIn={loggedIn}
        isMobileMenuOpened={isMobileMenuOpened}
        setIsMobileMenuOpened={setIsMobileMenuOpened}
      />
      <SearchForm
        setMovieIsFound={setMovieIsFound}
        onSearch={onSearch}
        isSavedMoviesPage="true"
        shortFilmsOnlyStatus={shortSavedFilmsOnlyStatus}
        setShortFilmsOnlyStatus={setShortSavedFilmsOnlyStatus}
      />
      <MoviesCardList
        // movieList={savedMovies}
        movieList={movieList}
        savedMovies={savedMovies}
        baseUrl={baseUrl}
        onLike={onLike}
        onDislike={onDislike}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
