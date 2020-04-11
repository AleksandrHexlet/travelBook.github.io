# Travel Book

_Версия 1.0.0_
https://aleksandrhexlet.github.io/travelBook.github.io/

RUS
Сервис предназначен для загрузки, хранения, просмотра своих фото и фото других пользователей. 
Реализован функционал:
1) Редактирование информации о пользователе.
2) Добавление и  возможность поделится фото с другими пользователями путём отправки фото на сервер.
3) Добавления описания для фото.
4) Загрузка фото других пользователей с сервера.
5) Просмотр фото в увеличенном размере при клике по картинке.
6) Лайк картинки
7) Удаление картинки

Архитектура :
Код разделён на классы. Классы находятся в папке src. Все классы импортированны в index.js. Логика (вызовы классов,слушатели,настройка окружения в зависимости от сборки и т.д ) прописаны в index.js и обёрнута в IIFE. 
Код разделен на следующие классы:
1) class Card - создаёт карточку на основе template и ставит/удаляет лайки
2) class CardList - а) создаёт новую карточку от пользователя б) получает данные с сервера и создаёт карточку в) удаляет карточки
3) class FormValidator - а) Валидация инпутов б) disable and enable submit в) Изменения цвета кнопок
4) class Popup - увеличение картинки по клику и закрытие картинки
5) class UserInfo - изменение данные о пользователе
6) class Api - получение и отправка данныхх не сервер через fetch запросы

Настроены три ветки для разных задач:

1. Ветка Master в которой хранится итоговый код
2. Ветка Development в которой осуществляется разработка и тестирование
3. Ветка gh-pages которая необходима для публикации проекта на Github

Вы можете осуществить следующие виды сборки:

1. Командой npm run build В режиме build. Запуск кода осуществляется в браузере.
2. Командой npm run dev В режиме development.Запуск кода осуществляется в localhost 8080.
3. Командой npm run deploy В режиме gh-pages.Запуск кода осуществляется в браузере.

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
Вы можете просматривать фотографии загруженные на сервер другими пользователями, редактировать информацию о владельце, добавлять собственные фото, добавлять описание загружаемых фотографий. Пользователь может добавить фотографию, нажав на кнопку «+». Каждая фотография имеет следующие функции: лайк, удаление и увеличение. Технологии, используемые в проекте: JS, CSS, HTML, WebPack, GIT.


ENG

You can view photos downloaded to the server by other users, edit information about the owner, add your own photos, add a description of the photos downloaded. You can add a photo by clicking the button. " Each photo has the following functions: click, delete, and zoom. Technologies used in the project: JS, CSS, HTML, WebPack, GIT.

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
