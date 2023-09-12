class Api {
  constructor(parameters) {
    this._baseUrl = parameters.baseUrl;
    this._contentType = parameters.headers['Content-Type'];
  }

  _getReportData(res) {
    if(!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  loadingUserInfoOnServer({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then(res => this._getReportData(res));
  }

  initCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
    })
    .then(res => this._getReportData(res));
  }

  initialUsers() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
    })
    .then(res => this._getReportData(res));
  }

  loadingNewCardOnServer({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then(res => this._getReportData(res));
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
    })
    .then(res => this._getReportData(res));
  }

  likeCards(likeId) {
    return fetch(`${this._baseUrl}/cards/${likeId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
    })
    .then(res => this._getReportData(res));
  }

  dislikeCards(likeId) {
    return fetch(`${this._baseUrl}/cards/${likeId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
    })
    .then(res => this._getReportData(res));
  }

  loadigNewAvatarOnServer({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({
        avatar,
      }),
    })
    .then(res => this._getReportData(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.adrinalinemesto.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
