# Travel Book

_Версия 1.0.0_
https://aleksandrhexlet.github.io/travelBook.github.io/

Ссылка на презентацию проекта :
https://disk.yandex.ru/client/disk/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%B8?idApp=client&dialog=slider&idDialog=%2Fdisk%2F%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%B8%2F%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8FTravel%20Book.mp4 

RUS
Сервис предназначен для загрузки, хранения, просмотра своих фото и фото других пользователей. 
Реализован функционал:
1) Редактирование информации о пользователе.
2) Добавление фото и обмен фото с другими пользователями путём отправки фото на сервер.
3) Добавления описания для фото.
4) Загрузка фото других пользователей с сервера.
5) Просмотр фото в увеличенном размере при клике по картинке.
6) Лайк картинки
7) Удаление картинки

Архитектура :
Код разделён на классы. Классы находятся в папке src. Все классы импортированны в index.js. Логика (вызовы классов,слушатели,настройка окружения в зависимости от сборки и т.д ) прописаны в index.js и обёрнута в IIFE. 

Код разделен на следующие классы:
1) class Api - отправка данных пользователя и фото на сервер. Получение данных с сервера. Promises,fetch запросы,JSON,обработка ошибок.
2) class CardList - а) создаёт новую карточку от пользователя б) получает данные с сервера и создаёт карточку в) удаляет карточки
3) class FormValidator - а) Валидация инпутов б) disable and enable submit в) Изменения цвета кнопок
4) class Popup - увеличение картинки по клику и закрытие картинки
5) class UserInfo - изменение данные о пользователе
6) class Card - создаёт карточку на основе template и ставит/удаляет лайки

Технологии, используемые в проекте: JavaScript, CSS, HTML, WebPack, NPM, BABEL, GIT. 
При написании кода использованы : 
1) Promise
2) Конструкторы классов
3) fetch запросы к серверу
4) работа с JSON

Процесс работы:
Начало :
При загрузке страницы срабатывает слушатель и мы отправляем асинхронный fetch запрос с методом GET,токеном,заголовками на сервер,после проверяем ответ сервера и если res.ok ===> загружаем с сервера данные пользователя и фото.

Возможности:
1) Добавление пользователем картинки :
Данные из формы добавления новых фото преобразовываем в JSON и с помощью асинхронного fetch запроса с методом PATCH,токеном,заголовками отправляем на сервер.
2) Изменения данных о пользователе :
Получаем данные из формы изменения данных о пользователе преобразовываем в JSON-формат и fetch запросом, методом PATCH отправляем на сервер.
3) На данный момент такие функции как :постановка лайков,удаление карточки,увеличение размера карточки для просмотра, происходят локально,без отправки на сервер.


Настроены три ветки для разных задач:

1. Ветка Master в которой хранится итоговый код
2. Ветка Development в которой осуществляется разработка и тестирование
3. Ветка gh-pages которая необходима для публикации проекта на Github

Вы можете осуществить следующие виды сборки:

1. Командой npm run build в режиме build. Осуществляется сборка в папку dist.
2. Командой npm run dev в режиме development.Запуск кода осуществляется автоматически в localhost 8080.
3. Командой npm run deploy в режиме gh-pages.Запуск кода осуществляется в браузере.

Общие настройки:

1. Для каждого вида сборки настроено окружение.
2. Код разделен на модули.
3. Модули импортирваны в файл index.js, который является входной точкой для webpack.
4. В packaje.json настроены две зависимости для разработки --- devDependencies и для работы на стороне клиента --- dependencies.
5. С помощью плагина webpack-md5-hash настроено хеширование и hot reload.
6. При работе в режиме разработки при внесении изменений в код благодаря флагу --watch в сборке "dev": "webpack-dev-server --mode development --open --watch" вкладка браузера с сайтом будет обновляться каждый раз после сохранения.
7. После сборки код хранится в папке dist. В финальной сборке перед каждой новой сборкой благодаря команде rimraf dist в сборке "build": "rimraf dist && webpack --mode production" папка dist очищается автоматически.

8. Для окружение dev настроен локальный серевер с помощью команды webpack-dev-server
9. Для работы с сервером в классе Api настроены fetch запросы.


Описание:
Вы можете просматривать фотографии загруженные на сервер другими пользователями, редактировать информацию о владельце, добавлять собственные фото, добавлять описание загружаемых фотографий. Пользователь может добавить фотографию, нажав на кнопку «+». Каждая фотография имеет следующие функции: лайк, удаление и увеличение. Технологии, используемые в проекте: JavaScript, CSS, HTML, WebPack, GIT.


ENG

The service is designed to download, store, view your photos and photos of other users.
The functionality is realized:
1) Edit user information.
2) Add photos and share photos with other users by sending photos to the server.
3) Add a description for the photo.
4) Download photos of other users from the server.
5) View a photo in an enlarged size when clicking on a picture.
6) picture like
7) Removal of the picture

Architecture:
The code is divided into classes. The classes are located in the src folder. All classes imported to index.js. Logic (class calls, listeners, assembly-dependent environment setting, etc.) is written in index.js and wrapped in IIFE.

The code is divided into the following classes:
1) class Api - send user data and photos to the server. Retrieving data from server. Promises, fetch inquiries, JSON, error handling.
2) class CardList - a) creates a new card from user b) receives data from the server and creates a card c) deletes cards
3) class FormValidator - a) Validation of inputs b) disable and enable submit c) Button color changes
4) class Popup - enlarge the picture by click and close the picture
5) class UserInfo - change user data
6) class Card - creates a card based on template and puts/removes likes

Technologies used in the project: JavaScript, CSS, HTML, WebPack, NPM, BABEL, GIT.

Code writing uses:
1) Promise
2) Designers of classes
3) fetch requests to the server
4) working with JSON

Work process:
Beginning:
When loading the page the listener works and we send asynchronous to fetch a request with the GET method, a token, headings for the server, later we check the answer of the server and if res.ok ===> we load data of the user and a photo from the server.

Opportunities:
1) User adding picture:
Data from the form of adding new photos is converted to JSON and with the help of asynchronous fetch request with PATCH method, token, headers are sent to the server.
2) Changes to user data:
We get data from the form of changing data about the user we convert to JSON-format and fetch request, we send it to the server by PATCH method.
3) At the moment such functions as: making likes, deleting the card, increasing the size of the card for viewing, occur locally, without sending to the server.

Three branches are configured for different tasks:

1. Master branch in which the final code is stored
2. Development Branch for Development and Testing
3. Gh-pages branch that is required to publish the project to Github

You can perform the following types of assembly:

1. Npm run build command In build mode. The code is run in the browser.
2. Npm run dev In development mode. The code is run in localhost 8080.
3. Use npm run deploy In gh-pages.Run code in the browser.

General settings:

1. An environment is configured for each assembly view.
2. The code is divided into modules.
3. The modules are imported into the index.js file, which is the input point for webpack.
4. In packaje.json two dependences for development---devDependencies and for work on the party of the client---dependencies are adjusted.
5. Using the webpack-md5-hash plugin, hashing and hot reload are configured.
6. If you are working in development mode when you make code changes with the --watch flag in the "dev": "webpack-dev-server --mode development --open --watch" assembly, the browser tab with the site will be updated each time it is saved.
7. After assembly, the code is stored in the dist folder. In the final assembly before each new assembly, with the rimraf dist command in the build: rimraf dist & & webpack --mode production assembly, the dist folder is automatically cleared.

8. The dev environment is configured with a local server using the webpack-dev-server command
9. The Api class has set up fetch requests to work with the server.

You can view photos downloaded to the server by other users, edit information about the owner, add your own photos, add a description of the photos downloaded. You can add a photo by clicking the button. " Each photo has the following functions: click, delete, and zoom. Technologies used in the project: JS, CSS, HTML, WebPack, GIT.
