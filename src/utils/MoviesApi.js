import { MOVIES_API_BASE_URL } from '../utils/constants';

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

export { moviesApi };
