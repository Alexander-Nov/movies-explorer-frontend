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
  movieList,
  savedMovies,
  setSavedMovies,
  baseUrl,
  onLike,
  onDislike,
}) {
  // const { moviesCards, savedMovies } = React.useContext(MovieContext);

  React.useEffect(() => {
    mainApi
      .getMovies()
      .then((resMovies) => {
        setSavedMovies(resMovies);
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
      <SearchForm />
      <MoviesCardList
        movieList={savedMovies}
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
