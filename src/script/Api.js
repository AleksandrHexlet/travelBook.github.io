export class Api {
  constructor (options) {
    this.options = options;
  }
  checkAnswerFromServer (res) {
    if (res.ok) {
      return res.json ();
    }
    return Promise.reject (`Не удалось получить данные. Ошибка:${res.status}`);
  }

  getUserInfoFromServer () {
    //  Получаем имя и проффесию с сервера
    return fetch (this.options.baseUrl + `/users/me`, {
      method: 'GET',
      headers: {
        authorization: this.options.headers.authorization,
      },
    }).then (res => this.checkAnswerFromServer (res));
  }

  updateUserInfo (name, about) {
    // Отправляем данные на сервер из формы ввода на сайте
    return fetch ('https://praktikum.tk/cohort8/users/me', {
      // return fetch (this.options.baseUrl + `/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.options.headers.authorization,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify ({
        name: name,
        about: about,
      }),
    }).then (res => this.checkAnswerFromServer (res));
  }

  getPicturesFromServer () {
    // Получаем фото с сервера
    return fetch (this.options.baseUrl + `/cards`, {
      method: 'GET',
      headers: {
        authorization: this.options.headers.authorization,
      },
    }).then (res => this.checkAnswerFromServer (res));
  }
}
