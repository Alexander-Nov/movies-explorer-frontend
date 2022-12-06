import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm ({
  setMovieIsFound,
  onSearch,
  lastSearchingString,
  shortFilmsOnlyStatus,
  setShortFilmsOnlyStatus,
  setSearchStringIsMissed,
  isSavedMoviesPage,
  setIsLoading,
})  {

  const [searchingMovieTitle, setSearchingMovieTitle] = React.useState(lastSearchingString ? lastSearchingString : "");

  function handleChangeMovieTitle(e) {
    e.preventDefault();
    setSearchingMovieTitle(e.target.value);
  }

  function handleChangeShortFilmsOnlyStatus() {
      setShortFilmsOnlyStatus(shortFilmsOnlyStatus ? false : true);
      if (searchingMovieTitle.length === 0) {
        if (!isSavedMoviesPage) {
          setSearchStringIsMissed(true);
        }
        setMovieIsFound(false);
      } else {
        setMovieIsFound(true);
      }
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    if (isSavedMoviesPage) {
      onSearch(searchingMovieTitle, shortFilmsOnlyStatus);
    } else if (searchingMovieTitle.length === 0) {
      setSearchStringIsMissed(true);
      setIsLoading(false);
      setMovieIsFound(false);
    } else {
      setSearchStringIsMissed(false);
      onSearch(searchingMovieTitle, shortFilmsOnlyStatus);
    }
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSearchMovies}>
        <fieldset className="search__fieldset">
          <input
            type="text"
            id="input-movie"
            className="search__input search__input-movie"
            name="input-movie"
            placeholder="Фильм"
            value={searchingMovieTitle || ""}
            onChange={handleChangeMovieTitle}
          />
          <button className="search__button">Поиск</button>
        </fieldset>
        <Checkbox
          isChecked={shortFilmsOnlyStatus}
          onCheckboxClick={handleChangeShortFilmsOnlyStatus}
        />

      </form>
    </section>
  );
}

export default SearchForm;
