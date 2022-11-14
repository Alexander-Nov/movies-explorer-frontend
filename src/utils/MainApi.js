import { MAIN_API_BASE_URL } from '../utils/constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    // return Promise.reject(`Ошибка: ${res.status}`);
    // console.log(res.text);
    return res.text()
    .then ((text) => {
      throw new Error(text)
      // console.log(text);
      // Promise.reject({status: res.status, text})
    }
    );
    // return Promise.reject(res.statusText);
  }

  postNewMovie(newMovieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(newMovieData),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then((responce) => this._getResponseData(responce));
  }

  signin(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({password, email,})
    })
    .then((responce => this._getResponseData(responce)))
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
    });
  }

  // getUserData() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     headers: this._headers,
  //   }).then((res) => {
  //     return this._getResponseData(res);
  //   });
  // }

  setUserInfo(newData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newData),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((responce => this._getResponseData(responce)))
    .then((res) => {
      if (res.email){
        return res;
      }
    });
  };

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // setUserInfo(newData) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify(newData),
  //   }).then((res) => {
  //     return this._getResponseData(res);
  //   });
  // }

  // changeLikeCardStatus(cardId, isLiked) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: `${isLiked ? "PUT" : "DELETE"}`,
  //     headers: this._headers,
  //   }).then((res) => {
  //     return this._getResponseData(res);
  //   });
  // }

  // updateAvatar(newData) {
  //   return fetch(`${this._baseUrl}/users/me/avatar`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify(newData),
  //   }).then((res) => {
  //     return this._getResponseData(res);
  //   });
  // }

  updateToken() {
    this._headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  }

}

const mainApi = new MainApi({
  baseUrl: MAIN_API_BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('token') || ""}`,
    "content-type": "application/json",
  },
});

export { mainApi };
