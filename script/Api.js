class Api {
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

// api.getPicturesFromServer();
// api.sendUserInfo();
// api.getUserInfoFromServer(document.querySelector('.user-info'));
// // ('https://praktikum.tk/cohort8', '9dd6defc-e7aa-438c-be23-5ee2690dcc48');

// console.log(api.getPicturesFromServer());
// console.log(api.sendUserInfo());
// console.log(api.getUserInfoFromServer());

// class Api {
//   constructor (serverAdress, authorizationToken) { .textContent
//     this.server = serverAdress;
//     this.token = authorizationToken;
//   }

//   getUserInfoFromServer () {
//     return fetch (`${this.server}/users/me`, {
//       headers: {
//         authorization: this.token,
//       },
//     })
//       .then (res => {
//         if (res.ok) return res.json ();
//         console.log(res);
//         return Promise.reject (
//           `Не удалось получить данные. Ошибка:${res.status}`
//         );
//       })
//       .catch (err => {
//         alert (err);
//       });
//   }

//   patchUserInfo (newUserName, newUserAbout) {
//     return fetch (`${this.server}/users/me`, {
//       method: 'PATCH',
//       headers: {
//         authorization: this.token,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify ({
//         name: `${newUserName}`,
//         about: `${newUserAbout}`,
//       }),
//     })
//       .then (res => {
//         if (res.ok) return res.json ();
//         console.log(res);
//         return Promise.reject (
//           `Не удалось получить данные. Ошибка:${res.status}`
//         );
//       })
//       .catch (err => {
//         alert (err);
//       });
//   }
//   getPicturesFromServer(){
//     return fetch (`${this.server}/cards`, {
//       headers: {
//         authorization: this.token,
//       }
// })
//    .then(res => {
//       if(res.ok) return res.json();
//       console.log(res);
//       return Promise.reject(`Не удалось получить данные. Ошибка:${res.status}`)

//    })
//    .catch((err) => {
//        alert(err);
// });
// }

// }

// const api = new Api();
// api.getPicturesFromServer('https://praktikum.tk/cohort8', "9dd6defc-e7aa-438c-be23-5ee2690dcc48" );

// getPicturesFromServer () {
//   // Получаем фото с сервера
//   return fetch ('https://praktikum.tk/cohort8/cards', {
//     headers: {
//       authorization: '9dd6defc-e7aa-438c-be23-5ee2690dcc48',
//     },
//   })
//     .then (res => {
//       if (res.ok) return res.json ();
//       return Promise.reject (
//         `Не удалось получить данные. Ошибка:${res.status}`
//       );
//     })
//     .catch (err => {
//       alert (err);
//     });
// }
// }
