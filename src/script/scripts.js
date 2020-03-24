(function () {
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
  const api = new Api ({
    baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
      authorization: '9dd6defc-e7aa-438c-be23-5ee2690dcc48',
      'Content-Type': 'application/json',
    },
  });

  /* -----Слушатели событий----- */

  // Добавление карточек и информации о пользователе с сервера

  window.addEventListener ('load', () => {
    api
      .getPicturesFromServer ()
      .then (data => {
        cardList.render(data);
        console.log (data);
      })
      .catch (err => {
        console.log (`Ошибка: ${err}`);
        // console.log (err);
        // console.trace ();
      });

    api
      .getUserInfoFromServer () //Получаем имя,профессию(about) и фото (аватар) с сервера и вставляем на сайт
      .then (data => {
        userInfo.updateUserInfo (data);
        userInfo.updateUserAvatar (data);
        console.log (data);
        // console.trace ();
      })
      .catch (err => {
        console.log (`Ошибка: ${err}`); //При отрицательном ответе выдаём окно с ошибкой из ответа сервера
        // console.log (err);
        // console.trace ();
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

/*
  Ревью по проектной работе 9
  Неплохая работа, класс Api создан и обеспечивает выполнение необходимых запросов к серверу.
  Отлично, что проверка ответа сервера вынесена в отдельный метод checkAnswerFromServer и не дублируется
  во всех запросах. Т.к. метод checkAnswerFromServer не используется вне класса Api можно обозначить его как 
  приватный добавив нижнее подчеркивание в начале имени ( _checkAnswerFromServer )
  Подробнее о приватных полях классов можно почитать здесь https://learn.javascript.ru/private-protected-properties-methods. 

  Но есть несколько замечаний

  Надо исправить:
  - при сохранении данных пользователя они пропадают на странице и появляются только после перезагрузки страницы
  - сохранение данных пользователя должно происходить только после того как сервер ответил подтверждением
  - при сохранении данных пользователя также должна быть обработка ошибок блоком catch

*/

/*
  Отлично, теперь программа работает верно - обработчики ошибок расположены там, где нужно, а
  данные пользователя на странице сохраняются только если сервер ответил подтверждением

  Можно лучше: закрывать попап следует также только если запрос выполнился успешно - только в блоке then
  Если попап закроется пользователь может подумать, что данные сохранились 

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Если у Вас будет свободное время попробуйте переписать работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!

*/










// Добрый день! Проверка ответа от сервера происходит в первом then  в api.
//Данные сохраняются на страницу ,только если с сервера пришл ОК.
//Я ломал токен и проверял,если с сервера пришла ошибка,тогда данные в разметке и на странице остаются старые.

/* Надо исправить:  сохранение данных пользователя должно происходить только после того, как
      сервер ответил подтверждением. Если сервер не ответил, или ответил ошибкой, а
      данные на странице сохраняться, то это может ввести пользователя в заблуждение
      Так же здесь должна быть обработка ошибки. Т.е. код должен выглядеть примерно так:
      
      api.updateUserInfo (nameValue, jobValue)
        .then((data) => {
            //обновляем данные на странице
            //закрываем попап
        })
        .catch(() => {
            //обрабатываем ошибку
        })


        Так же вызов userInfo.updateUserInfo (nameValue, jobValue); некорректен
        т.е. метод updateUserInfo ожидает описанный в классе UserInfo ожидает на вход 
        объект с полями name и about а не два отдельных параметра

      */
// userInfo.updateUserInfo (nameValue, jobValue);
// popupEditProfile.close (popupEditProfile);

//Надо сохранять данные из инпута на сайт и после приходв данных  с сервера обновлять.
//Если ошибка придёт,тогда должны быть старые данные
/**
* Здравствуйте.
* Вы молодцы, что распределили код по классам, у каждого класса должна быть своя
* обязанность. Класс должен отвечать за одно действие
*
* Можно лучше: Старайтесь задавать переменным более понятные названия, чтобы по названию было понятно
* за что отвечает та или иная переменная, это важно для понимания того за что отвечает переменная.
*
* ====================
*  /**
 * Здравствуйте.
 * --------------------------------------------------------------------
 *
 * У вас нет дублирование кода
 *  Вы не используете небезопасный innerHtml
 *  Вы используете делегирование
 * --------------------------------------------------------------------

  * можно лучше: избегайте сложных условий и большой вложенности в условии. Чем сложнее условие, чем больше
  * вложенности в условии, тем сложнее анализировать код, сложнее искать ошибки и поддерживать такой код
  * самый простой вариант это убирать условия или блок в условии в отдельную функцию
 *
 * можно лучше: Старайтесь не объявлять большое количество переменных. Чем больше переменных, тем сложнее понимать за что они
 * отвечают и какую полезную нагрузку несут в коде. Лучше инкапсулировать(прятать) переменные в функциях.
 * В будущем вам проще будет искать ошибки и разбираться в сложных взаимосвязях


* Сейчас у вас добавился новый класс(модуль), неважно, и ваша задача не создавать жесткую связь с другими классами внутри классов
* Соответственно вам надо пулучать новые карточки, а получать вы можете только передавая сам класс в другие классы, как некое хранилице
 * о котором ничего другие классы не знают.
* Как пример не более:
*
* // Объявляете новый класс
* const card = new Card(); // это для того чтобы вызывая методы лайка, дизлайка
*
*  при инициализации класса CardList вы передаёте в качестве параметров класс card
*  const cardList = new CardList(document.querySelector(".places-list"), card); // это для того чтобы вызывая методы добавления карточек
*
*  Тоже самое с классом Popup, но там только при изменении профиля, функционал добавления  карточки через Popup остаётся
*  при условии использования класса Card
*
* Что надо исправить:
*
* - Убрать жесткую связь между классами. Объявление одного класса в другом классе является плохой практикой
*   программирование. Такие классы тяжело поддерживать. Нельзя удалить и заменить один класс на другой не изменив
*   часть архитектуры.
*   Представьте, что ваш класс(CardList) допустим принтер, который печатает бумагу. Вы берёте какие то заготовленные рисунки ( initialCards)
*   и хотите их нанести на бумагу класс (Card). Вы можете поменять принтер, можете поменять и вставить другую бумагу или какой либо другой рисунок.
*   Принтер(CardList), бумага(Card) и рисунки( initialCards) ничего не знают друг о друге. Можно поменять любое компонент и ничего не должно поломаться
*   По такому принципу должен работать любой класс.
*
* - Надо исправить: вы обращаетесь в классе к переменным объявленным глобально,
*   так делать нельзя. Вы можете передать эту переменную в качестве параметров в класс, а потом уже обращаться к ней
*   Стремитесь к тому чтобы класс у вас был самодостаточным, и не зависел от глобальных переменных или классов
*   объявленных глобально, а только от тех данных которые были переданны через параметры.
*   Обращаясь в классе к переменным или функциям объявленым глобально, вы нарушаете один из основных признаков ООП инкапсуляция
*
* Надо исправить: Приведите ваш код в проекте в порядок. Если вы не используете createCard.js, удалите. Старые комментарии, не мои, потрите.
* Сделайте форматирование проекта.
*

Надо исправить: при редактировании профиля должны оставаться старые данные. Тоже самое при повторном редактировании, должны подгружаться старые данные в popup

*
* Надо исправить: вы обращаетесь в классе к переменной объявленной глобально,
* так делать нельзя. Вы можете передать эту переменную в качестве параметров, а потом уже обращаться к ней
* Стремитесь к тому чтобы класс у вас был самодостаточным, и не зависел от глобальных переменных или классов
* объявленных глобально, а только от тех данных которые были переданны через параметры
*
 Надо исправить : Нельзя вызывать или создавать реализацию в конструторе класса
 Вызывая реализацию в конструторе класса, при наследовании, вы не сможите вызвать другой метод не вызвав реализацию в конструкторе
 Если Вам необходимо будет вызвать конструктор родителя при наследовании в одном из классов
так же, вы заведомо делаете класс не тестируемым, так как всегда при инициализации будет вызываться конструктор класса

*
*  Надо исправить: Назывние (переменной, функции метода) не отражает то действие которое скрыто под названием
*  Создавай новое название для переменных, подумайте, сможете ли вы отталкиваясь от названия, понять за что она отвечает
*  и какую полезную нагрузку она будет нести. Предлагаю вам почитать несколько полезных материалов
*  https://ymatuhin.ru/front-end/how-to-name-variables/
*  https://habr.com/ru/post/44748/
*
Такие названия у файла недопустимы как Let&Listeners.js
*


* - Добавьте script.js  который у вас будет как связующий между классами и в
*  котором по результату должно получиться примерно такое:
		const container = document.querySelector('.places-list');// место куда записывать карточки
		const cards = []; // массив с карточками
		const card = new Card();
		const validation = new FormValidator(words);
		const cardList = new CardList(card);
		cardList.render(container, cards);

		const popupCard = new PopupCard(validation);
		const popupProfile = new PopupProfile(validation);
		const popupImage = new PopupImage();


*
* Важный момент :
* работа принимается только при исправлении всех "Надо исправить" и полностью рабочем функционале
* Перед тем как отправить работу на приёмку, проверьте на ошибки в консоли, и весь функционал
*
*
*/

// Слушатели событий :

// 1) класс Card

// document.querySelector('.places-list').addEventListener("click", card.like);

// 2) Класс CardList

// const cardRemove = new CardList(placesList);
// document.querySelector('.places-list').addEventListener("click", cardRemove.remove.bind(cardRemove));                   //Создаём копию класса и в копию подаём на вход контейнер с карточками из которого будем удалять карточки.Потом при клике по контейнеру(плейслист) мы вызываем метод Remov.Обязательно привяжичерез  bind контекст,чтобы слушаnель понимал на каком обьекте вызывать метод remove.

// const cardListInit = new CardList(document.querySelector('.places-list'), initialCards);                               //Добавляем карточки с помощью метода render в плейслист  из массива initialCards
// cardListInit.render();

// document.forms.new.addEventListener('submit', function (event) {                                                        // При клике на форму отправки(сабмит) мы сбрасываем действия по умолчанию( event.preventDefault()--(отправку формы в нашем случае)) и добавляем карточку с данными из формы ввода (имя и ссылка) в плейслист.
// 	event.preventDefault();
// 	cardListInit.addCard(event);
// });

// 3) Класс Popup
// const popupProfile = new Popup(document.querySelector('.popup')); //popup-форма редактирования карточек
// const popupEditProfile = new Popup(document.querySelector('.popup-edit')); //popupEdit-форма редактирования профиля Кусто

// document.querySelector('.user-info__button').addEventListener('click', popupProfile.open.bind(popupProfile));                                              //открывается форма ввода для добавления новой карточки
// document.querySelector('.popup__close').addEventListener('click', popupProfile.close.bind(popupProfile));                                                                  //закрывается форма ввода для добавления новой карточки

// document.querySelector('.popup-edit__info-button').addEventListener('click', popupEditProfile.open.bind(popupEditProfile));                                                                  //открывается форма ввода для добавления новой карточки
// document.querySelector('.popup-edit__close').addEventListener('click', popupEditProfile.close.bind(popupEditProfile));                                                               //закрывается форма ввода для добавления новой карточки

// Вызов функции открытия и закрытия попапов
// document.querySelector('.popup-edit__close').addEventListener('click', ()=> popupEditProfile.close());                                                               //закрывается форма ввода для добавления новой карточки
// document.querySelector('.popup__close').addEventListener('click', () => popupProfile.close());                                                                  //закрывается форма ввода для добавления новой карточки

// Вносим изменения в профиль
// document.querySelector('.user-info__button').addEventListener('click', popupProfile.open.bind(popupProfile));                                              //открывается форма ввода для добавления новой карточки
// document.querySelector('.popup-edit__info-button').addEventListener('click', popupEditProfile.open.bind(popupEditProfile));                                                                  //открывается форма ввода для добавления новой карточки

// не использованные переменные
// const popUpIsOpened = document.querySelector('.user-info__button');
// const popupEditIsOpened = document.querySelector('.popup-edit__info-button');
// const popupClose = document.querySelector('.popup__close');
// const popupCloseBigPic = document.querySelector('.popup__close_big-pic')
// const popupEditClose = document.querySelector('.popup-edit__close');
// const placeCard = placesList.querySelector('.place-card'); // контейнер для карточки
// const popupEdit = document.querySelector('.popup-edit');

// const popupButton = document.querySelector('.popup__button');
// const popupEditButton = document.querySelector('.popup-edit__button')

// const nameValue = document.forms.edit.elements.username;
// const professionValue = document.forms.edit.elements.profession;
// const username = document.querySelector('.user-info__name');
// const userProfession = document.querySelector('.user-info__job');
// const popupEditContent = document.querySelector('.popup-edit__content');
// const popupBigPic = document.querySelector('.popup-bigpic');
// const popupBigPicContent = document.querySelector('.popup-bigpic__content');
// const popupInputName = document.querySelector('#nameInput');
// const popupInputJob = document.querySelector('#jobInput')
// const typeError = document.querySelector('.popup__input-error');
// const popupBigPic = document.querySelector('.popup-bigpic');

/**
 * Работа преобразилась )
 * Надо поправить в классе  FormValidator я описал прям в классе
 *
  Надо исправить: Перед сдачей работы на проверку или публикацией
  удаляйте console.log() везде
 console.log() используется только для разработки.
 *
 * Я пропущу работу в следующий спринт, так как исправления которые надо внести не критические, но важные
 * и вам надо будет поправить их до 9 спринта
 *
 *    // console.log(`Ошибка: ${err}`);                                              //При отрицательном ответе выдаём окно с ошибкой из ответа сервера
  .catch((err) => {
    alert(`Ошибка: ${err}`);
          // document.querySelector (
          //   '.user-info__name'
          // ).textContent = document.querySelector ('#nameInput').value;
          
          // document.querySelector (
          //   '.user-info__job'
          // ).textContent = document.querySelector ('#jobInput').value;
          // // console.log (err);

  // Загрузка карточек
  // cardList.render();
 */
