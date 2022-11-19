import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";

function SavedMovies({
  loggedIn,
  isMobileMenuOpened,
  setIsMobileMenuOpened,
  setMovieIsFound,
  movieList,
  savedMovies,
  baseUrl,
  onLike,
  onDislike,
  onSearch,
}) {

  const [shortSavedFilmsOnlyStatus, setShortSavedFilmsOnlyStatus] = React.useState(false);

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
