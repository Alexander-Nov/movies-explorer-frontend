import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm (props)  {
  const [searchingMovieTitle, setSearchingMovieTitle] = React.useState("");
  const [shortFilmsOnlyStatus, setShortFilmsOnlyStatus] = React.useState(false);

  function handleChangeMovieTitle(e) {
    e.preventDefault();
    setSearchingMovieTitle(e.target.value);
  }

  function handleChangeShortFilmsOnlyStatus(e) {
    e.preventDefault();
    setShortFilmsOnlyStatus(!shortFilmsOnlyStatus);
  }

  return (
    <div className="search">
      <form className="search__form">
        <fieldset className="search__fieldset">
          <input
            type="text"
            id="input-movie"
            className="search__input search__input-movie"
            name="input-movie"
            minLength="2"
            maxLength="80"
            placeholder="Фильм"
            required
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
