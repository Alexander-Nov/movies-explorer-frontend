import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm ({ setMovieIsFound, onSearch, lastSearchingString, shortFilmsOnlyStatus, setShortFilmsOnlyStatus, setSearchStringIsMissed })  {

  let moviesIsPresent = (JSON.parse(localStorage.getItem("movieArrayAfterSearch")));
  const [searchingMovieTitle, setSearchingMovieTitle] = React.useState(lastSearchingString);
  const [isSerchingStarted, setIsSerchingStarted] = React.useState(moviesIsPresent ? true : false);

  function handleChangeMovieTitle(e) {
    e.preventDefault();
    setSearchingMovieTitle(e.target.value);
  }

  // function handleChangeShortFilmsOnlyStatus() {
  //   if (isSerchingStarted) {
  //     setShortFilmsOnlyStatus(shortFilmsOnlyStatus ? false : true);
  //     if (searchingMovieTitle.length === 0) {
  //       setSearchStringIsMissed(true);
  //       setMovieIsFound(false);
  //     } else {
  //       setMovieIsFound(true);
  //     }
  //   }
  // }

  function handleChangeShortFilmsOnlyStatus() {
      setShortFilmsOnlyStatus(shortFilmsOnlyStatus ? false : true);
      if (searchingMovieTitle.length === 0) {
        setSearchStringIsMissed(true);
        setMovieIsFound(false);
      } else {
        setMovieIsFound(true);
      }
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    if (searchingMovieTitle.length === 0) {
      setSearchStringIsMissed(true);
      setMovieIsFound(false);
    } else {
      setMovieIsFound(true);
      onSearch(searchingMovieTitle, shortFilmsOnlyStatus);
      // setIsSerchingStarted(true);
    }

    // (searchingMovieTitle.length === 0) ? setSearchStringIsMissed(true) : onSearch(searchingMovieTitle, shortFilmsOnlyStatus);
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
