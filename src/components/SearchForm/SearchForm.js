import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm ({ setMovieIsFound, onSearch, lastSearchingString, shortFilmsOnlyStatus, setShortFilmsOnlyStatus, setSearchStringIsMissed })  {
  const [searchingMovieTitle, setSearchingMovieTitle] = React.useState(lastSearchingString);

  function handleChangeMovieTitle(e) {
    e.preventDefault();
    setSearchingMovieTitle(e.target.value);
  }

  function handleChangeShortFilmsOnlyStatus(e) {
    e.preventDefault();
    setShortFilmsOnlyStatus(!shortFilmsOnlyStatus);
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    if (searchingMovieTitle.length === 0) {
      setSearchStringIsMissed(true);
      setMovieIsFound(false);
    } else {
      onSearch(searchingMovieTitle, shortFilmsOnlyStatus);
    }

    (searchingMovieTitle.length === 0) ? setSearchStringIsMissed(true) : onSearch(searchingMovieTitle, shortFilmsOnlyStatus);
  }

  return (
    <div className="search">
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
    </div>
  );
}

export default SearchForm;
