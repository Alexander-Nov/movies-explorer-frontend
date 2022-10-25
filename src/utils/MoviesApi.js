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

  // postNewCard(newCardData) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify(newCardData),
  //   }).then((res) => {
  //     return this._getResponseData(res);
  //   });
  // }

  // deleteCard(card) {
  //   return fetch(`${this._baseUrl}/cards/${card._id}`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then((res) => {
  //     return this._getResponseData(res);
  //   });
  // }

  // getUserData() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     headers: this._headers,
  //   }).then((res) => {
  //     return this._getResponseData(res);
  //   });
  // }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
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

//   updateToken() {
//     this._headers = {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       'Content-Type': 'application/json',
//     }
//   }

}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co",
  headers: {
    "content-type": "application/json",
  },
});

export { moviesApi };
