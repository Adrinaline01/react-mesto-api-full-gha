class Api {
  constructor(parameters) {
    this._baseUrl = parameters.baseUrl;
    this._authorization = parameters.headers.authorization;
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
      headers: {
        authorization: this._authorization,
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
      headers: {
        authorization: this._authorization,
      },
    })
    .then(res => this._getReportData(res));
  }
  
  initialUsers() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
      },
    })
    .then(res => this._getReportData(res));
  }

  loadingNewCardOnServer({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
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
      headers: {
        authorization: this._authorization,
      },
    })
    .then(res => this._getReportData(res));
  }

  likeCards(likeId) {
    return fetch(`${this._baseUrl}/cards/likes/${likeId}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      },
    })
    .then(res => this._getReportData(res));
  }

  dislikeCards(likeId) {
    return fetch(`${this._baseUrl}/cards/likes/${likeId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    })
    .then(res => this._getReportData(res));
  }

  loadigNewAvatarOnServer({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'bdaf5f64-aca0-47b5-811d-20bc0a7efcbb',
    'Content-Type': 'application/json'
  }
});

export default api;