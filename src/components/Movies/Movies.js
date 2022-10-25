import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import MoviesNotFound from "../MoviesNotFound/MoviesNotFound";
import { mainApi } from "../../utils/MainApi";
// import { MovieContext } from "../../contexts/MovieContext";

function Movies({
  isLoading,
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
  lastSearchingString
}) {

  const [shortFilmsOnlyStatus, setShortFilmsOnlyStatus] = React.useState(false);
  const [searchStringIsMissed, setSearchStringIsMissed] = React.useState(false);

  // const { moviesCards } = React.useContext(MovieContext);

  React.useEffect(() => {
    mainApi.
      getMovies()
        .then((resMovies) => {
          setSavedMovies(resMovies);
          // console.log(resMovies);
        })
        .catch((err) => {
        console.log(err);
        });
  }, []);

  return (
    <div className="movies">
      <SearchForm
        setMovieIsFound={setMovieIsFound}
        onSearch={onSearch}
        lastSearchingString={localStorage.getItem("lastSearchingString")}
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
          <MoreMoviesButton
            onMoreMoviesClick={onMoreMoviesClick}
          />
          ) : (<></>)}
        </div>
      ) : (
        <MoviesNotFound
        isLoading={isLoading}
        searchStringIsMissed={searchStringIsMissed}
        />
      )}
    </div>
  );
}

export default Movies;
