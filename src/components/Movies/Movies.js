import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import MoviesNotFound from "../MoviesNotFound/MoviesNotFound";
import { mainApi } from "../../utils/MainApi";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";

function Movies({
  isLoading,
  setIsLoading,
  movieIsFound,
  setMovieIsFound,
  movieList,
  savedMovies,
  setSavedMovies,
  baseUrl,
  onLike,
  onDislike,
  onMoreMoviesClick,
  onSearch,
  allMoviesAreShown,
  lastSearchingString,
  loggedIn,
  isMobileMenuOpened,
  setIsMobileMenuOpened,
  shortFilmsOnlyStatus,
  setShortFilmsOnlyStatus,
}) {

  const [searchStringIsMissed, setSearchStringIsMissed] = React.useState(localStorage.getItem("stringToSearch") ? false : true);

  React.useEffect(() => {
    setIsLoading(true);
    mainApi.updateToken();
    mainApi
      .getMovies()
      .then((resMovies) => {
        setSavedMovies(resMovies);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
        lastSearchingString={lastSearchingString}
        shortFilmsOnlyStatus={shortFilmsOnlyStatus}
        setShortFilmsOnlyStatus={setShortFilmsOnlyStatus}
        setSearchStringIsMissed={setSearchStringIsMissed}
      />
      {movieIsFound ? (
        <div className="movies__results">
          <MoviesCardList
            movieList={movieList}
            baseUrl={baseUrl}
            onLike={onLike}
            onDislike={onDislike}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            shortFilmsOnlyStatus={shortFilmsOnlyStatus}
          />
          {!allMoviesAreShown ? (
            <MoreMoviesButton onMoreMoviesClick={onMoreMoviesClick} />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <MoviesNotFound
          isLoading={isLoading}
          searchStringIsMissed={searchStringIsMissed}
        />
      )}
      <Footer />
    </section>
  );
}

export default Movies;
