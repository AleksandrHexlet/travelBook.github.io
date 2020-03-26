import './style.css';
import {Card} from './script/Card';
import {CardList} from './script/CardList';
import {FormValidator} from './script/FormValidator';
import {Popup} from './script/Popup';
import {UserInfo} from './script/UserInfo';
import {Api} from './script/Api';

(function () {
  const api = new Api ({
    baseUrl: NODE_ENV === 'development'
      ? 'http://praktikum.tk/cohort8'
      : 'https://praktikum.tk/cohort8',
    headers: {
      authorization: '9dd6defc-e7aa-438c-be23-5ee2690dcc48',
      'Content-Type': 'application/json',
    },
  });

  const form = document.forms.new;
  const formEdit = document.forms.edit;
  const popup = document.querySelector ('.popup');
  const placesList = document.querySelector ('.places-list'); // контейнер для всех карточeк

  // Вызовы классов

  const card = new Card ();
  const cardList = new CardList (placesList, card, form);
  const cardRemove = new CardList (placesList);
  const formValidatorAdd = new FormValidator (
    document.querySelector ('.popup')
  );
  const formValidatorEdit = new FormValidator (
    document.querySelector ('.popup-edit')
  );
  const popupAddCard = new Popup (document.querySelector ('.popup')); //popup-форма редактирования карточек
  const popupEditProfile = new Popup (document.querySelector ('.popup-edit')); //popupEdit-форма редактирования профиля Кусто
  const userInfo = new UserInfo (
    formEdit,
    document.querySelector ('.user-info__name'),
    document.querySelector ('.user-info__job'),
    document.querySelector ('.user-info__photo')
  );
  const popUpImage = new Popup (document.querySelector ('.popup-bigpic'));

  /* -----Слушатели событий----- */

  // Добавление карточек и информации о пользователе с сервера

  window.addEventListener ('load', () => {
    api
      .getPicturesFromServer ()
      .then (data => {
        cardList.render (data);
      })
      .catch (err => {
        console.log (`Ошибка: ${err}`);
      });

    api
      .getUserInfoFromServer () //Получаем имя,профессию(about) и фото (аватар) с сервера и вставляем на сайт
      .then (data => {
        userInfo.updateUserInfo (data);
        userInfo.updateUserAvatar (data);
      })
      .catch (err => {
        console.log (`Ошибка: ${err}`); //При отрицательном ответе выдаём окно с ошибкой из ответа сервера
      });
  });

  /* -----Удаления карточки. Вызов функции Remove----- */

  document
    .querySelector ('.places-list')
    .addEventListener ('click', cardRemove.remove.bind (cardRemove));

  /* -----Вызов функции Like ----- */
  document.querySelector ('.places-list').addEventListener ('click', card.like);

  //-----Функция добавления карточки из формы ввода от пользователя.-----                                                                                                         // При сабмите берём имя и линк и добавляем карточку в плейслист.Закрываем форму.
  document.forms.new.addEventListener ('submit', function (event) {
    // При клике на форму отправки(сабмит) мы сбрасываем действия по умолчанию( event.preventDefault()--(отправку формы в нашем случае)) и добавляем карточку с данными из формы ввода (имя и ссылка) в плейслист.
    event.preventDefault ();
    cardList.addCard (event);
    popup.classList.remove ('popup_is-opened');
    event.target.reset ();
  });

  // -----Открываем и закрываем попап добавления карточки. -----
  //----- Добавляем валидацию,дизейблим и красим кнопку отправки.-----

  document
    .querySelector ('.user-info__button')
    .addEventListener ('click', () => {
      popupAddCard.open ();
      formValidatorAdd.setEventListeners ();
    });
  //-----открывается форма ввода для добавления новой карточки-----
  document
    .querySelector ('.popup__close')
    .addEventListener ('click', popupAddCard.close.bind (popupAddCard)); //закрывается форма ввода для добавления новой карточки

  // Открываем и закрываем попап изменения данных Кусто и подгружаем старые данные из верстки в инпуты формы. Добавляем валидацию
  document
    .querySelector ('.popup-edit__info-button')
    .addEventListener ('click', () => {
      popupEditProfile.open ();
      userInfo.setUserInfo ();
      formValidatorEdit.setEventListeners ();
    });

  //------------- Закрываем форму редактирования данных Кусто при клике на крестик-----
  document
    .querySelector ('.popup-edit__close')
    .addEventListener ('click', popupEditProfile.close.bind (popupEditProfile)); //закрывается форма ввода для добавления новой карточки

  //----- Функция внесения изменений в данные Кусто и закрытия формы при сабмите(кнопка "отправить")-----
  document
    .querySelector ('.popup-edit__form')
    .addEventListener ('submit', event => {
      event.preventDefault ();
      const jobValue = event.target.querySelector ('#jobInput').value;
      const nameValue = event.target.querySelector ('#nameInput').value;

      api
        .updateUserInfo (nameValue, jobValue)
        .then (data => {
          //-----Данные от сервера вставляем в разметку и обновляем данные на странице-----

          userInfo.updateUserInfo (data);
          console.log (`Обновлённые данные: ${data}`);
          //закрываем попап
          popupEditProfile.close (popupEditProfile);
        })
        .catch (err => {
          /* 
             Можно лучше: закрывать попап следует только если запрос выполнился успешно - только в блоке then
             Если попап закроется пользователь может подумать, что данные сохранились 
          */
          popupEditProfile.close (popupEditProfile);
          console.log (`Ошибка: ${err}`);
        });
    });

  // ----------Увеличиваем картинку по клику на карточку-----
  document.querySelector ('.places-list').addEventListener ('click', event => {
    if (event.target.classList.contains ('place-card__image')) {
      popUpImage.open ();
      popUpImage.openImage (event);
    }
  });

  // ---------------Закрываем увеличенную  картинку по клику на крестик-----
  document
    .querySelector ('.popup__close_big-pic')
    .addEventListener ('click', () => {
      popUpImage.closeImage ();
    });
}) ();
